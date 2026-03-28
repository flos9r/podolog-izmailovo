import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "title", label: "Заголовок", required: true },
  { name: "description", label: "Описание", type: "textarea" as const, required: true },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default async function EditAdvantagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.advantage.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <AdminForm
      title={`Редактирование: ${item.title}`}
      fields={fields}
      initialData={item as unknown as Record<string, unknown>}
      apiUrl={`/api/advantages/${id}`}
      method="PUT"
      backUrl="/admin/advantages"
      deleteUrl={`/api/advantages/${id}`}
    />
  );
}
