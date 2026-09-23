import { DatePicker } from "../date-picker";
import { TimePicker } from "../time-picker";
import { locales } from "./locales";

export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  className = "",
}: {
  date?: string;
  time?: string;
  onDateChange?: (value: string) => void;
  onTimeChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`grid gap-3 sm:grid-cols-[1.4fr_1fr] ${className}`}>
      <DatePicker aria-label={locales.date} onValueChange={onDateChange} value={date} />
      <TimePicker aria-label={locales.time} onValueChange={onTimeChange} value={time} />
    </div>
  );
}
