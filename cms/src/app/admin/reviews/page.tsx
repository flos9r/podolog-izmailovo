import { prisma } from "@/lib/prisma";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Отзывы</h1>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-xl border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{review.author}</span>
                  <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {review.date} · {review.service} · {review.source}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    review.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {review.isPublished ? "Опубликован" : "Скрыт"}
                </span>
                <a
                  href={`/admin/reviews/${review.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Редактировать
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">{review.text}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-500">
            Нет отзывов.
          </div>
        )}
      </div>
    </div>
  );
}
