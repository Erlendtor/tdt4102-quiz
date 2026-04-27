import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({}, { status: 401 });

  const { score, maxScore, grade, topics } = await req.json();

  const result = await prisma.examResult.create({
    data: { userId: session.user.id, score, maxScore, grade, topics },
  });
  return NextResponse.json(result);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const results = await prisma.examResult.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return NextResponse.json(results);
}
