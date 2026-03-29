"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  value: string; // JSON string of string[]
  onChange: (jsonString: string) => void;
  placeholder?: string;
}

export default function StringListEditor({
  value,
  onChange,
  placeholder = "Добавить пункт",
}: Props) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  });
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    onChangeRef.current(JSON.stringify(items));
  }, [items]);

  function addItem() {
    setItems((prev) => [...prev, ""]);
  }

  function updateItem(i: number, val: string) {
    setItems((prev) => prev.map((it, idx) => (idx === i ? val : it)));
  }

  function removeItem(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="text-sm text-gray-400 py-1">
          Нет пунктов. Нажмите &quot;+&quot; чтобы добавить.
        </p>
      )}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="text-red-500 hover:text-red-700 text-sm px-2"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        + Добавить пункт
      </button>
    </div>
  );
}
