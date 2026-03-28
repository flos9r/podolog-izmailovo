import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/tools — list published tools (public)
export async function GET() {
  const tools = await prisma.tool.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(tools);
}
