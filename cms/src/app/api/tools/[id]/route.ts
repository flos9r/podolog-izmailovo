import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const data = await request.json();
  const item = await prisma.tool.update({ where: { id }, data: { name: data.name, purpose: data.purpose ?? "", description: data.description ?? "", benefits: data.benefits ?? "[]", order: data.order ?? 0, isPublished: data.isPublished ?? true } });
  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  await prisma.tool.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
