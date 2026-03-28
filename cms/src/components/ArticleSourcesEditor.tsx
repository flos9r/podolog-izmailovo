"use client";

import { useState, useEffect, useRef } from "react";

interface Source {
  text: string;
  url: string;
}

interface Props {
  value: string; // JSON string of Source[]
  onChange: (jsonString: string) => void;
}

export default function ArticleSourcesEditor({ value, onChange }: Props) {
  const [sources, setSources] = useState<Source[]>(() => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    onChangeRef.current(JSON.stringify(sources));
  }, [sources]);

  function addSource() {
    setSources((prev) => [...prev, { text: "", url: "" }]);
  }

  function removeSource(i: number) {
    setSources((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateSource(i: number, key: keyof Source, val: string) {
    setSources((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [key]: val } : s))
    );
  }

  return (
    <div className="space-y-2">
      {sources.length === 0 && (
        <p className="text-sm text-gray-400 py-1">
          Нет источников. Необязательное поле.
        </p>
      )}
      {sources.map((src, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1">
            <input
              type="text"
              placeholder="Название источника"
              value={src.text}
              onChange={(e) => updateSource(i, "text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="https://example.com"
              value={src.url}
              onChange={(e) => updateSource(i, "url", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={() => removeSource(i)}
            className="mt-2 text-sm text-red-500 hover:text-red-700 shrink-0 px-2 py-1"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSource}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        + Добавить источник
      </button>
    </div>
  );
}
