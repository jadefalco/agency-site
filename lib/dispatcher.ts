import OpenAI from "openai";
import { prisma } from "./db";
import {
  COMPLETE_NODE,
  FLOW_NODES,
  FINAL_MESSAGES,
  getNode,
  matchOption,
  getUrgencyLevel,
  type FlowNode,
  type LeadUpdateFields,
} from "./flows/plumber";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  return new OpenAI({ apiKey });
}

export async function processIncomingMessage({
  phone,
  body,
  mediaUrl,
}: {
  phone: string;
  body: string;
  mediaUrl?: string | null;
}) {
  let lead = await prisma.lead.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });

  const isNewLead = !lead;

  if (!lead) {
  lead = await prisma.lead.create({
    data: { phone, step: "greeting", urgencyScore: 0 },
  });
}

  // Store inbound message
  await prisma.message.create({
    data: {
      leadId: lead.id,
      direction: "inbound",
      body,
      mediaUrl: mediaUrl || null,
    },
  });

  const currentStep = lead.step;
  const node = getNode(currentStep);

  if (!node) {
    // Unknown step — reset to greeting
    await prisma.lead.update({
      where: { id: lead.id },
      data: { step: "greeting" },
    });
    const reply = FLOW_NODES["greeting"].message;
    await storeOutbound(lead.id, reply);
    return { reply, leadId: lead.id, step: "greeting" };
  }

  // Handle completed conversations
  if (currentStep === COMPLETE_NODE) {
    const reply =
      "We've already received your request. A plumber will contact you shortly.";
    await storeOutbound(lead.id, reply);
    return { reply, leadId: lead.id, step: COMPLETE_NODE };
  }

  // Determine if this is the first interaction (no outbound messages yet)
  const outboundCount = await prisma.message.count({
    where: { leadId: lead.id, direction: "outbound" },
  });
  const isFirstInteraction = outboundCount === 0;

  // Build accumulated updates
  const updates: Partial<LeadUpdateFields> = {};
  let nextStep = node.next;
  let reply = "";
  let additionalReply: string | undefined;

  // Photo handling: save any uploaded photo, but only advance flow if at a photo node
  if (mediaUrl) {
    updates.photoUrl = mediaUrl;
    if (node.acceptsPhoto) {
      nextStep = COMPLETE_NODE;
    }
  }

  // If we're at a photo node and they sent text instead, accept text and complete
  if (node.acceptsPhoto && !mediaUrl) {
    if (node.saveField && node.saveField !== "photoUrl") {
      (updates as any)[node.saveField] = body.trim();
    }
    nextStep = COMPLETE_NODE;
  }

  // Only process text response if we haven't already advanced via photo
  if (!node.acceptsPhoto || !mediaUrl) {
    // Try to match the user's response to an option
    const matchedOption = matchOption(node, body);

    if (matchedOption) {
      // Save field value
      if (node.saveField) {
        const value = matchedOption.saveValue || matchedOption.label;
        (updates as any)[node.saveField] = value;
      }

      // Add urgency score
      if (matchedOption.urgencyScore) {
        updates.urgencyScore =
          (lead.urgencyScore || 0) + matchedOption.urgencyScore;
      }

      // Immediate reply (e.g. emergency instructions)
      if (matchedOption.immediateReply) {
        additionalReply = matchedOption.immediateReply;
      }

      // Append note to symptoms if present
      if (matchedOption.note && node.saveField) {
        const existing = ((lead as any)[node.saveField] as string) || "";
        (updates as any)[node.saveField] = existing
          ? `${existing} — ${matchedOption.note}`
          : matchedOption.note;
      }

      nextStep = matchedOption.next ?? node.next;
    } else if (node.fallbackAllowed) {
      // Text input node — accept any text
      if (node.saveField) {
        (updates as any)[node.saveField] = body.trim();
      }
      nextStep = node.next;
    } else {
      // Did not match any option and fallback not allowed — re-ask
      reply = `I didn't catch that. ${node.message}`;
      await storeOutbound(lead.id, reply);

      // No state change
      return { reply, leadId: lead.id, step: currentStep };
    }
  }

  // If this is the first interaction and we're at greeting,
  // try to match the first message against greeting options
  if (isFirstInteraction && currentStep === "greeting") {
    if (matchedOption(node, body)) {
      // They answered the greeting in their first text — process it
      const opt = matchedOption(node, body)!;
      if (node.saveField) {
        (updates as any)[node.saveField] = opt.saveValue || opt.label;
      }
      nextStep = opt.next ?? node.next;
    } else {
      // First message didn't match — just send the greeting
      reply = node.message;
      await storeOutbound(lead.id, reply);
      return { reply, leadId: lead.id, step: currentStep };
    }
  }

 // Determine the reply for the next step
