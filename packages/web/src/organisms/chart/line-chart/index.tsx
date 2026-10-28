import type { ReactNode } from "react";

import type { Bar } from "../bar";

export function LineChart({
  data,
  top,
  ticks,
  describe,
  tooltip,
  area = true,
}: {
  data: Bar[];
  top: number;
  ticks: number[];
  describe: (point: Bar) => string;
  tooltip: (point: Bar) => ReactNode;
  area?: boolean;
}) {
  const span = Math.max(data.length - 1, 1);
  const at = (point: Bar, index: number) => ({
    x: (index / span) * 100,
    y: 100 - (Math.min(point.value, top) / top) * 100,
  });

  const points = data.map((point, index) => at(point, index));
  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const shape = `0,100 ${line} 100,100`;

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

        <div className="relative h-full">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {area ? <polygon points={shape} className="fill-accent/12" /> : null}
            <polyline
              points={line}
              className="stroke-accent"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {data.map((point, index) => {
            const p = points[index];

            return (
              <div
                key={point.key}
                tabIndex={0}
                aria-label={describe(point)}
                className="group absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="absolute inset-0 m-auto size-2 rounded-full bg-app ring-2 ring-accent transition-transform duration-(--duration-fast) ease-out group-hover:scale-150 group-focus-visible:scale-150" />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 rounded-sm border border-line-strong bg-raised px-2 py-1 text-2xs whitespace-nowrap text-ink-soft opacity-0 shadow-popover transition-opacity duration-(--duration-fast) ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                  {tooltip(point)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 pl-8">
        {data.map((point, i) => (
          <span key={point.key} className="flex-1 text-center text-2xs text-ink-dim">
            {i % 2 === 0 ? point.label : ""}
          </span>
        ))}
      </div>
    </>
  );
}
