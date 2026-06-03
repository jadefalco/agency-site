import { NextResponse } from "next/server";
import { processIncomingMessage } from "@/lib/messages";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const from = formData.get("From") as string;
    const body = formData.get("Body") as string;
    const mediaUrl = formData.get("MediaUrl0") as string | null;

    // FIX: Only reject missing From. Body can be empty (e.g. photo-only MMS).
    if (!from) {
      return new NextResponse("Missing From", { status: 400 });
    }

    const result = await processIncomingMessage({
      phone: from,
      body: body || "",
      mediaUrl: mediaUrl || undefined,
    });

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(result.reply)}</Message>
</Response>`;

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("SMS webhook error:", error);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Sorry, something went wrong. We'll call you back shortly.</Message>
</Response>`;
    return new NextResponse(fallback, {
      headers: { "Content-Type": "text/xml" },
      status: 200,
    });
  }
}

export async function GET() {
  return new NextResponse("SMS route is running");
}