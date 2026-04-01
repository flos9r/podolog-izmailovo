import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    articleCount,
    galleryCount,
    serviceCount,
    priceCount,
    reviewCount,
    mediaCount,
    bookingNewCount,
    bookingTotalCount,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.galleryCase.count(),
    prisma.service.count(),
    prisma.price.count(),
    prisma.review.count(),
    prisma.media.count(),
    prisma.booking.count({ where: { status: "new" } }),
    prisma.booking.count(),
  ]);

  const stats = [
    { label: "Заявки", count: bookingTotalCount, href: "/admin/bookings", icon: "📋", badge: bookingNewCount > 0 ? `${bookingNewCount} новых` : undefined },
    { label: "Статьи", count: articleCount, href: "/admin/articles", icon: "📝" },
    { label: "Галерея", count: galleryCount, href: "/admin/gallery", icon: "🖼️" },
    { label: "Услуги", count: serviceCount, href: "/admin/services", icon: "💼" },
    { label: "Прайс-лист", count: priceCount, href: "/admin/prices", icon: "💰" },
    { label: "Отзывы", count: reviewCount, href: "/admin/reviews", icon: "⭐" },
    { label: "Медиа", count: mediaCount, href: "/admin/media", icon: "📁" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Панель управления
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <a
            key={stat.href}
            href={stat.href}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  {"badge" in stat && stat.badge && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-full bg-yellow-400 text-yellow-900">
                      {stat.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Быстрые действия
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="/admin/bookings"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">📋</span>
            <span className="text-sm text-gray-700">Просмотреть заявки</span>
          </a>
          <a
            href="/admin/articles"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">➕</span>
            <span className="text-sm text-gray-700">Новая статья</span>
          </a>
          <a
            href="/admin/gallery"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">📷</span>
            <span className="text-sm text-gray-700">Добавить кейс в галерею</span>
          </a>
          <a
            href="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">⚙️</span>
            <span className="text-sm text-gray-700">Настройки сайта</span>
          </a>
          <a
            href="/admin/media"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">📁</span>
            <span className="text-sm text-gray-700">Загрузить изображение</span>
          </a>
        </div>
      </div>
    </div>
  );
}
