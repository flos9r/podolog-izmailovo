import { prisma } from "@/lib/prisma";

export default async function AdvantagesPage() {
  const advantages = await prisma.advantage.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Преимущества</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Заголовок</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Порядок</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody>
            {advantages.map((adv) => (
              <tr key={adv.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{adv.title}</div>
                  <div className="text-xs text-gray-500 max-w-md truncate">{adv.description}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      adv.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {adv.isPublished ? "Опубликован" : "Скрыт"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{adv.order}</td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={`/admin/advantages/${adv.id}`}
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
