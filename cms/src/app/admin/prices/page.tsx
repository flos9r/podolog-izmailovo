import { prisma } from "@/lib/prisma";

export default async function PricesPage() {
  const prices = await prisma.price.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Прайс-лист</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Услуга</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Цена</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Длительность</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{price.serviceName}</td>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">{price.price}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{price.duration}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      price.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {price.isPublished ? "Опубликована" : "Скрыта"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={`/admin/prices/${price.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Редактировать
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
