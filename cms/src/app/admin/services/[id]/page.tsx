import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "name", label: "Название", required: true },
  { name: "slug", label: "Slug", required: true },
  { name: "description", label: "Описание", type: "textarea" as const },
  { name: "duration", label: "Длительность" },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.service.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <AdminForm
      title={`Редактирование: ${item.name}`}
      fields={fields}
      initialData={item as unknown as Record<string, unknown>}
      apiUrl={`/api/services/${id}`}
      method="PUT"
      backUrl="/admin/services"
      deleteUrl={`/api/services/${id}`}
    />
  );
}
