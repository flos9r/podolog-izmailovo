import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const data = await request.json();
  const item = await prisma.galleryCase.update({
    where: { id },
    data: {
      title: data.title,
      category: data.category,
      beforeImage: data.beforeImage ?? null,
      afterImage: data.afterImage ?? null,
      beforeAlt: data.beforeAlt ?? "",
      afterAlt: data.afterAlt ?? "",
      description: data.description ?? "",
      order: data.order ?? 0,
      status: data.status ?? "draft",
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  await prisma.galleryCase.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
