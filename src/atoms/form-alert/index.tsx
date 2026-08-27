import type { ReactNode } from "react";

export function FormAlert({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      role="alert"
      className={`rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger ${className}`}
    >
      {children}
    </p>
  );
}
