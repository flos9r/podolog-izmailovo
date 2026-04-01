import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  {
    name: "status",
    label: "Статус",
    type: "select" as const,
    options: [
      { value: "new", label: "Новая" },
      { value: "confirmed", label: "Подтверждена" },
      { value: "completed", label: "Завершена" },
      { value: "cancelled", label: "Отменена" },
    ],
  },
];

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.booking.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Информация о заявке</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div><span className="text-gray-500">Имя:</span> <span className="font-medium text-gray-900">{item.name}</span></div>
          <div><span className="text-gray-500">Телефон:</span> <span className="font-medium text-gray-900">{item.phone}</span></div>
          {item.email && <div><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-900">{item.email}</span></div>}
          {item.service && <div><span className="text-gray-500">Услуга:</span> <span className="font-medium text-gray-900">{item.service}</span></div>}
          <div><span className="text-gray-500">Создана:</span> <span className="font-medium text-gray-900">{new Date(item.createdAt).toLocaleString("ru-RU")}</span></div>
          <div><span className="text-gray-500">Обновлена:</span> <span className="font-medium text-gray-900">{new Date(item.updatedAt).toLocaleString("ru-RU")}</span></div>
        </div>
        {item.comment && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-500">Комментарий:</span>
            <p className="text-sm text-gray-900 mt-1">{item.comment}</p>
          </div>
        )}
      </div>

      <AdminForm
        title="Управление заявкой"
        fields={fields}
        initialData={item as unknown as Record<string, unknown>}
        apiUrl={`/api/bookings/${id}`}
        method="PUT"
        backUrl="/admin/bookings"
        deleteUrl={`/api/bookings/${id}`}
      />
    </div>
  );
}
