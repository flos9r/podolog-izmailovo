import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/advantages — list published advantages (public)
export async function GET() {
  const advantages = await prisma.advantage.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(advantages);
}
