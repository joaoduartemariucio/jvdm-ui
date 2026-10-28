import type { ReactNode } from "react";

export function ImagePreview({
  src,
  alt,
  fallback,
  className = "",
}: {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  className?: string;
}) {
  return (
    <details className={`group ${className}`}>
      <summary className="cursor-zoom-in list-none overflow-hidden rounded-md bg-raised [&::-webkit-details-marker]:hidden">
        {src ? (
          <img
            alt={alt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-(--duration-base) ease-out group-hover:scale-[1.02]"
            src={src}
          />
        ) : (
          fallback
        )}
      </summary>
      {src ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-app/85 p-6 backdrop-blur-sm">
          <img
            alt={alt}
            className="max-h-[90dvh] max-w-full rounded-md object-contain shadow-modal"
            src={src}
          />
        </div>
      ) : null}
    </details>
  );
}
