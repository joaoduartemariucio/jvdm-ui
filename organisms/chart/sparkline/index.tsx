import type { Bar } from "../bar";

export function Sparkline({ data, describe }: { data: Bar[]; describe: (bar: Bar) => string }) {
  const max = Math.max(...data.map((b) => b.value), 1);

  return (
    <div className="flex h-[72px] items-end gap-2">
      {data.map((bar) => (
        <div
          key={bar.key}
          className="flex-1 rounded-xs bg-accent/70"
          style={{ height: `${(bar.value / max) * 100}%` }}
          title={describe(bar)}
        />
      ))}
    </div>
  );
}
