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

export default function NewReviewPage() {
  return (
    <AdminForm
      title="Новый отзыв"
      fields={fields}
      initialData={{ rating: 5, isPublished: true, source: "Яндекс Карты" }}
      apiUrl="/api/reviews"
      method="POST"
      backUrl="/admin/reviews"
    />
  );
}
