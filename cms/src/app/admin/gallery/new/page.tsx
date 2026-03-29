import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "title", label: "Заголовок", required: true },
  { name: "category", label: "Категория", required: true, placeholder: "Педикюр" },
  { name: "beforeImage", label: "Фото ДО", type: "image-picker" as const },
  { name: "afterImage", label: "Фото ПОСЛЕ", type: "image-picker" as const },
  { name: "beforeAlt", label: "Alt-текст ДО" },
  { name: "afterAlt", label: "Alt-текст ПОСЛЕ" },
  { name: "description", label: "Описание", type: "textarea" as const },
  { name: "status", label: "Статус", type: "select" as const, options: [{ value: "draft", label: "Черновик" }, { value: "published", label: "Опубликован" }] },
  { name: "order", label: "Порядок", type: "number" as const },
];

export default function NewGalleryCasePage() {
  return (
    <AdminForm
      title="Новый кейс галереи"
      fields={fields}
      initialData={{ status: "published" }}
      apiUrl="/api/gallery"
      method="POST"
      backUrl="/admin/gallery"
    />
  );
}
