import { prisma } from "@/lib/prisma";
import Link from "next/link";

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "Новая", className: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Подтверждена", className: "bg-blue-100 text-blue-700" },
  completed: { label: "Завершена", className: "bg-green-100 text-green-700" },
  cancelled: { label: "Отменена", className: "bg-gray-100 text-gray-500" },
};

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = bookings.filter(b => b.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
          {newCount > 0 && (
            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold rounded-full bg-yellow-400 text-yellow-900">
              {newCount} новых
            </span>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {bookings.map(b => {
          const status = statusConfig[b.status] ?? statusConfig.new;
          return (
            <div key={b.id} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{b.name}</span>
                    <span className="text-sm text-gray-500">{b.phone}</span>
                  </div>
                  {b.email && <p className="text-xs text-gray-500 mt-0.5">{b.email}</p>}
                  {b.service && <p className="text-xs text-gray-500 mt-0.5">Услуга: {b.service}</p>}
                  {b.comment && <p className="text-sm text-gray-700 mt-2 line-clamp-2">{b.comment}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${status.className}`}>{status.label}</span>
                  <Link href={`/admin/bookings/${b.id}`} className="text-sm text-blue-600 hover:text-blue-800">Подробнее</Link>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{new Date(b.createdAt).toLocaleString("ru-RU")}</p>
            </div>
          );
        })}
        {bookings.length === 0 && <div className="text-center py-8 text-sm text-gray-500">Нет заявок.</div>}
      </div>
    </div>
  );
}
