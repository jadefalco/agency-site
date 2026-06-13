import { Resend } from "resend";
import { Twilio } from "twilio";
import {
  FLOW_NODES,
  COMPLETE_NODE,
  matchOption,
} from "./flows/plumber";

const resend = new Resend(process.env.RESEND_API_KEY);
const PLUMBER_EMAIL = process.env.PLUMBER_EMAIL;
const PLUMBER_NOTIFICATION_NUMBER = process.env.PLUMBER_NOTIFICATION_NUMBER;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

let APP_URL = process.env.APP_URL;
if (!APP_URL) {
  console.warn("⚠️ APP_URL not set — photo links may not work locally");
  APP_URL = "https://truenorthwebsites.com";
}

const twilioClient =
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
    ? new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    : null;

/* ================================================================
   Helpers: map outbound messages back to flow nodes
   ================================================================ */

function findNodeByMessage(messageBody: string) {
  for (const [id, node] of Object.entries(FLOW_NODES)) {
    if (node.message === messageBody) {
      return { id, node };
    }
  }
  return null;
}

const TRANSITION_PHRASES = [
  "We missed your call! We'll ask a few quick questions so we can understand your issue and get back to you faster.",
  "Thanks. A couple more questions so we can better understand the issue.",
  "A few more details:",
  "Next question:",
  "One more detail:",
  "Almost done.",
];

function cleanQuestionText(raw: string): string {
  const paragraphs = raw.split("\n\n");
  const clean = paragraphs.filter((p) => {
    const trimmed = p.trim();
    if (!trimmed) return false;
    if (TRANSITION_PHRASES.some((t) => trimmed === t)) return false;
    const firstLine = trimmed.split("\n")[0];
    if (/^\d[\uFE0F]?\u20E3?\s/.test(firstLine)) return false; // emoji numbers
    if (/^\d+[.\s)]\s/.test(firstLine)) return false; // plain numbers
    if (firstLine.startsWith("Please type the number on your keyboard")) return false;
    if (firstLine.startsWith("Reply SKIP if you can't send a photo")) return false;
    return true;
  });

  let result = clean.join("\n\n").trim();
  // strip remaining emoji used in flow messages
  result = result.replace(/[📍📝📸🚨📞💬🔧🚽]/g, "").trim();
  // collapse multiple spaces
  result = result.replace(/\s+/g, " ").trim();
  return result || raw;
}

function buildQAPairs(
  messages: { direction: string; body: string; mediaUrl?: string | null }[],
  issueType: string | null
) {
  const pairs: { question: string; answer: string; nodeId: string }[] = [];
  let currentNode: ReturnType<typeof findNodeByMessage> | null = null;
  let startIndex = 0;

  // The voice-webhook greeting SMS is not stored in the DB.
  // If the very first message is inbound, treat it as the answer to the greeting.
  if (messages.length > 0 && messages[0].direction === "inbound" && issueType) {
    const nextMsg = messages[1];
    const isRetry =
      nextMsg?.direction === "outbound" &&
      nextMsg.body.startsWith("I didn't catch that.");
    if (!isRetry) {
      const greetingNode = FLOW_NODES["greeting"];
      const firstMsg = messages[0];
      const opt = matchOption(greetingNode, firstMsg.body);
      const answer = opt
        ? opt.saveValue || opt.label
        : firstMsg.body.trim();
      pairs.push({
        question: cleanQuestionText(greetingNode.message),
        answer,
        nodeId: "greeting",
      });
    }
    startIndex = 1;
  }

  for (let i = startIndex; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.direction === "outbound") {
      const matched = findNodeByMessage(msg.body);
      if (matched && matched.id !== COMPLETE_NODE) {
        currentNode = matched;
      } else if (msg.body.startsWith("I didn't catch that.")) {
        // retry – keep currentNode so the next inbound is processed
      } else {
        currentNode = null;
      }
    } else if (msg.direction === "inbound" && currentNode) {
      const nextMsg = messages[i + 1];
      const isRetry =
        nextMsg?.direction === "outbound" &&
        nextMsg.body.startsWith("I didn't catch that.");
      if (isRetry) {
        continue; // invalid response – skip it
      }

      let answer: string;
      if (msg.mediaUrl) {
        answer = "Photo attached";
      } else {
        const opt = matchOption(currentNode.node, msg.body);
        if (opt) {
          answer = opt.saveValue || opt.label;
        } else if (currentNode.node.fallbackAllowed) {
          answer = msg.body.trim();
        } else {
          answer = msg.body.trim();
        }
      }
          pairs.push({
        question: cleanQuestionText(currentNode.node.message),
        answer,
        nodeId: currentNode.id,
      });
      currentNode = null;
    }
  }

  return pairs;
}

