import * as React from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

import { cn } from '../utils';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';
import { Calendar } from '../calendar';
import { Button } from '../button';

/**
 * TRI Date picker. Per the design-system "Date & time → Single date" preview:
 * a bordered trigger field (calendar icon + value + chevron) that opens the
 * month-grid Calendar in a popover, with a Clear / Apply footer.
 */
function formatDate(d?: Date) {
  return d
    ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
}

export interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onValueChange, placeholder = 'Select date', className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [draft, setDraft] = React.useState<Date | undefined>(value);

    React.useEffect(() => {
      if (open) setDraft(value);
    }, [open, value]);

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
              'flex h-9 w-[220px] items-center gap-2 rounded-sm border border-input bg-background px-3 text-left text-sm transition-colors hover:border-[var(--border-hover)] focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:border-foreground',
              className,
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className={cn('flex-1', !value && 'text-muted-foreground')}>
              {value ? formatDate(value) : placeholder}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto p-0"
        >
          <Calendar
            value={draft}
            onChange={setDraft}
            className="border-0 shadow-none"
          />
          <div className="flex justify-between gap-2 border-t border-border px-3 py-2.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDraft(undefined);
                onValueChange?.(undefined);
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
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };
