import { useState, type ComponentProps } from "react";
import { EyeIcon, EyeOffIcon } from "../../icon";
import type { ControlSize } from "../control";
import { Input } from "../input";
import { PASSWORD_INPUT as T } from "../locales";

export function PasswordInput({
  className = "",
  showLabel = T.show,
  hideLabel = T.hide,
  ...props
}: {
  size?: ControlSize;
  showLabel?: string;
  hideLabel?: string;
} & Omit<ComponentProps<"input">, "size" | "type">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex min-w-0">
      <Input {...props} type={visible ? "text" : "password"} className={`pr-11 ${className}`} />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-ink-dim transition-colors hover:text-ink"
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
