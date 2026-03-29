import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Отзывы</h1>
        <Link href="/admin/reviews/new" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">+ Новый отзыв</Link>
      </div>
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{r.author}</span>
                  <span className="text-yellow-500">{"⭐".repeat(r.rating)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{r.date} · {r.service} · {r.source}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${r.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.isPublished ? "Опубликован" : "Скрыт"}</span>
                <Link href={`/admin/reviews/${r.id}`} className="text-sm text-blue-600 hover:text-blue-800">Редактировать</Link>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">{r.text}</p>
          </div>
        ))}
        {reviews.length === 0 && <div className="text-center py-8 text-sm text-gray-500">Нет отзывов.</div>}
      </div>
    </div>
  );
}
