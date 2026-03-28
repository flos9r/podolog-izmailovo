import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services — list published services (public)
export async function GET() {
  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}
