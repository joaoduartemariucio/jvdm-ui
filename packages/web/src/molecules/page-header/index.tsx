import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4 ${className}`}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-xl font-bold">{title}</h1>
        {subtitle ? <p className="text-sm text-ink-muted">{subtitle}</p> : null}
      </div>
      {children ? <div className="flex w-full flex-wrap gap-3 sm:w-auto">{children}</div> : null}
    </div>
  );
}
