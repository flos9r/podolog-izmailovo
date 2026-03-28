import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "name", label: "Название", required: true },
  { name: "slug", label: "Slug", required: true },
  { name: "description", label: "Описание", type: "textarea" as const },
  { name: "duration", label: "Длительность" },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default function NewServicePage() {
  return (
    <AdminForm
      title="Новая услуга"
      fields={fields}
      initialData={{ isPublished: true }}
      apiUrl="/api/services"
      method="POST"
      backUrl="/admin/services"
    />
  );
}
