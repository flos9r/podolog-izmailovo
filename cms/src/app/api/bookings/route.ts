import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const data = await request.json();
  const name = String(data.name ?? "").trim().slice(0, 200);
  const phone = String(data.phone ?? "").trim().slice(0, 50);
  if (!name || !phone) {
    return NextResponse.json({ error: "Имя и телефон обязательны" }, { status: 400 });
  }
  const email = String(data.email ?? "").trim().slice(0, 200);
  const service = String(data.service ?? "").trim().slice(0, 200);
  const comment = String(data.comment ?? "").trim().slice(0, 2000);
  const item = await prisma.booking.create({ data: { name, phone, email, service, comment, status: "new" } });
  return NextResponse.json(item, { status: 201 });
}
