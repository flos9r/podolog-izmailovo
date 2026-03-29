import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function GalleryPage() {
  const cases = await prisma.galleryCase.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Галерея до/после</h1>
        <Link
          href="/admin/gallery/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Новый кейс
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {item.beforeImage ? (
                <img
                  src={item.beforeImage}
                  alt={item.beforeAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Нет изображения</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                  {item.category}
                </span>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    item.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status === "published" ? "Опубликован" : "Черновик"}
                </span>
              </div>
              <div className="mt-3">
                <Link
                  href={`/admin/gallery/${item.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Редактировать →
                </Link>
              </div>
            </div>
          </div>
        ))}
        {cases.length === 0 && (
          <div className="col-span-full text-center py-8 text-sm text-gray-500">
            Нет кейсов. Создайте первый кейс.
          </div>
        )}
      </div>
    </div>
  );
}
