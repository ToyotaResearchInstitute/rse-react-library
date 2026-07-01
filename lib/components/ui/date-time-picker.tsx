import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"

import { cn } from "./utils"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { Calendar } from "./calendar"
import { Button } from "./button"

/**
 * TRI Date + time picker. Per the design-system "Date & time → Date + time"
 * preview: the month-grid Calendar beside a time panel (HH / MM inputs + AM/PM
 * toggle + a 2×2 quick-time preset grid), with a Clear / Apply footer.
 */
const TIME_PRESETS = [
  { label: "9:00 AM", hour: 9, minute: 0, meridiem: "AM" as const },
  { label: "12:00 PM", hour: 12, minute: 0, meridiem: "PM" as const },
  { label: "3:00 PM", hour: 3, minute: 0, meridiem: "PM" as const },
  { label: "5:00 PM", hour: 5, minute: 0, meridiem: "PM" as const },
]

export interface DateTimeValue {
  date?: Date
  hour: number
  minute: number
  meridiem: "AM" | "PM"
}

function label(v?: DateTimeValue) {
  if (!v?.date) return ""
  const d = v.date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  return `${d} · ${v.hour}:${v.minute.toString().padStart(2, "0")} ${v.meridiem}`
}

export interface DateTimePickerProps {
  value?: DateTimeValue
  onValueChange?: (value: DateTimeValue) => void
  placeholder?: string
  className?: string
}

const empty: DateTimeValue = { date: undefined, hour: 9, minute: 0, meridiem: "AM" }

const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  ({ value, onValueChange, placeholder = "Select date & time", className }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [draft, setDraft] = React.useState<DateTimeValue>(value ?? empty)

    React.useEffect(() => {
      if (open) setDraft(value ?? empty)
    }, [open, value])

    const numberField = (key: "hour" | "minute", max: number) => (
      <input
        type="text"
        inputMode="numeric"
        aria-label={key}
        value={key === "minute" ? draft.minute.toString().padStart(2, "0") : String(draft.hour)}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "")
          if (raw === "") return
          const n = Math.min(max, Math.max(key === "hour" ? 1 : 0, Number(raw)))
          setDraft((d) => ({ ...d, [key]: n }))
        }}
        className="h-9 w-11 rounded-sm border border-input bg-background text-center font-mono text-sm outline-none transition-colors focus:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
    )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            className={cn(
              "flex h-9 w-[280px] items-center gap-2 rounded-sm border border-input bg-background px-3 text-left text-sm transition-colors hover:border-[var(--border-hover)] focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:border-foreground",
              className
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className={cn("flex-1 truncate", !value?.date && "text-muted-foreground")}>
              {value?.date ? label(value) : placeholder}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <div className="flex">
            <Calendar
              value={draft.date}
              onChange={(date) => setDraft((d) => ({ ...d, date }))}
              className="border-0 shadow-none"
            />
            <div className="flex w-48 flex-col gap-3 border-l border-border p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {numberField("hour", 12)}
                  <span className="font-mono text-sm text-muted-foreground">:</span>
                  {numberField("minute", 59)}
                </div>
                <div className="inline-flex overflow-hidden rounded-sm border border-input">
                  {(["AM", "PM"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, meridiem: m }))}
                      className={cn(
                        "px-2.5 py-1.5 font-mono text-xs transition-colors focus:outline-none focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        draft.meridiem === m
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground hover:bg-muted"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {TIME_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() =>
                      setDraft((d) => ({ ...d, hour: p.hour, minute: p.minute, meridiem: p.meridiem }))
                    }
                    className="rounded-sm border border-border px-2 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-border px-3 py-2.5">
            <Button variant="ghost" size="sm" onClick={() => { setDraft(empty); onValueChange?.(empty); setOpen(false) }}>
              Clear
            </Button>
            <Button size="sm" onClick={() => { onValueChange?.(draft); setOpen(false) }}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DateTimePicker.displayName = "DateTimePicker"

export { DateTimePicker }
