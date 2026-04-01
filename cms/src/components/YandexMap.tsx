"use client";

interface YandexMapProps {
  query: string;
  address: string;
}

/**
 * Interactive Yandex Maps iframe.
 * - `query` (from SiteSettings.mapQuery) is used for BOTH the iframe search text
 *   and the external "Open in Yandex Maps" link — this ensures the pin location
 *   is identical in both contexts.
 * - `address` is shown as a human-readable label below the map.
 */
export default function YandexMap({ query, address }: YandexMapProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E8E0D4]">
      <iframe
        src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(query)}&z=16&l=map`}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title={`Карта: ${address}`}
      />
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-600">{address}</span>
        <a
          href={`https://yandex.ru/maps/?text=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#7B6B54] font-medium hover:underline flex items-center gap-1"
        >
          Открыть в Яндекс Картах
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
