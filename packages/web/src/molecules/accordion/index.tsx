import type { ReactNode } from "react";

import { ChevronIcon } from "../../atoms";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({
  items,
  exclusive = false,
  name = "accordion",
  className = "",
}: {
  items: readonly AccordionItem[];
  exclusive?: boolean;
  name?: string;
  className?: string;
}) {
  return (
    <div
      className={`divide-y divide-line overflow-hidden rounded-md border border-line ${className}`}
    >
      {items.map((item) => (
        <details
          key={item.id}
          name={exclusive ? name : undefined}
          open={item.defaultOpen}
          className="group bg-surface"
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-ink transition-colors duration-(--duration-fast) ease-out hover:bg-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent">
            {item.title}
            <ChevronIcon
              className="text-ink-muted transition-transform duration-(--duration-fast) ease-out group-open:-rotate-180"
              size="md"
            />
          </summary>
          <div className="px-4 pb-4 text-sm text-ink-soft">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
