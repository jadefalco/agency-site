import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const leadId = formData.get("leadId") as string;

  if (!leadId) {
    return NextResponse.redirect(new URL("/admin/leads?error=missing", request.url));
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: "contacted" },
  });

  return NextResponse.redirect(new URL("/admin/leads?success=1", request.url));
}