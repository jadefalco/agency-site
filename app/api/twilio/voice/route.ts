// import { NextResponse } from "next/server";
// import { Twilio } from "twilio";

// const twilioClient = new Twilio(
//   process.env.TWILIO_ACCOUNT_SID!,
//   process.env.TWILIO_AUTH_TOKEN!
// );

// // Use your production URL for the audio file
// const AUDIO_URL = "https://truenorthwebsites.com/audio/missed-call.mp3";

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const from = formData.get("From") as string;
//     const to = formData.get("To") as string;

//     if (from && to) {
//       await twilioClient.messages.create({
//         body: "Sorry we missed your call! What do you need help with?\n\n1. Leak\n2. Drain\n3. Clog\n4. No Hot Water\n5. Toilet Issue\n6. Emergency\n7. Other\n\nReply with a number.",
//         from: to,
//         to: from,
//       });
//     }

//     const twiml = `<?xml version="1.0" encoding="UTF-8"?>
// <Response>
//   <Play>${AUDIO_URL}</Play>
//   <Hangup/>
// </Response>`;

//     return new NextResponse(twiml, {
//       headers: { "Content-Type": "text/xml" },
//     });
//   } catch (error) {
//     console.error("Voice webhook error:", error);
//     // Fallback to Alice if audio fails
//     const twiml = `<?xml version="1.0" encoding="UTF-8"?>
// <Response>
//   <Say voice="alice">Sorry we missed your call. Please text us or call back later.</Say>
//   <Hangup/>
// </Response>`;
//     return new NextResponse(twiml, {
//       headers: { "Content-Type": "text/xml" },
//     });
//   }
// }

// export async function GET() {
//   return new NextResponse("Voice route is running");
// }

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
      await twilioClient.messages.create({
        body: "Sorry we missed your call! What do you need help with?\n\n1. Leak\n2. Drain\n3. Clog\n4. No Hot Water\n5. Toilet Issue\n6. Emergency\n7. Other\n\nReply with a number.",
        from: to,
        to: from,
      });
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Sorry we missed your call. We have sent you a text message to help right away.</Say>
  <Hangup/>
</Response>`;

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Voice webhook error:", error);
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