import type { ComponentProps } from "react";

export function Slider({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={`h-6 w-full cursor-grab touch-manipulation bg-transparent accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      type="range"
    />
  );
}
