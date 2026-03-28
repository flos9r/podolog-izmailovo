import { prisma } from "@/lib/prisma";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "siteName", label: "Название сайта" },
  { name: "heroTitle", label: "Hero — заголовок" },
  { name: "heroSubtitle", label: "Hero — подзаголовок", type: "textarea" as const },
  { name: "heroCtaText", label: "Hero — текст кнопки" },
  { name: "heroCtaUrl", label: "Hero — ссылка кнопки" },
  { name: "specialistName", label: "Имя специалиста" },
  { name: "specialistTitle", label: "Должность" },
  { name: "specialistBio", label: "Биография", type: "textarea" as const },
  { name: "specialistPhoto", label: "Фото специалиста (URL/путь)" },
  { name: "specialistExp", label: "Опыт" },
  { name: "phone", label: "Телефон" },
  { name: "phoneDisplay", label: "Телефон (отображение)" },
  { name: "email", label: "Email" },
  { name: "address", label: "Адрес (короткий)" },
  { name: "addressFull", label: "Адрес (полный)" },
  { name: "workingHours", label: "Часы работы" },
  { name: "workingHoursNote", label: "Примечание к часам" },
  { name: "whatsapp", label: "WhatsApp номер" },
  { name: "telegram", label: "Telegram" },
  { name: "instagram", label: "Instagram" },
  { name: "seoTitle", label: "SEO заголовок" },
  { name: "seoDescription", label: "SEO описание", type: "textarea" as const },
  { name: "mapQuery", label: "Карта запрос" },
];

export default async function EditSettingsPage() {
  const settings = await prisma.siteSettings.findFirst({ where: { id: "default" } });

  return (
    <AdminForm
      title="Редактирование настроек сайта"
      fields={fields}
      initialData={(settings ?? {}) as unknown as Record<string, unknown>}
      apiUrl="/api/settings"
      method="PUT"
      backUrl="/admin/settings"
    />
  );
}
