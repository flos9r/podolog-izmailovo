import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "author", label: "Автор", required: true },
  { name: "text", label: "Текст отзыва", type: "textarea" as const, required: true },
  { name: "rating", label: "Оценка (1-5)", type: "number" as const },
  { name: "date", label: "Дата" },
  { name: "service", label: "Услуга" },
  { name: "source", label: "Источник" },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.review.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <AdminForm
      title={`Редактирование отзыва: ${item.author}`}
      fields={fields}
      initialData={item as unknown as Record<string, unknown>}
      apiUrl={`/api/reviews/${id}`}
      method="PUT"
      backUrl="/admin/reviews"
      deleteUrl={`/api/reviews/${id}`}
    />
  );
}
