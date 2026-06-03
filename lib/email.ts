import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const PLUMBER_EMAIL = process.env.PLUMBER_EMAIL;

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
  messages: { direction: string; body: string; createdAt: Date }[];
}) {
  if (!PLUMBER_EMAIL) {
    console.error("PLUMBER_EMAIL not set");
    return;
  }

  const urgencyLabel =
    (lead.urgencyScore || 0) >= 50
      ? "EMERGENCY"
      : (lead.urgencyScore || 0) >= 25
      ? "MEDIUM"
      : "LOW";

  const subject = `[${urgencyLabel}] ${lead.issueType || "New Lead"} from ${lead.customerName || "Unknown"}`;

  const transcript = lead.messages
    .map((m) => `${m.direction === "inbound" ? "Customer" : "System"}: ${m.body}`)
    .join("\n");

  const photoLine =
    lead.photoUrl && lead.photoUrl.startsWith("http")
      ? `Photo: ${lead.photoUrl}\n`
      : "";

  const text = `New Missed-Call Lead

Customer: ${lead.customerName || "Unknown"}
Phone: ${lead.phone}
Call back: ${lead.phone}

Issue: ${lead.issueType || "—"}
Area: ${lead.area || "—"}
Urgency: ${lead.urgency || "—"}
Symptoms: ${lead.symptoms || "—"}
Tried: ${lead.attemptedFix || "—"}
${photoLine}
---
Conversation:
${transcript}
`;

  console.log(">>> SENDING EMAIL to:", PLUMBER_EMAIL, "issue:", lead.issueType);

  try {
    const { data, error } = await resend.emails.send({
      from: "Missed-Call Recovery <onboarding@resend.dev>",
      to: [PLUMBER_EMAIL],
      subject,
      text,
    });

    if (error) {
      console.error(">>> RESEND RETURNED ERROR:", error);
    } else {
      console.log(">>> EMAIL SENT:", data?.id);
    }
  } catch (error) {
    console.error(">>> EMAIL SEND FAILED:", error);
  }
}
