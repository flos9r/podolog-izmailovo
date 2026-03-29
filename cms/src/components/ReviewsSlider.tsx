"use client";

import { useState, useCallback } from "react";

interface ReviewData {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  service: string;
  source: string;
}

interface ReviewsSliderProps {
  reviews: ReviewData[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка: ${rating} из 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-amber-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSlider({ reviews }: ReviewsSliderProps) {
  const [current, setCurrent] = useState(0);

  const pageSize = 1;
  const total = reviews.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  if (total === 0) return null;

  const review = reviews[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{review.author}</h3>
            {review.service && (
              <p className="text-sm text-[#7b6e8a] mt-0.5">{review.service}</p>
            )}
          </div>
          <StarRating rating={review.rating} />
        </div>
        <blockquote className="text-gray-600 leading-relaxed text-base md:text-lg italic">
          &ldquo;{review.text}&rdquo;
        </blockquote>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-400">{review.date}</span>
          <span className="text-sm text-gray-400 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {review.source}
          </span>
        </div>
      </div>

      {/* Navigation */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#6b5b7b] hover:shadow-lg transition-all"
            aria-label="Предыдущий отзыв"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === current
                    ? "bg-[#6b5b7b] w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Отзыв ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#6b5b7b] hover:shadow-lg transition-all"
            aria-label="Следующий отзыв"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
