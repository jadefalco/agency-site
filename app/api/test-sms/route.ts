import { NextResponse } from "next/server";

// Force dynamic so Next.js never tries to statically generate this API route
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Test mode disabled in production" }, { status: 403 });
  }

  try {
    const { phone, body, mediaUrl } = await request.json();

    if (!phone || !body) {
      return NextResponse.json(
        { error: "phone and body are required" },
        { status: 400 }
      );
    }

    // Lazy import — prevents build-time crashes if lib/dispatcher has side effects
    const { processIncomingMessage } = await import("@/lib/dispatcher");

    const result = await processIncomingMessage({
      phone,
      body,
      mediaUrl,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Test SMS error:", error);
    return NextResponse.json(
      { error: "Failed to process test message" },
      { status: 500 }
    );
  }
}