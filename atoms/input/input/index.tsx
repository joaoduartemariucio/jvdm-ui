import type { ComponentProps } from "react";

import { CONTROL, CONTROL_SIZES, type ControlSize } from "../control";

export function Input({
  size = "md",
  className = "",
  ...props
}: { size?: ControlSize } & Omit<ComponentProps<"input">, "size">) {
  return <input {...props} className={`${CONTROL} ${CONTROL_SIZES[size]} ${className}`} />;
}
