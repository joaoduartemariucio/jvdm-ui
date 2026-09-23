import { type CSSProperties, type ReactNode } from "react";

import { Input, Label } from "../../atoms";
import { locales } from "./locales";

export type Column<T = unknown> = {
  key: string;
  label: string;
  width: string;
  align?: "left" | "right";
  render: (item: T) => ReactNode;
  sortable?: boolean;
  sortValue?: (item: T) => string | number;
};

export const GRID_ROW = "grid grid-cols-[var(--cols)] items-center";

const HEADER = `${GRID_ROW} h-[34px]`;

export function DataTable<T>({
  columns,
  items,
  rowKey,
  headerClassName = "px-4 border-b border-line",
  bodyClassName = "",
  loading,
  empty,
  className = "",
  filter = "",
  onFilterChange,
  sort,
  onSortChange,
}: {
  columns: Column<T>[];
  items?: T[];
  rowKey: (item: T) => string;
  headerClassName?: string;
  bodyClassName?: string;
  loading?: ReactNode;
  empty?: ReactNode;
  className?: string;
  filter?: string;
  onFilterChange?: (value: string) => void;
  sort?: { key: string; direction: "asc" | "desc" };
  onSortChange?: (key: string) => void;
}) {
  const style = { "--cols": columns.map((c) => c.width).join(" ") } as CSSProperties;
  const visibleItems = items?.filter(
    (item) =>
      !filter ||
      columns.some((column) =>
        String(column.render(item)).toLowerCase().includes(filter.toLowerCase()),
      ),
  );
  const sortedItems = sort
    ? [...(visibleItems ?? [])].sort((a, b) => {
        const column = columns.find((item) => item.key === sort.key);
        if (!column?.sortValue) return 0;
        const left = column.sortValue(a);
        const right = column.sortValue(b);
        return (left < right ? -1 : left > right ? 1 : 0) * (sort.direction === "asc" ? 1 : -1);
      })
    : visibleItems;

  return (
    <div className="min-w-0 overflow-x-auto overscroll-contain">
      <div
        aria-rowcount={items?.length}
        className={`flex min-h-0 min-w-[32rem] flex-col ${className}`}
        role="table"
        style={style}
      >
        {onFilterChange ? (
          <div className="border-b border-line px-4 py-3">
            <Input
              aria-label={locales.filterLabel}
              onChange={(event) => onFilterChange(event.target.value)}
              placeholder={locales.filterPlaceholder}
              value={filter}
            />
          </div>
        ) : null}
        <div className={`${HEADER} ${headerClassName}`} role="row">
          {columns.map((c) => (
            <div
              key={c.key}
              className={c.align === "right" ? "text-right" : ""}
              role="columnheader"
            >
              {c.sortable && onSortChange ? (
                <button className="text-left" onClick={() => onSortChange(c.key)} type="button">
                  <Label tone="dim">{c.label}</Label>
                  {sort?.key === c.key ? (
                    <span className="ml-2 text-2xs text-accent-ink">
                      {sort.direction === "asc" ? "↑" : "↓"}
                    </span>
                  ) : null}
                </button>
              ) : (
                <Label tone="dim">{c.label}</Label>
              )}
            </div>
          ))}
        </div>

        <div className={bodyClassName}>
          {loading ?? null}
          {!loading && sortedItems?.length === 0 ? empty : null}
          {!loading
            ? sortedItems?.map((item) => (
                <div key={rowKey(item)} className={`${GRID_ROW} h-12 px-4 text-sm`} role="row">
                  {columns.map((column) => (
                    <span
                      key={column.key}
                      className={column.align === "right" ? "text-right" : ""}
                      role="cell"
                    >
                      {column.render(item)}
                    </span>
                  ))}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
