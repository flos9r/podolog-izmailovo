import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const reviews = await prisma.review.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } });
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const data = await request.json();
  const item = await prisma.review.create({ data: { author: data.author, text: data.text, rating: data.rating ?? 5, date: data.date ?? "", service: data.service ?? "", source: data.source ?? "Яндекс Карты", order: data.order ?? 0, isPublished: data.isPublished ?? true } });
  return NextResponse.json(item, { status: 201 });
}
