import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "title", label: "Заголовок", required: true },
  { name: "category", label: "Категория", required: true },
  { name: "beforeImage", label: "Фото ДО (URL/путь)" },
  { name: "afterImage", label: "Фото ПОСЛЕ (URL/путь)" },
  { name: "beforeAlt", label: "Alt-текст ДО" },
  { name: "afterAlt", label: "Alt-текст ПОСЛЕ" },
  { name: "description", label: "Описание", type: "textarea" as const },
  { name: "status", label: "Статус", type: "select" as const, options: [{ value: "draft", label: "Черновик" }, { value: "published", label: "Опубликован" }] },
  { name: "order", label: "Порядок", type: "number" as const },
];

export default async function EditGalleryCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.galleryCase.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <AdminForm
      title={`Редактирование: ${item.title}`}
      fields={fields}
      initialData={item as unknown as Record<string, unknown>}
      apiUrl={`/api/gallery/${id}`}
      method="PUT"
      backUrl="/admin/gallery"
      deleteUrl={`/api/gallery/${id}`}
    />
  );
}
