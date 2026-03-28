import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/prices — list published prices (public)
export async function GET() {
  const prices = await prisma.price.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(prices);
}
