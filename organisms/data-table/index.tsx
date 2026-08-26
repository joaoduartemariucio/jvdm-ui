import { Fragment, type CSSProperties, type ReactNode } from "react";

import { Label } from "../../atoms";

export type Column = {
  key: string;
  label: string;
  width: string;
  align?: "left" | "right";
};

export const GRID_ROW = "grid grid-cols-[var(--cols)] items-center";

const HEADER = `${GRID_ROW} h-[34px]`;

export function DataTable<T>({
  columns,
  items,
  rowKey,
  renderRow,
  headerClassName = "px-4 border-b border-line",
  bodyClassName = "",
  loading,
  empty,
  className = "",
}: {
  columns: Column[];
  items?: T[];
  rowKey: (item: T) => string;
  renderRow: (item: T, gridClass: string) => ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  loading?: ReactNode;
  empty?: ReactNode;
  className?: string;
}) {
  const style = { "--cols": columns.map((c) => c.width).join(" ") } as CSSProperties;

  return (
    <div className={`flex min-h-0 flex-col ${className}`} style={style}>
      <div className={`${HEADER} ${headerClassName}`}>
        {columns.map((c) => (
          <Label key={c.key} tone="dim" className={c.align === "right" ? "text-right" : ""}>
            {c.label}
          </Label>
        ))}
      </div>

      <div className={bodyClassName}>
        {loading ?? null}
        {!loading && items?.length === 0 ? empty : null}
        {!loading
          ? items?.map((item) => (
              <Fragment key={rowKey(item)}>{renderRow(item, GRID_ROW)}</Fragment>
            ))
          : null}
      </div>
    </div>
  );
}
