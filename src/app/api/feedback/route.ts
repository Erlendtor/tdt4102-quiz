import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message?.trim()) return NextResponse.json({ error: "empty" }, { status: 400 });
  await prisma.feedback.create({ data: { message: message.trim() } });
  return NextResponse.json({ ok: true });
}
