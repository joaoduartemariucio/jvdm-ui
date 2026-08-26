import type { ReactNode } from "react";

import type { Bar } from "../bar";
export function BarChart({
  data,
  top,
  ticks,
  describe,
  tooltip,
  peakKey,
  zeroStub = false,
}: {
  data: Bar[];
  top: number;
  ticks: number[];
  describe: (bar: Bar) => string;
  tooltip: (bar: Bar) => ReactNode;
  peakKey?: string;
  zeroStub?: boolean;
}) {
  return (
    <>
      <div className="relative h-32 pl-8">
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute right-0 left-8 flex items-center"
            style={{ bottom: `${(t / top) * 100}%` }}
          >
            <span className="absolute right-full mr-2 text-2xs text-ink-dim tabular-nums">{t}</span>
            <div className="h-px w-full bg-line" />
          </div>
        ))}

        <div className="relative flex h-full items-end gap-2">
          {data.map((bar) => {
            const isPeak = bar.key === peakKey;
            const empty = bar.value <= 0;

            return (
              <div
                key={bar.key}
                tabIndex={0}
                aria-label={describe(bar)}
                className="group relative flex h-full flex-1 items-end rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div
                  className={`mx-auto w-full max-w-6 rounded-t-xs transition-colors ${
                    empty
                      ? zeroStub
                        ? "bg-line-strong"
                        : ""
                      : `min-h-1 ${isPeak ? "bg-accent" : "bg-accent/60 group-hover:bg-accent"}`
                  }`}
                  style={{
                    height: empty ? (zeroStub ? "4px" : 0) : `${(bar.value / top) * 100}%`,
                  }}
                />

                {}
                {isPeak ? (
                  <span className="pointer-events-none absolute inset-x-0 bottom-full mb-1 text-center text-2xs font-medium tabular-nums group-hover:opacity-0">
                    {bar.value}
                  </span>
                ) : null}

                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 rounded-md border border-line-strong bg-raised px-2 py-1 text-2xs whitespace-nowrap text-ink-soft opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {tooltip(bar)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 pl-8">
        {data.map((bar, i) => (
          <span key={bar.key} className="flex-1 text-center text-2xs text-ink-dim">
            {i % 2 === 0 ? bar.label : ""}
          </span>
        ))}
      </div>
    </>
  );
}
