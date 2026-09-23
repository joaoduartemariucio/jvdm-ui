import { DatePicker } from "../date-picker";
import { TimePicker } from "../time-picker";

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
      <DatePicker aria-label="Date" onValueChange={onDateChange} value={date} />
      <TimePicker aria-label="Time" onValueChange={onTimeChange} value={time} />
    </div>
  );
}
