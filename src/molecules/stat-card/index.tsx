import type { ReactNode } from "react";

import { Card, Label } from "../../atoms";

export function StatCard({
  label,
  value,
  hint,
  color = "",
  attention = false,
  className = "",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  color?: string;
  attention?: boolean;
  className?: string;
}) {
  const length = String(value).length;
  const size = length <= 7 ? "text-2xl" : length <= 12 ? "text-lg" : "text-sm";

  return (
    <Card
      padding="sm"
      className={`flex flex-col gap-1 ${attention ? "attention" : ""} ${className}`}
    >
      <Label>{label}</Label>
      <span className={`truncate ${size} leading-tight font-bold ${color}`}>{value}</span>
      {hint ? <span className="truncate text-xs text-ink-muted">{hint}</span> : null}
    </Card>
  );
}
