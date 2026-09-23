import type { ReactNode } from "react";

export function Divider({
  children,
  vertical = false,
  className = "",
}: {
  children?: ReactNode;
  vertical?: boolean;
  className?: string;
}) {
  if (vertical) {
    return <div aria-hidden="true" className={`w-px self-stretch bg-line ${className}`} />;
  }

  if (!children) {
    return <hr className={`h-px border-0 bg-line ${className}`} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      <span className="text-2xs font-medium tracking-caps text-ink-dim uppercase">{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}
