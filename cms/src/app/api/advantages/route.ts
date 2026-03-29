import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const advantages = await prisma.advantage.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } });
  return NextResponse.json(advantages);
}

export async function POST(request: Request) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const data = await request.json();
  const item = await prisma.advantage.create({ data: { title: data.title, description: data.description ?? "", order: data.order ?? 0, isPublished: data.isPublished ?? true } });
  return NextResponse.json(item, { status: 201 });
}
