import type { ReactNode } from "react";

import { ChevronIcon } from "../../atoms";
import { locales } from "./locales";

export type Crumb = { id: string; label: ReactNode; href?: string };

export function Breadcrumb({
  items,
  label = locales.label,
  className = "",
}: {
  items: readonly Crumb[];
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs">
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <li key={item.id} className="flex items-center gap-1">
              {index > 0 ? <ChevronIcon className="-rotate-90 text-ink-dim" size="sm" /> : null}
              {last || !item.href ? (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "font-medium text-ink" : "text-ink-muted"}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="rounded-xs px-1 py-0.5 text-ink-muted transition-colors duration-(--duration-fast) ease-out hover:bg-raised hover:text-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
