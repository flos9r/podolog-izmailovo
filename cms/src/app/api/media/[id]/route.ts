import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const filePath = path.join(process.cwd(), "public", media.path);
    await unlink(filePath);
  } catch { /* file may not exist */ }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
