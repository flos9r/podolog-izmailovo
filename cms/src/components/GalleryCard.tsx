"use client";

import { useState } from "react";

interface GalleryCardProps {
  title: string;
  category: string;
  beforeImage: string | null;
  afterImage: string | null;
  beforeAlt: string;
  afterAlt: string;
}

export default function GalleryCard({
  title,
  category,
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: GalleryCardProps) {
  const [showAfter, setShowAfter] = useState(false);

  const currentImage = showAfter && afterImage ? afterImage : beforeImage;
  const currentAlt = showAfter ? afterAlt : beforeAlt;
  const label = showAfter ? "После" : "До";

  const placeholderSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#e5e7eb"/>
      <text x="200" y="150" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="16" fill="#9ca3af">${showAfter ? "После" : "До"}</text>
    </svg>`
  )}`;

  const imgSrc = currentImage || placeholderSvg;

  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
      onClick={() => setShowAfter((prev) => !prev)}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={currentAlt || title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              showAfter
                ? "bg-green-500 text-white"
                : "bg-[#6b5b7b] text-white"
            }`}
          >
            {label}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white/80 text-xs font-medium uppercase tracking-wide">
            {category}
          </span>
          <h3 className="text-white font-semibold mt-0.5">{title}</h3>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          {showAfter ? "← До" : "После →"}
        </span>
      </div>
    </div>
  );
}
