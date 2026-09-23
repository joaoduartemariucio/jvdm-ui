import { type CSSProperties, type ReactNode } from "react";

import { Label } from "../../atoms";

export type Column<T = unknown> = {
  key: string;
  label: string;
  width: string;
  align?: "left" | "right";
  render: (item: T) => ReactNode;
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
}: {
  columns: Column<T>[];
  items?: T[];
  rowKey: (item: T) => string;
  headerClassName?: string;
  bodyClassName?: string;
  loading?: ReactNode;
  empty?: ReactNode;
  className?: string;
}) {
  const style = { "--cols": columns.map((c) => c.width).join(" ") } as CSSProperties;

  return (
    <div className="min-w-0 overflow-x-auto overscroll-contain">
      <div
        aria-rowcount={items?.length}
        className={`flex min-h-0 min-w-[32rem] flex-col ${className}`}
        role="table"
        style={style}
      >
        <div className={`${HEADER} ${headerClassName}`} role="row">
          {columns.map((c) => (
            <div
              key={c.key}
              className={c.align === "right" ? "text-right" : ""}
              role="columnheader"
            >
              <Label tone="dim">{c.label}</Label>
            </div>
          ))}
        </div>

        <div className={bodyClassName}>
          {loading ?? null}
          {!loading && items?.length === 0 ? empty : null}
          {!loading
            ? items?.map((item) => (
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
