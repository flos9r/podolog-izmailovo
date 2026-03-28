import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "name", label: "Название", required: true },
  { name: "purpose", label: "Назначение" },
  { name: "description", label: "Описание", type: "textarea" as const, required: true },
  { name: "benefits", label: "Преимущества (по одному)", type: "string-list" as const },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default function NewToolPage() {
  return (
    <AdminForm
      title="Новый инструмент"
      fields={fields}
      initialData={{ isPublished: true, benefits: "[]" }}
      apiUrl="/api/tools"
      method="POST"
      backUrl="/admin/tools"
    />
  );
}
