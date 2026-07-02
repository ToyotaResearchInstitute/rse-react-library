import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "./utils"

/**
 * TRI Calendar — a self-contained, controlled month-grid date picker.
 * Matches the Date & time pickers preview: ink (#0B0B0D) selected day,
 * a blue dot beneath today, muted outside-month days, ~square rounded
 * day cells, and prev/next month navigation with lucide chevrons.
 *
 * No third-party date libraries — plain JS Date math only.
 */

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected date (controlled). */
  value?: Date
  /** Fired with the clicked date. */
  onChange?: (date: Date) => void
  /** Month to show initially (uncontrolled view); defaults to value or today. */
  defaultMonth?: Date
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, value, onChange, defaultMonth, ...props }, ref) => {
    const today = React.useMemo(() => startOfDay(new Date()), [])

    const [viewDate, setViewDate] = React.useState<Date>(() => {
      const base = defaultMonth ?? value ?? today
      return new Date(base.getFullYear(), base.getMonth(), 1)
    })

    // The day that is currently tabbable / focus target (roving tabindex).
    const [focusedDate, setFocusedDate] = React.useState<Date>(() =>
      startOfDay(value ?? defaultMonth ?? today)
    )
    const dayRefs = React.useRef(new Map<number, HTMLButtonElement>())
    // Set when a keyboard move should pull DOM focus to the new focusedDate.
    const focusRequestRef = React.useRef(false)

    // Keep the visible month + focus target in sync when a value in another
    // month is set.
    React.useEffect(() => {
      if (value) {
        setViewDate(new Date(value.getFullYear(), value.getMonth(), 1))
        setFocusedDate(startOfDay(value))
      }
    }, [value])

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const goToMonth = (delta: number) =>
      setViewDate(new Date(year, month + delta, 1))

    // Build a 6-row (42-cell) grid starting on Sunday.
    const days = React.useMemo(() => {
      const firstOfMonth = new Date(year, month, 1)
      const gridStart = new Date(year, month, 1 - firstOfMonth.getDay())
      return Array.from({ length: 42 }, (_, i) => {
        const date = new Date(
          gridStart.getFullYear(),
          gridStart.getMonth(),
          gridStart.getDate() + i
        )
        return date
      })
    }, [year, month])

    const weeks = React.useMemo(() => {
      const out: Date[][] = []
      for (let i = 0; i < days.length; i += 7) out.push(days.slice(i, i + 7))
      return out
    }, [days])

    // After a keyboard move, pull focus to the newly-targeted day cell.
    React.useEffect(() => {
      if (!focusRequestRef.current) return
      focusRequestRef.current = false
      dayRefs.current.get(focusedDate.getTime())?.focus()
    }, [focusedDate, year, month])

    const moveFocus = (from: Date, deltaDays: number) => {
      const next = startOfDay(
        new Date(from.getFullYear(), from.getMonth(), from.getDate() + deltaDays)
      )
      focusRequestRef.current = true
      setFocusedDate(next)
      if (next.getMonth() !== month || next.getFullYear() !== year) {
        setViewDate(new Date(next.getFullYear(), next.getMonth(), 1))
      }
    }

    const onDayKeyDown = (e: React.KeyboardEvent, date: Date) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          moveFocus(date, -1)
          break
        case "ArrowRight":
          e.preventDefault()
          moveFocus(date, 1)
          break
        case "ArrowUp":
          e.preventDefault()
          moveFocus(date, -7)
          break
        case "ArrowDown":
          e.preventDefault()
          moveFocus(date, 7)
          break
        case "Home":
          e.preventDefault()
          moveFocus(date, -date.getDay())
          break
        case "End":
          e.preventDefault()
          moveFocus(date, 6 - date.getDay())
          break
        case "PageUp":
          e.preventDefault()
          moveFocus(
            new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()),
            0
          )
          break
        case "PageDown":
          e.preventDefault()
          moveFocus(
            new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
            0
          )
          break
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-[280px] rounded-lg border bg-background p-3.5 shadow-lg",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {MONTH_NAMES[month]} {year}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => goToMonth(-1)}
              className="inline-flex size-6 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => goToMonth(1)}
              className="inline-flex size-6 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Weekday header */}
        <div role="row" className="mb-1 grid grid-cols-7 gap-0.5">
          {WEEKDAYS.map((d, i) => (
            <div
              key={i}
              role="columnheader"
              aria-label={WEEKDAY_NAMES[i]}
              className="py-1 text-center font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div
          role="grid"
          aria-label={`${MONTH_NAMES[month]} ${year}`}
          className="flex flex-col gap-0.5"
        >
          {weeks.map((week, wi) => (
            <div role="row" key={wi} className="grid grid-cols-7 gap-0.5">
              {week.map((date) => {
                const outside = date.getMonth() !== month
                const selected = value != null && isSameDay(date, value)
                const isToday = isSameDay(date, today)
                const isFocusTarget = isSameDay(date, focusedDate)
                return (
                  <button
                    key={date.getTime()}
                    ref={(el) => {
                      if (el) dayRefs.current.set(date.getTime(), el)
                      else dayRefs.current.delete(date.getTime())
                    }}
                    type="button"
                    role="gridcell"
                    tabIndex={isFocusTarget ? 0 : -1}
                    onClick={() => {
                      setFocusedDate(startOfDay(date))
                      onChange?.(startOfDay(date))
                    }}
                    onKeyDown={(e) => onDayKeyDown(e, date)}
                    aria-selected={selected}
                    aria-current={isToday ? "date" : undefined}
                    className={cn(
                      "relative flex aspect-square items-center justify-center rounded-md text-[13px] text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      !selected && "hover:bg-muted",
                      outside && "text-muted-foreground opacity-60",
                      isToday && "font-semibold",
                      selected &&
                        "bg-primary font-semibold text-primary-foreground hover:bg-primary"
                    )}
                  >
                    {date.getDate()}
                    {isToday && !selected && (
                      <span className="absolute bottom-1 size-[3px] rounded-full bg-info" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }
