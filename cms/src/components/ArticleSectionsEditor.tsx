"use client";

import { useState, useEffect, useRef } from "react";

interface Section {
  heading: string;
  text: string;
}

interface Props {
  value: string; // JSON string of Section[]
  onChange: (jsonString: string) => void;
}

export default function ArticleSectionsEditor({ value, onChange }: Props) {
  const [sections, setSections] = useState<Section[]>(() => {
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
    onChangeRef.current(JSON.stringify(sections));
  }, [sections]);

  function addSection() {
    setSections((prev) => [...prev, { heading: "", text: "" }]);
  }

  function removeSection(i: number) {
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateSection(i: number, key: keyof Section, val: string) {
    setSections((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [key]: val } : s))
    );
  }

  function moveUp(i: number) {
    if (i === 0) return;
    setSections((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  }

  function moveDown(i: number) {
    setSections((prev) => {
      if (i >= prev.length - 1) return prev;
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {sections.length === 0 && (
        <p className="text-sm text-gray-400 py-2">
          Нет разделов. Нажмите &quot;+ Добавить раздел&quot; чтобы начать.
        </p>
      )}
      {sections.map((sec, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Раздел {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveUp(i)}
                disabled={i === 0}
                className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
                title="Переместить вверх"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveDown(i)}
                disabled={i === sections.length - 1}
                className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
                title="Переместить вниз"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeSection(i)}
                className="text-xs text-red-500 hover:text-red-700 ml-1"
              >
                Удалить
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Заголовок раздела"
            value={sec.heading}
            onChange={(e) => updateSection(i, "heading", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <textarea
            placeholder="Текст раздела"
            rows={5}
            value={sec.text}
            onChange={(e) => updateSection(i, "text", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-y"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addSection}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        + Добавить раздел
      </button>
    </div>
  );
}
