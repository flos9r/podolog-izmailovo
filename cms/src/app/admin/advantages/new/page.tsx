import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "title", label: "Заголовок", required: true },
  { name: "description", label: "Описание", type: "textarea" as const, required: true },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default function NewAdvantagePage() {
  return (
    <AdminForm
      title="Новое преимущество"
      fields={fields}
      initialData={{ isPublished: true }}
      apiUrl="/api/advantages"
      method="POST"
      backUrl="/admin/advantages"
    />
  );
}
