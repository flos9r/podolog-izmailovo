import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "name", label: "Название", required: true },
  { name: "purpose", label: "Назначение" },
  { name: "description", label: "Описание", type: "textarea" as const, required: true },
  { name: "benefits", label: "Преимущества (JSON)", type: "textarea" as const },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default async function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.tool.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <AdminForm
      title={`Редактирование: ${item.name}`}
      fields={fields}
      initialData={item as unknown as Record<string, unknown>}
      apiUrl={`/api/tools/${id}`}
      method="PUT"
      backUrl="/admin/tools"
      deleteUrl={`/api/tools/${id}`}
    />
  );
}
