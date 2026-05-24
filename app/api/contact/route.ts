import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "websitestruenorth@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, business, phone, best_time } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (!business || typeof business !== "string" || business.trim().length === 0) {
      return Response.json({ error: "Business name is required" }, { status: 400 });
    }

    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      return Response.json({ error: "Phone number is required" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-CA", {
      timeZone: "America/Vancouver",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailText = [
      "New Missed-Call Recovery Lead",
      "",
      `Name: ${name.trim()}`,
      `Business: ${business.trim()}`,
      `Phone: ${phone.trim()}`,
      `Best Time To Call: ${best_time || "Not specified"}`,
      `Submitted: ${timestamp}`,
      "",
      "—",
      "Sent from truenorthwebsites.com/missed-call-recovery/",
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: "New Missed-Call Recovery Lead",
      text: emailText,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API route error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
