import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }

  const navItems = [
    { href: "/admin", label: "Панель управления", icon: "📊" },
    { href: "/admin/settings", label: "Настройки сайта", icon: "⚙️" },
    { href: "/admin/articles", label: "Статьи", icon: "📝" },
    { href: "/admin/gallery", label: "Галерея до/после", icon: "🖼️" },
    { href: "/admin/services", label: "Услуги", icon: "💼" },
    { href: "/admin/prices", label: "Прайс-лист", icon: "💰" },
    { href: "/admin/reviews", label: "Отзывы", icon: "⭐" },
    { href: "/admin/advantages", label: "Преимущества", icon: "✅" },
    { href: "/admin/tools", label: "Инструменты", icon: "🔧" },
    { href: "/admin/media", label: "Медиа-файлы", icon: "📁" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">Подолог CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Панель управления</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
            <span>👤</span>
            <span>{session.email}</span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
