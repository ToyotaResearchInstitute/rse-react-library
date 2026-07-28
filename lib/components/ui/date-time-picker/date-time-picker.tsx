import * as React from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

import { cn } from '../utils';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';
import { Calendar } from '../calendar';
import { Button } from '../button';

/**
 * TRI Date + time picker. Per the design-system "Date & time → Date + time"
 * preview: the month-grid Calendar beside a time panel (HH / MM inputs + AM/PM
 * toggle + a 2×2 quick-time preset grid), with a Clear / Apply footer.
 */
const TIME_PRESETS = [
  { label: '9:00 AM', hour: 9, minute: 0, meridiem: 'AM' as const },
  { label: '12:00 PM', hour: 12, minute: 0, meridiem: 'PM' as const },
  { label: '3:00 PM', hour: 3, minute: 0, meridiem: 'PM' as const },
  { label: '5:00 PM', hour: 5, minute: 0, meridiem: 'PM' as const },
];

export interface DateTimeValue {
  date?: Date;
  hour: number;
  minute: number;
  meridiem: 'AM' | 'PM';
}

function label(v?: DateTimeValue) {
  if (!v?.date) return '';
  const d = v.date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `${d} · ${v.hour}:${v.minute.toString().padStart(2, '0')} ${v.meridiem}`;
}

export interface DateTimePickerProps {
  value?: DateTimeValue;
  onValueChange?: (value: DateTimeValue) => void;
  placeholder?: string;
  className?: string;
}

const empty: DateTimeValue = { date: undefined, hour: 9, minute: 0, meridiem: 'AM' };

const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  ({ value, onValueChange, placeholder = 'Select date & time', className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [draft, setDraft] = React.useState<DateTimeValue>(value ?? empty);

    React.useEffect(() => {
      if (open) setDraft(value ?? empty);
    }, [open, value]);

    const numberField = (key: 'hour' | 'minute', max: number) => (
      <input
        type="text"
        inputMode="numeric"
        aria-label={key}
        value={key === 'minute' ? draft.minute.toString().padStart(2, '0') : String(draft.hour)}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, '');
          if (raw === '') return;
          const n = Math.min(max, Math.max(key === 'hour' ? 1 : 0, Number(raw)));
          setDraft((d) => ({ ...d, [key]: n }));
        }}
        className="tri-h-9 tri-w-11 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-text-center tri-font-mono tri-text-sm tri-outline-none tri-transition-colors focus:tri-border-foreground focus-visible:tri-ring-2 focus-visible:tri-ring-ring"
      />
    );

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
              'tri-flex tri-h-9 tri-w-[280px] tri-items-center tri-gap-2 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-3 tri-text-left tri-text-sm tri-transition-colors hover:tri-border-[var(--tri-border-hover)] focus-visible:tri-border-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 data-[state=open]:tri-border-foreground',
              className,
            )}
          >
            <CalendarIcon className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
            <span className={cn('tri-flex-1 tri-truncate', !value?.date && 'tri-text-muted-foreground')}>
              {value?.date ? label(value) : placeholder}
            </span>
            <ChevronDown className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="tri-w-auto tri-p-0"
        >
          <div className="tri-flex">
            <Calendar
              value={draft.date}
              onChange={(date) => setDraft((d) => ({ ...d, date }))}
              className="tri-border-0 tri-shadow-none"
            />
            <div className="tri-flex tri-w-48 tri-flex-col tri-gap-3 tri-border-l tri-border-border tri-p-3.5">
              <div className="tri-flex tri-flex-wrap tri-items-center tri-gap-2">
                <div className="tri-flex tri-items-center tri-gap-1.5">
                  {numberField('hour', 12)}
                  <span className="tri-font-mono tri-text-sm tri-text-muted-foreground">:</span>
                  {numberField('minute', 59)}
                </div>
                <div className="tri-inline-flex tri-overflow-hidden tri-rounded-sm tri-border tri-border-input">
                  {(['AM', 'PM'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, meridiem: m }))}
                      className={cn(
                        'tri-px-2.5 tri-py-1.5 tri-font-mono tri-text-xs tri-transition-colors focus:tri-outline-none focus-visible:tri-relative focus-visible:tri-z-10 focus-visible:tri-ring-2 focus-visible:tri-ring-inset focus-visible:tri-ring-ring',
                        draft.meridiem === m
                          ? 'tri-bg-primary tri-text-primary-foreground'
                          : 'tri-bg-background tri-text-foreground hover:tri-bg-muted',
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="tri-grid tri-grid-cols-2 tri-gap-1.5">
                {TIME_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        hour: p.hour,
                        minute: p.minute,
                        meridiem: p.meridiem,
                      }))
                    }
                    className="tri-rounded-sm tri-border tri-border-border tri-px-2 tri-py-1.5 tri-text-xs tri-text-foreground tri-transition-colors hover:tri-bg-muted"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="tri-mt-auto tri-flex tri-justify-end tri-gap-2 tri-px-3 tri-py-2.5 ">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDraft(empty);
                    onValueChange?.(empty);
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
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
DateTimePicker.displayName = 'DateTimePicker';

export { DateTimePicker };
