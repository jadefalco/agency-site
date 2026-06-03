import OpenAI from "openai";
import { prisma } from "./db";
import { sendLeadNotification } from "./email";
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
  console.log("📩 INCOMING:", { phone, body: body.slice(0, 50), hasMedia: !!mediaUrl });

  const STALE_MINUTES = 30;
  let lead = await prisma.lead.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });

  if (lead) {
    const ageMinutes = (Date.now() - lead.createdAt.getTime()) / 1000 / 60;
    if (ageMinutes > STALE_MINUTES) {
      console.log("🕐 Existing lead is stale (", Math.round(ageMinutes), "min old). Creating new lead.");
      lead = null;
    }
  }

  if (!lead || lead.step === COMPLETE_NODE) {
    lead = await prisma.lead.create({
      data: { phone, step: "greeting", urgencyScore: 0 },
    });
    console.log("✅ Created new lead:", lead.id);
  } else {
    console.log("🔄 Using existing lead:", lead.id, "step:", lead.step);
  }

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
    await prisma.lead.update({ where: { id: lead.id }, data: { step: "greeting" } });
    const reply = FLOW_NODES["greeting"].message;
    await storeOutbound(lead.id, reply);
    return { reply, leadId: lead.id, step: "greeting" };
  }

  if (currentStep === COMPLETE_NODE) {
    const reply = "We've already received your request. A plumber will contact you shortly.";
    await storeOutbound(lead.id, reply);
    return { reply, leadId: lead.id, step: COMPLETE_NODE };
  }

  const outboundCount = await prisma.message.count({
    where: { leadId: lead.id, direction: "outbound" },
  });
  const isFirstInteraction = outboundCount === 0;
  console.log("🔄 First interaction?", isFirstInteraction, "outbound count:", outboundCount);

  const updates: Partial<LeadUpdateFields> = {};
  let nextStep: string | null = node.next;
  let reply = "";
  let additionalReply: string | undefined;

  if (mediaUrl) {
    updates.photoUrl = mediaUrl;
    if (node.acceptsPhoto) {
      nextStep = COMPLETE_NODE;
      console.log("📸 Photo at photo node → completing");
    }
  }

  // If we're at a photo node and they sent text instead, ask again or allow skip
  if (node.acceptsPhoto && !mediaUrl) {
    const lowerBody = body.trim().toLowerCase();
    if (lowerBody === "skip" || lowerBody === "no" || lowerBody === "none") {
      nextStep = COMPLETE_NODE;
    } else {
      reply = "Please send a photo, or reply SKIP to continue without one. 📸";
      await storeOutbound(lead.id, reply);
      return { reply, leadId: lead.id, step: currentStep };
    }
  } else if (!node.acceptsPhoto || !mediaUrl) {
    const matched = matchOption(node, body);
    console.log("🔍 matchOption result:", matched?.label || "NO MATCH");

    if (matched) {
      if (node.saveField) {
        const value = matched.saveValue || matched.label;
        (updates as any)[node.saveField] = value;
        console.log("💾 Saved", node.saveField, "=", value);
      }
      if (matched.urgencyScore) {
        updates.urgencyScore = (lead.urgencyScore || 0) + matched.urgencyScore;
      }
      if (matched.immediateReply) {
        additionalReply = matched.immediateReply;
      }
      if (matched.note && node.saveField) {
        const existing = ((lead as any)[node.saveField] as string) || "";
        (updates as any)[node.saveField] = existing
          ? `${existing} — ${matched.note}`
          : matched.note;
      }
      nextStep = matched.next ?? node.next;
      console.log("➡️ nextStep from match:", nextStep);
    } else if (node.fallbackAllowed) {
      // Guard: don't accept arbitrary text as a photo URL
      if (node.acceptsPhoto && !mediaUrl) {
        reply = "Please send a photo, or reply SKIP to continue without one. 📸";
        await storeOutbound(lead.id, reply);
        return { reply, leadId: lead.id, step: currentStep };
      }
      // Text input node — accept any text
      if (node.saveField) {
        (updates as any)[node.saveField] = body.trim();
        console.log("💾 Saved (fallback)", node.saveField, "=", body.trim());
      }
      nextStep = node.next;
      console.log("➡️ nextStep from fallback:", nextStep);
    } else {
      reply = `I didn't catch that. ${node.message}`;
      await storeOutbound(lead.id, reply);
      console.log("❌ No match, re-asking");
      return { reply, leadId: lead.id, step: currentStep };
    }
  }

  if (isFirstInteraction && currentStep === "greeting" && !matchOption(node, body)) {
    reply = node.message;
    await storeOutbound(lead.id, reply);
    console.log("👋 First interaction, no match → sending greeting");
    return { reply, leadId: lead.id, step: currentStep };
  }

  if (!reply) {
    if (nextStep && nextStep !== COMPLETE_NODE) {
      const nextNode = getNode(nextStep);
      if (nextNode) {
        reply = nextNode.message;
        console.log("💬 Reply from next node:", nextStep);
      } else {
        console.log("⚠️ Next node not found:", nextStep);
        reply = FLOW_NODES[COMPLETE_NODE].message;
        nextStep = COMPLETE_NODE;
      }
    } else {
      const issueType = updates.issueType || lead.issueType;
      reply = FINAL_MESSAGES[issueType || "Other"] || FLOW_NODES[COMPLETE_NODE].message;
      nextStep = COMPLETE_NODE;
      console.log("🏁 Flow complete. Issue:", issueType);
    }
  }

  if (additionalReply) {
    await storeOutbound(lead.id, additionalReply);
  }

  if (reply) {
    await storeOutbound(lead.id, reply);
  }

  const finalUrgencyScore = updates.urgencyScore ?? lead.urgencyScore ?? 0;

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

  const isComplete = nextStep === COMPLETE_NODE || !nextStep;

  if (isComplete) {
    prismaUpdate.status = "qualified";
    prismaUpdate.conversationSummary = "Lead summary pending...";
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: prismaUpdate,
  });

  console.log("💾 Lead updated to step:", prismaUpdate.step);

  if (isComplete) {
    const freshLead = await prisma.lead.findUnique({
      where: { id: lead.id },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });
    if (freshLead) {
      await sendLeadNotification(freshLead);
    }
  }

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

async function generateSummary(
  leadId: string,
  urgencyLevel: string
): Promise<string> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!lead) return "";

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

  try {
    const transcript = lead.messages
      .map((m) => `${m.direction === "inbound" ? "Customer" : "Dispatcher"}: ${m.body}`)
      .join("\n");
    const prompt = `Refine this plumbing lead summary into 3-5 concise bullet points. Keep it factual and brief. Do not add information not present.\n\nStructured data:\n${structured}\n\nConversation:\n${transcript}`;
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 200,
    });
    const aiSummary = completion.choices[0]?.message?.content?.trim();
    if (aiSummary) return aiSummary;
  } catch {
    // Ignore AI errors
  }
  return structured;
}