import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const data = await request.json();
  const item = await prisma.review.update({ where: { id }, data: { author: data.author, text: data.text, rating: data.rating ?? 5, date: data.date ?? "", service: data.service ?? "", source: data.source ?? "", order: data.order ?? 0, isPublished: data.isPublished ?? true } });
  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
