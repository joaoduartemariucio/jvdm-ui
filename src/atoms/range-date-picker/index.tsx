import { DatePicker } from "../date-picker";

export function RangeDatePicker({
  start,
  end,
  onStartChange,
  onEndChange,
  className = "",
}: {
  start?: string;
  end?: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <DatePicker aria-label="Start date" onValueChange={onStartChange} value={start} />
      <DatePicker aria-label="End date" onValueChange={onEndChange} value={end} />
    </div>
  );
}
