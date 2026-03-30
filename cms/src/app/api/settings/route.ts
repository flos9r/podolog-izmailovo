import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const settings = await prisma.siteSettings.findFirst({ where: { id: "default" } });
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try { await requireAuth(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const data = await request.json();
  const settings = await prisma.siteSettings.update({
    where: { id: "default" },
    data: {
      siteName: data.siteName,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroCtaText: data.heroCtaText,
      heroCtaUrl: data.heroCtaUrl,
      specialistName: data.specialistName,
      specialistTitle: data.specialistTitle,
      specialistBio: data.specialistBio,
      specialistPhoto: data.specialistPhoto,
      heroSpecialistPhoto: data.heroSpecialistPhoto,
      secondarySpecialistPhoto: data.secondarySpecialistPhoto,
      specialistExp: data.specialistExp,
      podologyTitle: data.podologyTitle,
      podologySubtitle: data.podologySubtitle,
      podologyCtaText: data.podologyCtaText,
      podologyCtaUrl: data.podologyCtaUrl,
      phone: data.phone,
      phoneDisplay: data.phoneDisplay,
      email: data.email,
      address: data.address,
      addressFull: data.addressFull,
      workingHours: data.workingHours,
      workingHoursNote: data.workingHoursNote,
      whatsapp: data.whatsapp,
      telegram: data.telegram,
      instagram: data.instagram,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      mapQuery: data.mapQuery,
    },
  });
  return NextResponse.json(settings);
}
