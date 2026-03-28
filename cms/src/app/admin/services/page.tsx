import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Услуги</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Название</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Длительность</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Порядок</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{service.name}</div>
                  <div className="text-xs text-gray-500 max-w-md truncate">{service.description}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{service.duration}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      service.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {service.isPublished ? "Опубликована" : "Скрыта"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{service.order}</td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={`/admin/services/${service.id}`}
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
