import type { ReactNode } from "react";

export function DropdownMenu({
  trigger,
  children,
  align = "start",
  className = "",
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  return (
    <details className={`group relative ${className}`}>
      <summary className="list-none [&::-webkit-details-marker]:hidden">{trigger}</summary>
      <div
        className={`absolute top-full z-20 mt-2 min-w-48 rounded-md border border-line bg-surface p-1 shadow-popover ${align === "end" ? "right-0" : "left-0"}`}
      >
        {children}
      </div>
    </details>
  );
}
