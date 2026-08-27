import type { ReactNode } from "react";

export function Thumb({
  src,
  alt,
  fallback,
  className = "",
}: {
  src?: string | null;
  alt: string;
  fallback?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-raised text-ink-dim ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        fallback
      )}
    </div>
  );
}
