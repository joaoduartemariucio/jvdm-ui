import { useState, type ReactNode } from "react";

import { BackIcon, Thumb } from "../../atoms";
import { GALLERY as T } from "./locales";

export function Gallery({
  photos,
  alt,
  fallback,
  photoLabel = T.photoLabel,
  previousLabel = T.previous,
  nextLabel = T.next,
  className = "",
}: {
  photos: string[];
  alt: string;
  fallback?: ReactNode;
  photoLabel?: (index: number, total: number) => string;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const total = photos.length;
  const current = Math.min(index, Math.max(0, total - 1));
  const step = (delta: number) => setIndex((current + delta + total) % total);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="relative">
        <Thumb src={photos[current] ?? null} alt={alt} fallback={fallback} />

        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label={previousLabel}
              onClick={() => step(-1)}
              className="absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-app/80 text-ink backdrop-blur transition-colors hover:bg-app"
            >
              <BackIcon size="sm" />
            </button>

            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => step(1)}
              className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-app/80 text-ink backdrop-blur transition-colors hover:bg-app"
            >
              <BackIcon size="sm" className="rotate-180" />
            </button>

            <span className="absolute right-2 bottom-2 rounded-sm bg-app/80 px-2 py-1 text-2xs text-ink-soft backdrop-blur">
              {photoLabel(current + 1, total)}
            </span>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              aria-label={photoLabel(i + 1, total)}
              aria-current={i === current}
              onClick={() => setIndex(i)}
              className={`w-20 shrink-0 overflow-hidden rounded-sm transition-opacity ${
                i === current ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Thumb src={photo} alt={alt} fallback={fallback} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
