import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const data = await request.json();
  const article = await prisma.article.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      tag: data.tag ?? "",
      excerpt: data.excerpt ?? "",
      content: data.content ?? "[]",
      sources: data.sources ?? "[]",
      coverImage: data.coverImage ?? null,
      seoTitle: data.seoTitle ?? "",
      seoDescription: data.seoDescription ?? "",
      status: data.status ?? "draft",
      publishedAt: data.status === "published" ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(article);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
