import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";

const fields = [
  { name: "title", label: "Заголовок", required: true },
  { name: "slug", label: "Slug (URL)", required: true },
  { name: "tag", label: "Тег" },
  { name: "excerpt", label: "Краткое описание", type: "textarea" as const },
  { name: "content", label: "Содержание статьи (разделы)", type: "article-sections" as const },
  { name: "sources", label: "Источники", type: "article-sources" as const },
  { name: "coverImage", label: "Обложка", type: "image-picker" as const },
  { name: "seoTitle", label: "SEO заголовок" },
  { name: "seoDescription", label: "SEO описание", type: "textarea" as const },
  { name: "status", label: "Статус", type: "select" as const, options: [{ value: "draft", label: "Черновик" }, { value: "published", label: "Опубликована" }] },
  { name: "order", label: "Порядок", type: "number" as const },
];

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <AdminForm
      title={`Редактирование: ${article.title}`}
      fields={fields}
      initialData={article as unknown as Record<string, unknown>}
      apiUrl={`/api/articles/${id}`}
      method="PUT"
      backUrl="/admin/articles"
      deleteUrl={`/api/articles/${id}`}
    />
  );
}
