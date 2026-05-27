import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const mediaPath = params.path.join("/");

  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;

  const url = `https://api.twilio.com/${mediaPath}`;

  const response = await fetch(url, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
    },
  });

  const contentType =
    response.headers.get("content-type") || "image/jpeg";

  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
    },
  });
}