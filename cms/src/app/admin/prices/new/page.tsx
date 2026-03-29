import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "serviceName", label: "Название услуги", required: true },
  { name: "price", label: "Цена", required: true },
  { name: "duration", label: "Длительность" },
  { name: "order", label: "Порядок", type: "number" as const },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" as const },
];

export default function NewPricePage() {
  return (
    <AdminForm
      title="Новая позиция прайса"
      fields={fields}
      initialData={{ isPublished: true }}
      apiUrl="/api/prices"
      method="POST"
      backUrl="/admin/prices"
    />
  );
}
