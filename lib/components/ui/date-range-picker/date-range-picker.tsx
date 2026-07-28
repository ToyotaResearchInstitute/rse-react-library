import * as React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

import { cn } from '../utils';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';
import { Button } from '../button';

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
    <div className="tri-w-[264px] tri-p-3">
      <div className="tri-mb-2.5 tri-flex tri-items-center tri-justify-between">
        <span className="tri-text-sm tri-font-semibold tri-text-foreground">
          {MONTHS[month]} {year}
        </span>
        <div className="tri-flex tri-gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="tri-inline-flex tri-size-6 tri-items-center tri-justify-center tri-rounded-md tri-text-neutral-600 hover:tri-bg-muted"
          >
            <ChevronLeft className="tri-size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="tri-inline-flex tri-size-6 tri-items-center tri-justify-center tri-rounded-md tri-text-neutral-600 hover:tri-bg-muted"
          >
            <ChevronRight className="tri-size-3.5" />
          </button>
        </div>
      </div>
      <div className="tri-mb-1 tri-grid tri-grid-cols-7 tri-gap-0.5">
        {WEEKDAYS.map((d, i) => (
          <div
            key={i}
            className="tri-py-1 tri-text-center tri-font-mono tri-text-[10px] tri-font-semibold tri-uppercase tri-text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="tri-grid tri-grid-cols-7 tri-gap-y-0.5">
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
                'tri-relative tri-flex tri-h-8 tri-items-center tri-justify-center tri-text-[13px] tri-text-foreground tri-transition-colors',
                inRange && 'tri-bg-brand-sky tri-text-[#0F4F87]',
                isFrom && 'tri-rounded-l-md',
                isTo && 'tri-rounded-r-md',
                !endpoint && !inRange && 'tri-rounded-md hover:tri-bg-muted',
                outside && 'tri-text-muted-foreground tri-opacity-60',
                endpoint && 'tri-bg-primary tri-font-semibold tri-text-primary-foreground',
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
              'tri-flex tri-h-9 tri-w-[240px] tri-items-center tri-gap-2 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-3 tri-text-left tri-text-sm tri-transition-colors hover:tri-border-[var(--tri-border-hover)] focus-visible:tri-border-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 data-[state=open]:tri-border-foreground',
              className,
            )}
          >
            <CalendarIcon className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
            <span className={cn('tri-flex-1', !label && 'tri-text-muted-foreground')}>
              {label || placeholder}
            </span>
            <ChevronDown className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="tri-w-auto tri-p-0"
        >
          <div className="tri-flex tri-col-gap-0.5">
            <div className="tri-flex tri-w-36 tri-flex-col tri-gap-0.5 tri-border-r tri-border-border tri-p-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setDraft(p.range);
                    if (p.range.from) setViewDate(startOfDay(p.range.from));
                  }}
                  className={cn(
                    'tri-rounded-sm tri-px-2.5 tri-py-1.5 tri-text-left tri-text-[13px] tri-text-foreground tri-transition-colors hover:tri-bg-muted',
                    isSame(draft.from, p.range.from) &&
                      isSame(draft.to, p.range.to) &&
                      'tri-bg-brand-sky tri-text-info',
                  )}
                >
                  {p.label}
                </button>
              ))}
              <div className="tri-flex tri-justify-center tri-gap-2 tri-border-t tri-border-border tri-px-3 tri-py-2.5 tri-mt-auto">
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
