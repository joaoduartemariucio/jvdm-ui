import type { ComponentProps } from "react";

import { ChevronIcon } from "../../icon";
import { CONTROL, CONTROL_SIZES, type ControlSize } from "../control";

export function Select({
  size = "md",
  className = "",
  ...props
}: { size?: ControlSize } & Omit<ComponentProps<"select">, "size">) {
  return (
    <span className="relative block">
      <select
        {...props}
        className={`${CONTROL} ${CONTROL_SIZES[size]} appearance-none pr-10 ${className}`}
      />
      <ChevronIcon
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted"
        size="md"
      />
    </span>
  );
}
