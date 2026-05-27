import { NextResponse } from "next/server";

export async function POST() {
  console.log("VOICE WEBHOOK HIT");

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">
    Sorry we missed your call.
  </Say>
  <Hangup/>
</Response>`;

  return new NextResponse(twiml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export async function GET() {
  return new NextResponse("Voice route is running");
}