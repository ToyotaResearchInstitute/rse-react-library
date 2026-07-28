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
              'tri-flex tri-h-9 tri-w-[220px] tri-items-center tri-gap-2 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-3 tri-text-left tri-text-sm tri-transition-colors hover:tri-border-[var(--tri-border-hover)] focus-visible:tri-border-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 data-[state=open]:tri-border-foreground',
              className,
            )}
          >
            <CalendarIcon className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
            <span className={cn('tri-flex-1', !value && 'tri-text-muted-foreground')}>
              {value ? formatDate(value) : placeholder}
            </span>
            <ChevronDown className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="tri-w-auto tri-p-0"
        >
          <Calendar
            value={draft}
            onChange={setDraft}
            className="tri-border-0 tri-shadow-none"
          />
          <div className="tri-flex tri-justify-between tri-gap-2 tri-border-t tri-border-border tri-px-3 tri-py-2.5">
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
