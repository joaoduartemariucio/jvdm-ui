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
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-xl font-bold">{title}</h1>
        {subtitle ? <p className="text-sm text-ink-muted">{subtitle}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 gap-3">{children}</div> : null}
    </div>
  );
}
