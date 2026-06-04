import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const PLUMBER_EMAIL = process.env.PLUMBER_EMAIL;
let APP_URL = process.env.APP_URL;
if (!APP_URL) {
  console.warn("⚠️ APP_URL not set — photo links may not work locally");
  APP_URL = "https://truenorthwebsites.com";
}

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
      ? "🔴 EMERGENCY"
      : (lead.urgencyScore || 0) >= 25
      ? "🟡 MEDIUM"
      : "🟢 LOW";

  const subject = `${urgencyLabel} — ${lead.issueType || "New Lead"} from ${lead.customerName || "Unknown"}`;

  const transcript = lead.messages
    .map((m) => `${m.direction === "inbound" ? "Customer" : "System"}: ${m.body}`)
    .join("\n");

  const proxiedPhotoUrl = lead.photoUrl && lead.photoUrl.startsWith("http")
    ? `${APP_URL}/api/twilio-media?url=${encodeURIComponent(lead.photoUrl)}`
    : null;

  const photoBlock = proxiedPhotoUrl
    ? `<div style="margin: 16px 0;">
  <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Photo</p>
  <img src="${proxiedPhotoUrl}" style="max-width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #e5e7eb;" alt="Customer photo">
  <p style="margin: 8px 0 0; font-size: 12px;">
    <a href="${proxiedPhotoUrl}" style="color: #2563eb;">View full size →</a>
  </p>
</div>`
    : "";

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 16px; line-height: 1.5; color: #111827;">
  <h2 style="margin: 0 0 16px; font-size: 20px;">New Missed-Call Lead</h2>
  <p><strong>Customer:</strong> ${lead.customerName || "Unknown"}</p>
  <p><strong>Phone:</strong> ${lead.phone}</p>
  ${photoBlock}

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 24px auto;">
    <tr>
      <td style="background-color: #2563eb; border-radius: 8px; text-align: center;">
        <a href="tel:${lead.phone}" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 8px;">
          📞 Call Back Now
        </a>
      </td>
    </tr>
  </table>

  <p style="font-size: 28px; font-weight: 700; text-align: center; margin-top: 16px;">
    <a href="tel:${lead.phone}" style="color: #111827; text-decoration: none;">${lead.phone}</a>
  </p>
  <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 4px;">
    Tap the number above to call
  </p>

  <p><strong>Issue:</strong> ${lead.issueType || "—"}</p>
  <p><strong>Area:</strong> ${lead.area || "—"}</p>
  <p><strong>Urgency:</strong> ${lead.urgency || "—"}</p>
  <p><strong>Symptoms:</strong> ${lead.symptoms || "—"}</p>
  <p><strong>Tried:</strong> ${lead.attemptedFix || "—"}</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
  <p><strong>Conversation:</strong></p>
  <div style="white-space: pre-wrap; color: #374151;">${transcript}</div>
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
}
