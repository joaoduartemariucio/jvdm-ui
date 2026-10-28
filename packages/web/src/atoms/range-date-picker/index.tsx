import { DatePicker } from "../date-picker";
import { locales } from "./locales";

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
      <DatePicker aria-label={locales.start} onValueChange={onStartChange} value={start} />
      <DatePicker aria-label={locales.end} onValueChange={onEndChange} value={end} />
    </div>
  );
}
