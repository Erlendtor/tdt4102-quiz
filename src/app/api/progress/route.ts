import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { questions } from "@/lib/questions";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({}, { status: 401 });

  const progress = await prisma.questionProgress.findMany({
    where: { userId: session.user.id },
  });
  return NextResponse.json(progress);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({}, { status: 401 });

  const { questionId, bucket, timesInBucket2, lastScore } = await req.json();

  const record = await prisma.questionProgress.upsert({
    where: { userId_questionId: { userId: session.user.id, questionId } },
    update: {
      bucket,
      timesInBucket2,
      lastScore,
      attempts: { increment: 1 },
    },
    create: {
      userId: session.user.id,
      questionId,
      bucket,
      timesInBucket2,
      lastScore,
      attempts: 1,
    },
  });
  return NextResponse.json(record);
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({}, { status: 401 });

  const del1Ids = questions.filter((q) => q.source !== "del2").map((q) => q.id);
  await prisma.questionProgress.deleteMany({
    where: { userId: session.user.id, questionId: { in: del1Ids } },
  });
  return NextResponse.json({ ok: true });
}
