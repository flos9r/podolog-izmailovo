import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews — list published reviews (public)
export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(reviews);
}
