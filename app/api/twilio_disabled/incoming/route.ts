import { NextResponse } from "next/server";
import { processIncomingMessage } from "@/lib/dispatcher";

function validateEnv(): { ok: true } | { ok: false; error: string } {
  const missing: string[] = [];
  if (!process.env.TWILIO_ACCOUNT_SID) missing.push("TWILIO_ACCOUNT_SID");
  if (!process.env.TWILIO_AUTH_TOKEN) missing.push("TWILIO_AUTH_TOKEN");
  if (!process.env.OPENAI_API_KEY) missing.push("OPENAI_API_KEY");
  if (!process.env.DATABASE_URL) missing.push("DATABASE_URL");

  if (missing.length > 0) {
    return {
      ok: false,
      error: `Missing required environment variables: ${missing.join(", ")}`,
    };
  }
  return { ok: true };
}

function buildFallbackTwiml(message?: string): string {
  const safeMessage =
    message || "Thanks for reaching out — Mike will call you back shortly.";
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(safeMessage)}</Message>
</Response>`;
}

export async function POST(request: Request) {
  console.log("TWILIO WEBHOOK HIT");

  const envCheck = validateEnv();
  if (!envCheck.ok) {
    console.error("[Twilio Webhook] Environment validation failed:", envCheck.error);
    return new NextResponse(buildFallbackTwiml(), {
      headers: { "Content-Type": "application/xml" },
      status: 200,
    });
  }

  let from: string | null = null;
  let body = "";
  const mediaUrls: string[] = [];

  try {
    const formData = await request.formData();
    from = formData.get("From") as string;
    body = (formData.get("Body") as string) || "";
    const numMedia = parseInt((formData.get("NumMedia") as string) || "0", 10);

    // Collect all media URLs safely
    for (let i = 0; i < numMedia; i++) {
      const url = formData.get(`MediaUrl${i}`) as string;
      if (url) mediaUrls.push(url);
    }

    if (!from) {
      console.warn("[Twilio Webhook] Missing 'From' field in request");
      return new NextResponse(buildFallbackTwiml(), {
        headers: { "Content-Type": "application/xml" },
        status: 200,
      });
    }

    // Use first media URL for processing (primary image)
    const primaryMediaUrl = mediaUrls[0] || undefined;

    const { reply } = await processIncomingMessage({
      phone: from,
      body,
      mediaUrl: primaryMediaUrl,
    });

    console.log("[TWILIO REPLY]", reply);

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(reply)}</Message>
</Response>`;

    return new NextResponse(twiml, {
      headers: { "Content-Type": "application/xml" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Twilio Webhook] Unhandled error:", {
      from,
      bodyPreview: body.slice(0, 100),
      mediaCount: mediaUrls.length,
      error: errorMessage,
    });

    return new NextResponse(buildFallbackTwiml(), {
      headers: { "Content-Type": "application/xml" },
      status: 200,
    });
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
