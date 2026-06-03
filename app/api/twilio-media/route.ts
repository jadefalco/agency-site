import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaUrl = searchParams.get("url");

  if (!mediaUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return new NextResponse("Twilio credentials not configured", { status: 500 });
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  try {
    const twilioRes = await fetch(mediaUrl, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!twilioRes.ok) {
      return new NextResponse("Failed to fetch from Twilio", { status: 502 });
    }

    const contentType = twilioRes.headers.get("content-type") || "image/jpeg";
    const blob = await twilioRes.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("Media proxy error:", err);
    return new NextResponse("Proxy error", { status: 500 });
  }
}