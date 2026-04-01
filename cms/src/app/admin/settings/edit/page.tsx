import { prisma } from "@/lib/prisma";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "siteName", label: "Название сайта" },
  { name: "heroTitle", label: "Hero — заголовок" },
  { name: "heroSubtitle", label: "Hero — подзаголовок", type: "textarea" as const },
  { name: "heroCtaText", label: "Hero — текст кнопки" },
  { name: "heroCtaUrl", label: "Hero — ссылка кнопки" },
  { name: "heroSpecialistPhoto", label: "Hero — фото специалиста (первый экран)", type: "image-picker" as const },
  { name: "heroImageFit", label: "Hero фото — режим заполнения", type: "select" as const, options: [
    { value: "cover", label: "Заполнить (cover)" },
    { value: "contain", label: "Вписать (contain)" },
  ] },
  { name: "heroImagePosition", label: "Hero фото — фокусная точка", type: "select" as const, options: [
    { value: "center center", label: "По центру" },
    { value: "center top", label: "Верх" },
    { value: "center bottom", label: "Низ" },
    { value: "left center", label: "Лево" },
    { value: "right center", label: "Право" },
    { value: "left top", label: "Верх-лево" },
    { value: "right top", label: "Верх-право" },
  ] },
  { name: "heroImageZoom", label: "Hero фото — масштаб (1.0 = без масштаба)", type: "number" as const },
  { name: "specialistName", label: "Имя специалиста" },
  { name: "specialistTitle", label: "Должность" },
  { name: "specialistBio", label: "Биография", type: "textarea" as const },
  { name: "specialistPhoto", label: "Фото специалиста (устарело)", type: "image-picker" as const },
  { name: "secondarySpecialistPhoto", label: "Фото специалиста — блок «О специалисте»", type: "image-picker" as const },
  { name: "aboutImageFit", label: "«О специалисте» фото — режим заполнения", type: "select" as const, options: [
    { value: "cover", label: "Заполнить (cover)" },
    { value: "contain", label: "Вписать (contain)" },
  ] },
  { name: "aboutImagePosition", label: "«О специалисте» фото — фокусная точка", type: "select" as const, options: [
    { value: "center center", label: "По центру" },
    { value: "center top", label: "Верх" },
    { value: "center bottom", label: "Низ" },
    { value: "left center", label: "Лево" },
    { value: "right center", label: "Право" },
    { value: "left top", label: "Верх-лево" },
    { value: "right top", label: "Верх-право" },
  ] },
  { name: "aboutImageZoom", label: "«О специалисте» фото — масштаб (1.0 = без масштаба)", type: "number" as const },
  { name: "specialistExp", label: "Опыт" },
  { name: "podologyTitle", label: "Раздел «Подология» — заголовок" },
  { name: "podologySubtitle", label: "Раздел «Подология» — описание", type: "textarea" as const },
  { name: "podologyCtaText", label: "Раздел «Подология» — текст кнопки" },
  { name: "podologyCtaUrl", label: "Раздел «Подология» — ссылка кнопки" },
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