/* ================================================================
   Plumber SMS alert
   ================================================================ */

async function sendPlumberSms(lead: {
  customerName: string | null;
  phone: string;
  area: string | null;
  urgencyScore: number | null;
}) {
  if (!twilioClient || !PLUMBER_NOTIFICATION_NUMBER || !TWILIO_PHONE_NUMBER) {
    console.warn("⚠️ Skipping plumber SMS — missing Twilio config");
    return;
  }

  const name = lead.customerName || "Unknown";
  const area = lead.area || "your";
  const score = lead.urgencyScore || 0;

  let banner: string;
  if (score >= 50) {
    banner = "🚨 ACTIVE FLOODING";
  } else if (score >= 25) {
    banner = "⚠️ URGENT PLUMBING ISSUE";
  } else {
    banner = "📋 NEW SERVICE REQUEST";
  }

  const body = `${banner}\n\n${name}\n${lead.phone}\n\n${area}\n\nCheck email for full details and photos.`;

  try {
    const result = await twilioClient.messages.create({
      body,
      from: TWILIO_PHONE_NUMBER,
      to: PLUMBER_NOTIFICATION_NUMBER,
    });
    console.log(">>> PLUMBER SMS SENT:", result.sid);
  } catch (err) {
    console.error(">>> PLUMBER SMS FAILED:", err);
  }
}

/* ================================================================
   Email notification
   ================================================================ */

