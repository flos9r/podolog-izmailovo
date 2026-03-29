import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const services = await prisma.service.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const data = await request.json();
  const item = await prisma.service.create({ data: { slug: data.slug, name: data.name, description: data.description ?? "", duration: data.duration ?? "", order: data.order ?? 0, isPublished: data.isPublished ?? true } });
  return NextResponse.json(item, { status: 201 });
}
