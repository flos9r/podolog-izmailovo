import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "title", label: "Заголовок", required: true },
  { name: "slug", label: "Slug (URL)", required: true, placeholder: "my-article" },
  { name: "tag", label: "Тег", placeholder: "Уход" },
  { name: "excerpt", label: "Краткое описание", type: "textarea" as const },
  { name: "content", label: "Контент (JSON)", type: "textarea" as const, placeholder: '[{"heading":"...","text":"..."}]' },
  { name: "sources", label: "Источники (JSON)", type: "textarea" as const, placeholder: '[{"text":"...","url":"..."}]' },
  { name: "coverImage", label: "Обложка (URL/путь)" },
  { name: "seoTitle", label: "SEO заголовок" },
  { name: "seoDescription", label: "SEO описание", type: "textarea" as const },
  { name: "status", label: "Статус", type: "select" as const, options: [{ value: "draft", label: "Черновик" }, { value: "published", label: "Опубликована" }] },
  { name: "order", label: "Порядок", type: "number" as const },
];

export default function NewArticlePage() {
  return (
    <AdminForm
      title="Новая статья"
      fields={fields}
      initialData={{ status: "draft", content: "[]", sources: "[]" }}
      apiUrl="/api/articles"
      method="POST"
      backUrl="/admin/articles"
    />
  );
}
