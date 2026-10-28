import type { ReactNode } from "react";

export type KanbanCard = { id: string; title: string; description?: ReactNode; meta?: ReactNode };
export type KanbanColumn = { id: string; title: string; cards: readonly KanbanCard[] };

export function KanbanBoard({
  columns,
  className = "",
}: {
  columns: readonly KanbanColumn[];
  className?: string;
}) {
  return (
    <div
      className={`grid min-w-[48rem] grid-cols-${columns.length} gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(15rem, 1fr))` }}
    >
      {columns.map((column) => (
        <section className="flex flex-col gap-3 rounded-md bg-panel p-3" key={column.id}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-ink">{column.title}</h3>
            <span className="font-mono text-2xs text-ink-dim">{column.cards.length}</span>
          </div>
          {column.cards.map((card) => (
            <article
              className="rounded-sm border border-line bg-surface p-4 transition-transform duration-(--duration-fast) ease-out hover:-translate-y-0.5"
              key={card.id}
            >
              <h4 className="text-sm font-medium text-ink">{card.title}</h4>
              {card.description ? (
                <div className="mt-2 text-xs text-ink-muted">{card.description}</div>
              ) : null}
              {card.meta ? <div className="mt-4 text-2xs text-ink-dim">{card.meta}</div> : null}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