if (!reply) {
  if (nextStep && nextStep !== COMPLETE_NODE) {
    const nextNode = getNode(nextStep);

    if (nextNode) {
      reply = nextNode.message;
    }
  } else if (nextStep === COMPLETE_NODE || !nextStep) {
    // Conversation complete
    const issueType = updates.issueType || lead.issueType;

    reply =
      FINAL_MESSAGES[issueType || "Other"] ||
      FLOW_NODES[COMPLETE_NODE].message;

    nextStep = COMPLETE_NODE;
  }
}

  // Store any immediate additional reply first
  if (additionalReply) {
    await storeOutbound(lead.id, additionalReply);
  }

  // Store main reply
  if (reply) {
    await storeOutbound(lead.id, reply);
  }

  // Calculate final urgency level
  const finalUrgencyScore =
    (updates.urgencyScore ?? lead.urgencyScore ?? 0);
  const urgencyLevel = getUrgencyLevel(finalUrgencyScore);

  // Build Prisma update data
  const prismaUpdate: Record<string, any> = {
    step: nextStep || COMPLETE_NODE,
    urgencyScore: finalUrgencyScore,
  };

  if (updates.issueType !== undefined) prismaUpdate.issueType = updates.issueType;
  if (updates.symptoms !== undefined) prismaUpdate.symptoms = updates.symptoms;
  if (updates.urgency !== undefined) prismaUpdate.urgency = updates.urgency;
  if (updates.area !== undefined) prismaUpdate.area = updates.area;
  if (updates.timeframe !== undefined) prismaUpdate.timeframe = updates.timeframe;
  if (updates.attemptedFix !== undefined) prismaUpdate.attemptedFix = updates.attemptedFix;
  if (updates.photoUrl !== undefined) prismaUpdate.photoUrl = updates.photoUrl;
  if (updates.customerName !== undefined) prismaUpdate.customerName = updates.customerName;

  if (nextStep === COMPLETE_NODE || !nextStep) {
  prismaUpdate.status = "qualified";
  prismaUpdate.conversationSummary = "Lead summary pending...";
}

  await prisma.lead.update({
    where: { id: lead.id },
    data: prismaUpdate,
  });

  return {
    reply: additionalReply ? `${additionalReply}\n\n${reply}` : reply,
    leadId: lead.id,
    step: nextStep || COMPLETE_NODE,
  };
}

async function storeOutbound(leadId: string, body: string) {
  await prisma.message.create({
    data: { leadId, direction: "outbound", body },
  });
}

function matchedOption(node: FlowNode, body: string) {
  return matchOption(node, body);
}

async function generateSummary(
  leadId: string,
  urgencyLevel: string
): Promise<string> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!lead) return "";

  // Build structured summary from collected fields
  const parts: string[] = [];
  parts.push(`${urgencyLevel.toUpperCase()} PRIORITY`);
  if (lead.issueType) parts.push(`Issue: ${lead.issueType}`);
  if (lead.area) parts.push(`Area: ${lead.area}`);
  if (lead.symptoms) parts.push(`Symptoms: ${lead.symptoms}`);
  if (lead.timeframe) parts.push(`Duration: ${lead.timeframe}`);
  if (lead.attemptedFix) parts.push(`Attempted fix: ${lead.attemptedFix}`);
  if (lead.customerName) parts.push(`Customer: ${lead.customerName}`);
  if (lead.photoUrl) parts.push(`Photo: attached`);

  const structured = parts.join("\n");

  // Try AI refinement
  try {
    const transcript = lead.messages
      .map(
        (m) =>
          `${m.direction === "inbound" ? "Customer" : "Dispatcher"}: ${m.body}`
      )
      .join("\n");

    const prompt = `Refine this plumbing lead summary into 3-5 concise bullet points. Keep it factual and brief. Do not add information not present.

Structured data:
${structured}

Conversation:
${transcript}`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 200,
    });

    const aiSummary = completion.choices[0]?.message?.content?.trim();
    if (aiSummary) return aiSummary;
  } catch {
    // Ignore AI errors, use structured summary
  }

  return structured;
}


