import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";

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
  const errorId = useId();
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-describedby": error
          ? [children.props["aria-describedby"], errorId].filter(Boolean).join(" ")
          : children.props["aria-describedby"],
        "aria-invalid": error ? true : children.props["aria-invalid"],
      })
    : children;

  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-xs font-medium text-ink-soft">
          {label}
        </label>
        {action}
      </div>
      {control}
      {error ? (
        <span className="text-2xs text-danger" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
