import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/gallery — list all gallery cases (public)
export async function GET() {
  const cases = await prisma.galleryCase.findMany({
    where: { status: "published" },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(cases);
}

// POST /api/gallery — create new gallery case
export async function POST(request: Request) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const galleryCase = await prisma.galleryCase.create({
      data: {
        title: data.title,
        category: data.category,
        beforeImage: data.beforeImage || null,
        afterImage: data.afterImage || null,
        beforeAlt: data.beforeAlt || "",
        afterAlt: data.afterAlt || "",
        description: data.description || "",
        order: data.order || 0,
        status: data.status || "draft",
      },
    });
    return NextResponse.json(galleryCase, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create gallery case", details: String(error) },
      { status: 400 }
    );
  }
}
