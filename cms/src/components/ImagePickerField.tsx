"use client";

import { useState, useRef } from "react";

interface MediaItem {
  id: string;
  filename: string;
  path: string;
  alt: string;
  mimeType: string;
}

interface Props {
  value: string;
  onChange: (path: string) => void;
}

export default function ImagePickerField({ value, onChange }: Props) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function loadMedia() {
    if (loaded) return;
    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => {
        setMedia(Array.isArray(data) ? data : []);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load media library:", err);
        setLoaded(true);
      });
  }

  function openPicker() {
    loadMedia();
    setShowPicker(true);
  }

  function closePicker() {
    setShowPicker(false);
    setUploadError("");
  }

  function selectImage(path: string) {
    onChange(path);
    setShowPicker(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/media", { method: "POST", body: fd });
      if (res.ok) {
        const item: MediaItem = await res.json();
        setMedia((prev) => [item, ...prev]);
        onChange(item.path);
        setShowPicker(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setUploadError(data.error || `Ошибка загрузки (${res.status})`);
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex gap-2 items-stretch">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/image.jpg"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={openPicker}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm whitespace-nowrap transition-colors"
        >
          📁 Медиатека
        </button>
      </div>

      {value && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-gray-500">Предпросмотр (пропорции как на сайте, ~3:4 портрет):</p>
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="rounded-xl border border-gray-200 shadow-sm bg-gray-100"
              style={{ width: 160, height: 213, objectFit: "cover", objectPosition: "center top" }}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                el.parentElement?.querySelector(".img-error")?.classList.remove("hidden");
              }}
            />
            <div className="img-error hidden text-xs text-red-500 mt-1">Изображение не загружается. Проверьте путь.</div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Media picker modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                Выбрать изображение
              </h3>
              <button
                type="button"
                onClick={closePicker}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Upload area */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                  {uploading ? "Загрузка..." : "📤 Загрузить новое"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
              <span className="text-xs text-gray-500">
                или выберите из загруженных ниже
              </span>
              </div>
              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}
            </div>

            {/* Media grid */}
            <div className="overflow-y-auto flex-1 p-4">
              {!loaded ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  Загрузка...
                </p>
              ) : media.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Нет загруженных файлов. Загрузите первое изображение выше.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {media.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectImage(item.path)}
                      className={`rounded-lg overflow-hidden border-2 transition-all text-left ${
                        value === item.path
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.path}
                          alt={item.alt || item.filename}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-600 px-2 py-1 truncate">
                        {item.filename}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
