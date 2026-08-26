import type { ComponentProps } from "react";

import { CONTROL, CONTROL_SIZES, type ControlSize } from "../control";

export function Select({
  size = "md",
  className = "",
  ...props
}: { size?: ControlSize } & Omit<ComponentProps<"select">, "size">) {
  return <select {...props} className={`${CONTROL} ${CONTROL_SIZES[size]} ${className}`} />;
}
