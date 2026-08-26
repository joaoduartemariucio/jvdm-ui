import type { ComponentProps } from "react";

import { buttonClass, type ButtonOptions } from "../button-style";

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonOptions & ComponentProps<"button">) {
  return <button type="button" {...props} className={buttonClass({ variant, size, className })} />;
}
