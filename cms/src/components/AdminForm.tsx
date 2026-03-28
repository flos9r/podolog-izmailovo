"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ArticleSectionsEditor from "@/components/ArticleSectionsEditor";
import ArticleSourcesEditor from "@/components/ArticleSourcesEditor";
import ImagePickerField from "@/components/ImagePickerField";
import StringListEditor from "@/components/StringListEditor";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox" | "image-picker" | "article-sections" | "article-sources" | "string-list";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

interface Props {
  title: string;
  fields: Field[];
  initialData?: Record<string, unknown>;
  apiUrl: string;
  method?: "POST" | "PUT";
  backUrl: string;
  deleteUrl?: string;
}

export default function AdminForm({ title, fields, initialData = {}, apiUrl, method = "POST", backUrl, deleteUrl }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    const init: Record<string, unknown> = {};
    for (const f of fields) {
      init[f.name] = initialData[f.name] ?? (f.type === "checkbox" ? true : f.type === "number" ? 0 : "");
    }
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(name: string, value: unknown) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }
      router.push(backUrl);
      router.refresh();
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteUrl || !confirm("Удалить этот элемент?")) return;
    try {
      const res = await fetch(deleteUrl, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push(backUrl);
      router.refresh();
    } catch {
      setError("Ошибка удаления");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <a href={backUrl} className="text-sm text-gray-500 hover:text-gray-700">← Назад</a>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {fields.map(f => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            {f.type === "article-sections" ? (
              <ArticleSectionsEditor
                value={String(form[f.name] ?? "[]")}
                onChange={v => handleChange(f.name, v)}
              />
            ) : f.type === "article-sources" ? (
              <ArticleSourcesEditor
                value={String(form[f.name] ?? "[]")}
                onChange={v => handleChange(f.name, v)}
              />
            ) : f.type === "image-picker" ? (
              <ImagePickerField
                value={String(form[f.name] ?? "")}
                onChange={v => handleChange(f.name, v)}
              />
            ) : f.type === "string-list" ? (
              <StringListEditor
                value={String(form[f.name] ?? "[]")}
                onChange={v => handleChange(f.name, v)}
              />
            ) : f.type === "textarea" ? (
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={String(form[f.name] ?? "")}
                onChange={e => handleChange(f.name, e.target.value)}
                required={f.required}
                placeholder={f.placeholder}
              />
            ) : f.type === "select" ? (
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={String(form[f.name] ?? "")}
                onChange={e => handleChange(f.name, e.target.value)}
              >
                {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === "checkbox" ? (
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={Boolean(form[f.name])}
                onChange={e => handleChange(f.name, e.target.checked)}
              />
            ) : f.type === "number" ? (
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={Number(form[f.name] ?? 0)}
                onChange={e => handleChange(f.name, parseInt(e.target.value) || 0)}
                placeholder={f.placeholder}
              />
            ) : (
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={String(form[f.name] ?? "")}
                onChange={e => handleChange(f.name, e.target.value)}
                required={f.required}
                placeholder={f.placeholder}
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <a href={backUrl} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Отмена</a>
          {deleteUrl && (
            <button type="button" onClick={handleDelete} className="ml-auto px-4 py-2 text-sm text-red-600 hover:text-red-800">
              Удалить
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
