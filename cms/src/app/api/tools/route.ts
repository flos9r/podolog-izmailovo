import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const tools = await prisma.tool.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } });
  return NextResponse.json(tools);
}

export async function POST(request: Request) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const data = await request.json();
  const item = await prisma.tool.create({ data: { name: data.name, purpose: data.purpose ?? "", description: data.description ?? "", benefits: data.benefits ?? "[]", order: data.order ?? 0, isPublished: data.isPublished ?? true } });
  return NextResponse.json(item, { status: 201 });
}
