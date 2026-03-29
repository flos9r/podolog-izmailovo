import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst({
    where: { id: "default" },
  });

  if (!settings) {
    return (
      <div className="text-center py-8 text-sm text-gray-500">
        Настройки не найдены. Запустите seed: <code>npx tsx prisma/seed.ts</code>
      </div>
    );
  }

  const sections = [
    {
      title: "Основное",
      fields: [
        { label: "Название сайта", value: settings.siteName },
        { label: "SEO заголовок", value: settings.seoTitle },
        { label: "SEO описание", value: settings.seoDescription },
      ],
    },
    {
      title: "Hero-секция",
      fields: [
        { label: "Заголовок", value: settings.heroTitle },
        { label: "Подзаголовок", value: settings.heroSubtitle },
        { label: "Текст кнопки", value: settings.heroCtaText },
      ],
    },
    {
      title: "Специалист",
      fields: [
        { label: "Имя", value: settings.specialistName },
        { label: "Должность", value: settings.specialistTitle },
        { label: "Опыт", value: settings.specialistExp },
        { label: "Биография", value: settings.specialistBio },
      ],
    },
    {
      title: "Контакты",
      fields: [
        { label: "Телефон", value: settings.phoneDisplay },
        { label: "Email", value: settings.email },
        { label: "Адрес", value: settings.addressFull },
        { label: "Часы работы", value: settings.workingHours },
        { label: "Примечание", value: settings.workingHoursNote },
      ],
    },
    {
      title: "Мессенджеры и соцсети",
      fields: [
        { label: "WhatsApp", value: settings.whatsapp },
        { label: "Telegram", value: settings.telegram },
        { label: "Instagram", value: settings.instagram },
      ],
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Настройки сайта</h1>
        <a
          href="/admin/settings/edit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Редактировать
        </a>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700">{section.title}</h2>
            </div>
            <div className="p-4 space-y-3">
              {section.fields.map((field) => (
                <div key={field.label} className="flex">
                  <span className="text-sm text-gray-500 w-40 flex-shrink-0">{field.label}</span>
                  <span className="text-sm text-gray-900">{field.value || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
