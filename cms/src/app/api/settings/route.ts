import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settings — get site settings (public)
export async function GET() {
  const settings = await prisma.siteSettings.findFirst({
    where: { id: "default" },
  });
  return NextResponse.json(settings);
}
