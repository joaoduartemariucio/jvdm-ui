import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  error,
  action,
  className = "",
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-xs font-medium text-ink-soft">
          {label}
        </label>
        {action}
      </div>
      {children}
      {error ? <span className="text-2xs text-danger">{error}</span> : null}
    </div>
  );
}
