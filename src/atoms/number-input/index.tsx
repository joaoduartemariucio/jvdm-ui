import { useRef, type ComponentProps } from "react";

export function NumberInput({ className = "", ...props }: ComponentProps<"input">) {
  const ref = useRef<HTMLInputElement>(null);
  const change = (direction: "up" | "down") => {
    const input = ref.current;
    if (!input) return;
    direction === "up" ? input.stepUp() : input.stepDown();
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return (
    <div className="relative flex w-full">
      <input
        {...props}
        ref={ref}
        className={`w-full min-w-0 rounded-md border border-line-strong bg-field px-4 py-3 pr-12 text-base text-ink outline-none transition-[background-color,border-color,box-shadow] duration-(--duration-fast) ease-out focus:border-accent focus:ring-2 focus:ring-accent/30 sm:text-sm ${className}`}
        type="number"
      />
      <div className="absolute top-1/2 right-1 flex -translate-y-1/2 flex-col">
        <button aria-label="Increase value" className="flex h-4 w-8 items-center justify-center rounded-xs text-2xs text-ink-muted hover:bg-raised hover:text-ink" onClick={() => change("up")} type="button">+</button>
        <button aria-label="Decrease value" className="flex h-4 w-8 items-center justify-center rounded-xs text-2xs text-ink-muted hover:bg-raised hover:text-ink" onClick={() => change("down")} type="button">−</button>
      </div>
    </div>
  );
}
