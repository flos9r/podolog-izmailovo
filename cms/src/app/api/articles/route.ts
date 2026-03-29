import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/articles — list all articles
export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(articles);
}

// POST /api/articles — create new article
export async function POST(request: Request) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        tag: data.tag || "",
        excerpt: data.excerpt || "",
        content: data.content || "[]",
        sources: data.sources || "[]",
        coverImage: data.coverImage || null,
        seoTitle: data.seoTitle || "",
        seoDescription: data.seoDescription || "",
        status: data.status || "draft",
        publishedAt: data.status === "published" ? new Date() : null,
        order: data.order || 0,
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create article", details: String(error) },
      { status: 400 }
    );
  }
}
