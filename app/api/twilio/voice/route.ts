import { NextResponse } from "next/server";
import { Twilio } from "twilio";

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const from = formData.get("From") as string;
    const to = formData.get("To") as string;

    if (from && to) {
      // Send the recovery SMS immediately
      await twilioClient.messages.create({
        body: "Sorry we missed your call! What do you need help with?\n\n1️⃣ Leak\n2️⃣ Drain\n3️⃣ Clog\n4️⃣ No Hot Water\n5️⃣ Toilet Issue\n6️⃣ Emergency\n7️⃣ Other\n\nReply with a number.",
        from: to,
        to: from,
      });
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Sorry we missed your call. Please text us or call back later.</Say>
  <Hangup/>
</Response>`;

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Voice webhook error:", error);
    
    // Fallback to TTS if anything fails
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Sorry we missed your call. Please text us or call back later.</Say>
  <Hangup/>
</Response>`;
    
    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    });
  }
}

export async function GET() {
  return new NextResponse("Voice route is running");
}