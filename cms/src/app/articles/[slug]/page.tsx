import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

// Always fetch fresh data from DB so admin edits are reflected immediately
export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug, status: "published" },
  });
  if (!article) notFound();

  const settings = await prisma.siteSettings.findFirst();
  const sections: { heading: string; text: string }[] = JSON.parse(article.content || "[]");
  const sources: { text: string; url: string }[] = JSON.parse(article.sources || "[]");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold" style={{ color: "#7B6B54" }}>
            {settings?.specialistName || "Подолог"}
          </Link>
          <Link href="/#articles" className="text-sm text-gray-600 hover:text-gray-900">
            ← Все статьи
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {article.tag && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4" style={{ backgroundColor: "#FAF7F2", color: "#7B6B54" }}>
            {article.tag}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        {article.excerpt && (
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
        )}
        {article.publishedAt && (
          <p className="text-sm text-gray-400 mb-8">
            {new Date(article.publishedAt).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}

        <div className="prose prose-gray max-w-none">
          {sections.map((sec, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{sec.heading}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{sec.text}</p>
            </div>
          ))}
        </div>

        {sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Источники</h3>
            <ul className="space-y-1">
              {sources.map((src, i) => (
                <li key={i}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: "#7B6B54" }}>
                    {src.text} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/#articles" className="inline-block px-6 py-3 rounded-lg text-white font-medium" style={{ backgroundColor: "#7B6B54" }}>
            ← Все статьи
          </Link>
        </div>
      </article>
    </div>
  );
}
