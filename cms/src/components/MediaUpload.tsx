"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface MediaItem {
  id: string;
  filename: string;
  path: string;
  alt: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export default function MediaUpload() {
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [alt, setAlt] = useState("");

  useEffect(() => {
    fetch("/api/media").then(r => r.json()).then(setMedia);
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("alt", alt);
    try {
      const res = await fetch("/api/media", { method: "POST", body: fd });
      if (res.ok) {
        const item = await res.json();
        setMedia(prev => [item, ...prev]);
        setAlt("");
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить файл?")) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMedia(prev => prev.filter(m => m.id !== id));
      router.refresh();
    }
  }

  function copyPath(path: string) {
    navigator.clipboard.writeText(path);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Медиа-файлы</h1>

      {/* Upload form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Загрузить изображение</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Alt-текст (описание)"
            value={alt}
            onChange={e => setAlt(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            {uploading ? "Загрузка..." : "📁 Выбрать файл"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
        <p className="text-xs text-gray-400 mt-2">PNG, JPG, SVG, WebP. Путь к файлу можно скопировать и вставить в поле изображения любой сущности.</p>
      </div>

      {/* Media grid */}
      {media.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map(item => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden group">
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.path} alt={item.alt || item.filename} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-gray-700 truncate">{item.filename}</p>
                <p className="text-xs text-gray-400 truncate">{item.path}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => copyPath(item.path)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    📋 Копировать путь
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    🗑 Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-sm text-gray-500">
          Нет загруженных файлов. Загрузите первое изображение.
        </div>
      )}
    </div>
  );
}
