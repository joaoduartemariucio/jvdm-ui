import type { ComponentProps } from "react";

import { CONTROL, CONTROL_SIZES, type ControlSize } from "../control";

export function Textarea({
  size = "md",
  rows = 4,
  className = "",
  ...props
}: { size?: ControlSize } & Omit<ComponentProps<"textarea">, "size">) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={`${CONTROL} ${CONTROL_SIZES[size]} resize-y ${className}`}
    />
  );
}
