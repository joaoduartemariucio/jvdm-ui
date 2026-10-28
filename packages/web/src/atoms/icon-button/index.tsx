import type { ComponentProps } from "react";

import { buttonClass, type ButtonVariant } from "../button";

export type IconButtonSize = "icon" | "icon-sm";

export function IconButton({
  label,
  variant = "ghost",
  size = "icon",
  className,
  ...props
}: {
  label: string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
} & Omit<ComponentProps<"button">, "aria-label" | "size">) {
  return (
    <button
      type="button"
      {...props}
      aria-label={label}
      title={label}
      className={buttonClass({ variant, size, className })}
    />
  );
}
