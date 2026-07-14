import * as React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

import { cn } from './utils';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Button } from './button';

/**
 * TRI Date-range picker. Per the design-system "Date & time → Date range"
 * preview: a trigger field opening a popover with a quick-presets sidebar
 * (Today / Yesterday / Last N days / This month) beside a month grid that
 * highlights the selected range (ink endpoints, sky in-range), with a
 * Clear / Apply footer.
 */
export interface DateRange {
  from?: Date;
  to?: Date;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const isSame = (a?: Date, b?: Date) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const addDays = (d: Date, n: number) => {
  const x = startOfDay(d);
  x.setDate(x.getDate() + n);
  return x;
};

const RangeMonthGrid = ({
  range,
  onSelect,
  viewDate,
  setViewDate,
}: {
  range: DateRange;
  onSelect: (r: DateRange) => void;
  viewDate: Date;
  setViewDate: (d: Date) => void;
}) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const gridStart = new Date(year, month, 1 - new Date(year, month, 1).getDay());
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));

  const handleClick = (date: Date) => {
    const d = startOfDay(date);
    if (!range.from || (range.from && range.to)) {
      onSelect({ from: d, to: undefined });
    } else if (d < range.from) {
      onSelect({ from: d, to: range.from });
    } else {
      onSelect({ from: range.from, to: d });
    }
  };

  return (
    <div className="w-[264px] p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {MONTHS[month]} {year}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="inline-flex size-6 items-center justify-center rounded-md text-neutral-600 hover:bg-muted"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="inline-flex size-6 items-center justify-center rounded-md text-neutral-600 hover:bg-muted"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((d, i) => (
          <div
            key={i}
            className="py-1 text-center font-mono text-[10px] font-semibold uppercase text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((date) => {
          const outside = date.getMonth() !== month;
          const isFrom = isSame(date, range.from);
          const isTo = isSame(date, range.to);
          const inRange = !!range.from && !!range.to && date > range.from && date < range.to;
          const endpoint = isFrom || isTo;
          return (
            <button
              key={date.getTime()}
              type="button"
              onClick={() => handleClick(date)}
              className={cn(
                'relative flex h-8 items-center justify-center text-[13px] text-foreground transition-colors',
                inRange && 'bg-brand-sky text-[#0F4F87]',
                isFrom && 'rounded-l-md',
                isTo && 'rounded-r-md',
                !endpoint && !inRange && 'rounded-md hover:bg-muted',
                outside && 'text-muted-foreground opacity-60',
                endpoint && 'bg-primary font-semibold text-primary-foreground',
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const buildPresets = (): { label: string; range: DateRange }[] => {
  const today = startOfDay(new Date());
  return [
    { label: 'Today', range: { from: today, to: today } },
    { label: 'Yesterday', range: { from: addDays(today, -1), to: addDays(today, -1) } },
    { label: 'Last 7 days', range: { from: addDays(today, -6), to: today } },
    { label: 'Last 14 days', range: { from: addDays(today, -13), to: today } },
    { label: 'Last 30 days', range: { from: addDays(today, -29), to: today } },
    {
      label: 'This month',
      range: {
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        // full calendar month → last day of the month
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      },
    },
  ];
};

const fmt = (d?: Date) =>
  d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';

export interface DateRangePickerProps {
  value?: DateRange;
  onValueChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ value, onValueChange, placeholder = 'Select range', className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [draft, setDraft] = React.useState<DateRange>(value ?? {});
    const [viewDate, setViewDate] = React.useState(() => startOfDay(value?.from ?? new Date()));
    const presets = React.useMemo(buildPresets, []);

    React.useEffect(() => {
      if (open) setDraft(value ?? {});
    }, [open, value]);

    const label =
      value?.from && value?.to
        ? `${fmt(value.from)} – ${fmt(value.to)}`
        : value?.from
          ? fmt(value.from)
          : '';

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            className={cn(
              'flex h-9 w-[240px] items-center gap-2 rounded-sm border border-input bg-background px-3 text-left text-sm transition-colors hover:border-[var(--border-hover)] focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:border-foreground',
              className,
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className={cn('flex-1', !label && 'text-muted-foreground')}>
              {label || placeholder}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto p-0"
        >
          <div className="flex col-gap-0.5">
            <div className="flex w-36 flex-col gap-0.5 border-r border-border p-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setDraft(p.range);
                    if (p.range.from) setViewDate(startOfDay(p.range.from));
                  }}
                  className={cn(
                    'rounded-sm px-2.5 py-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-muted',
                    isSame(draft.from, p.range.from) &&
                      isSame(draft.to, p.range.to) &&
                      'bg-brand-sky text-info',
                  )}
                >
                  {p.label}
                </button>
              ))}
              <div className="flex justify-center gap-2 border-t border-border px-3 py-2.5 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDraft({});
                    onValueChange?.({});
                    setOpen(false);
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="ink"
                  size="sm"
                  onClick={() => {
                    onValueChange?.(draft);
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
            <RangeMonthGrid
              range={draft}
              onSelect={setDraft}
              viewDate={viewDate}
              setViewDate={setViewDate}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
DateRangePicker.displayName = 'DateRangePicker';

export { DateRangePicker };
