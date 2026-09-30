"use client";

import { useEffect, useRef, useState } from "react";

import { Button, type ButtonSize, type ButtonVariant } from "../button";
import { CheckIcon, CopyIcon } from "../icon";
import { COPY_BUTTON } from "./locales";

export function CopyButton({
  value,
  label = COPY_BUTTON.copy,
  copiedLabel = COPY_BUTTON.copied,
  variant = "ghost",
  size = "sm",
  resetAfter = 1400,
  onCopy,
  disabled = false,
  className = "",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  variant?: ButtonVariant;
  size?: Extract<ButtonSize, "sm" | "md">;
  resetAfter?: number;
  onCopy?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    onCopy?.(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), resetAfter);
  }

  return (
    <Button onClick={copy} disabled={disabled} variant={variant} size={size} className={className}>
      {copied ? <CheckIcon className="text-ok" /> : <CopyIcon />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}