export async function sendLeadNotification(lead: {
  id: string;
  phone: string;
  customerName: string | null;
  issueType: string | null;
  area: string | null;
  urgency: string | null;
  symptoms: string | null;
  attemptedFix: string | null;
  timeframe: string | null;
  photoUrl: string | null;
  urgencyScore: number | null;
  messages: {
    direction: string;
    body: string;
    mediaUrl?: string | null;
    createdAt: Date;
  }[];
}) {
  if (!PLUMBER_EMAIL) {
    console.error("PLUMBER_EMAIL not set");
    return;
  }

  const score = lead.urgencyScore || 0;
  const isEmergency = score >= 50;
  const isUrgent = score >= 25 && !isEmergency;

  /* -------- priority banner -------- */
  let bannerText: string;
  let bannerBg: string;
  let bannerEmoji: string;
  if (isEmergency) {
    bannerText = "ACTIVE FLOODING";
    bannerBg = "#dc2626";
    bannerEmoji = "🚨";
  } else if (isUrgent) {
    bannerText = "URGENT PLUMBING ISSUE";
    bannerBg = "#ea580c";
    bannerEmoji = "⚠️";
  } else {
    bannerText = "NEW SERVICE REQUEST";
    bannerBg = "#2563eb";
    bannerEmoji = "📋";
  }

  const subject = `${bannerEmoji} ${bannerText} — ${lead.issueType || "New Lead"} from ${lead.customerName || "Unknown"}`;

  const SUMMARY_LABEL_MAP: Record<string, string> = {
    "leak.q1": "Leak Source",
    "leak.q2": "Severity",
    "leak.q3": "Duration",
    "leak.q4": "Water Shut Off?",
    "drain.q1": "Drain Type",
    "drain.q2": "Severity",
    "drain.q3": "Attempted Fix",
    "drain.q4": "Multiple Drains?",
    "hotwater.q1": "Water Heater Type",
    "hotwater.q2": "Water Heater Symptom",
    "hotwater.q3": "Duration",
    "hotwater.q4": "Visible Issue",
    "toilet.q1": "Toilet Issue",
    "toilet.q2": "Only Toilet?",
    "emergency.area": "Location",
    "emergency.name": "Customer Name",
    "other.q1": "Description",
  };

  /* -------- conversation Q/A (used for both summary & details) -------- */
  const qaPairs = buildQAPairs(lead.messages, lead.issueType);

  /* -------- dispatch summary fields -------- */
  const summaryRows: { label: string; value: string }[] = [];
  if (lead.area) summaryRows.push({ label: "Location", value: lead.area });
  if (lead.issueType) summaryRows.push({ label: "Problem", value: lead.issueType });

  for (const qa of qaPairs) {
    const label = SUMMARY_LABEL_MAP[qa.nodeId];
    if (label) {
      summaryRows.push({ label, value: qa.answer });
    }
  }

  /* -------- photo -------- */
  const proxiedPhotoUrl =
    lead.photoUrl && lead.photoUrl.startsWith("http")
      ? `${APP_URL}/api/twilio-media?url=${encodeURIComponent(lead.photoUrl)}`
      : null;

  const photoBlock = proxiedPhotoUrl
    ? `<div style="margin: 16px 0;">
      <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #374151;">Photo: Attached</p>
      <img src="${proxiedPhotoUrl}" style="max-width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #e5e7eb;" alt="Customer photo">
      <p style="margin: 8px 0 0; font-size: 12px;">
        <a href="${proxiedPhotoUrl}" style="color: #2563eb;">View full size →</a>
      </p>
    </div>`
    : "";

  const qaBlock = qaPairs.length
    ? `<div style="margin-top: 24px;">
      <p style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.05em;">Conversation Details</p>
      ${qaPairs
        .map(
          (qa) =>
            `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">Q: ${escapeHtml(qa.question)}</p>
              <p style="margin: 4px 0 0; font-size: 15px; font-weight: 600; color: #111827;">A: ${escapeHtml(qa.answer)}</p>
            </div>`
        )
        .join("")}
    </div>`
    : "";

  /* -------- summary HTML rows -------- */
  const summaryHtml = summaryRows
    .map(
      (row) =>
        `<p style="margin: 4px 0; font-size: 15px; color: #111827;">
          <span style="color: #6b7280; font-weight: 500;">${escapeHtml(row.label)}:</span>
          <span style="font-weight: 600;">${escapeHtml(row.value)}</span>
        </p>`
    )
    .join("");

  /* -------- full email HTML -------- */
  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 0; line-height: 1.5; color: #111827; background: #ffffff;">
  <!-- Priority Banner -->
  <div style="background: ${bannerBg}; color: #ffffff; padding: 16px; text-align: center; font-size: 18px; font-weight: 700; letter-spacing: 0.02em;">
    ${bannerEmoji} ${bannerText}
  </div>

  <div style="padding: 16px;">
    <!-- Customer + Phone -->
    <p style="margin: 0 0 4px; font-size: 20px; font-weight: 700;">${escapeHtml(lead.customerName || "Unknown")}</p>
    <p style="margin: 0 0 16px; font-size: 24px; font-weight: 700;">
      <a href="tel:${lead.phone}" style="color: #111827; text-decoration: none;">${lead.phone}</a>
    </p>

    <!-- Tap-to-call button -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 16px; width: 100%;">
      <tr>
        <td style="background-color: #16a34a; border-radius: 8px; text-align: center;">
          <a href="tel:${lead.phone}" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 8px; width: 100%; box-sizing: border-box;">
            📞 Call Back Now
          </a>
        </td>
      </tr>
    </table>

    <!-- Dispatch Summary -->
    <div style="background: #f9fafb; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
      ${summaryHtml}
      ${photoBlock}
    </div>

    <!-- Conversation Details -->
    ${qaBlock}
  </div>
</div>`;

  console.log("Photo proxy URL:", proxiedPhotoUrl);
  console.log(">>> SENDING EMAIL to:", PLUMBER_EMAIL, "issue:", lead.issueType);

  try {
    const { data, error } = await resend.emails.send({
      from: "Missed-Call Recovery <onboarding@resend.dev>",
      to: [PLUMBER_EMAIL],
      subject,
      html,
    });

    if (error) {
      console.error(">>> RESEND RETURNED ERROR:", error);
    } else {
      console.log(">>> EMAIL SENT:", data?.id);
    }
  } catch (error) {
    console.error(">>> EMAIL SEND FAILED:", error);
  }

  /* -------- plumber SMS alert -------- */
  await sendPlumberSms(lead);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
