import * as React from "react"
import { Clock, ChevronDown } from "lucide-react"

import { cn } from "./utils"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"

/**
 * TRI Time picker. Per the design-system "Date & time → Time" preview: a
 * bordered trigger field (clock icon + value + chevron) that opens scrolling
 * hour and minute columns plus an AM/PM (meridiem) toggle in a popover. Each
 * selection is committed immediately to the field. Controlled via a
 * `{ hour, minute, meridiem }` value (12-hour clock).
 */
export interface TimeValue {
  /** 1–12 */
  hour: number
  /** 0–59 */
  minute: number
  meridiem: "AM" | "PM"
}

export interface TimePickerProps {
  value?: TimeValue
  onValueChange?: (value: TimeValue) => void
  /** Minute step (default 5). */
  minuteStep?: number
  placeholder?: string
  className?: string
}

function formatTime(v?: TimeValue) {
  return v ? `${v.hour}:${v.minute.toString().padStart(2, "0")} ${v.meridiem}` : ""
}

const defaultTime: TimeValue = { hour: 12, minute: 0, meridiem: "AM" }

const Column = ({
  items,
  selected,
  format,
  onSelect,
  label,
}: {
  items: number[]
  selected: number
  format: (n: number) => string
  onSelect: (n: number) => void
  label: string
}) => (
  <div
    role="listbox"
    aria-label={label}
    className="flex max-h-[168px] flex-col overflow-y-auto rounded-md  bg-secondary "
  >
    {items.map((n) => {
      const active = n === selected
      return (
        <button
          key={n}
          type="button"
          role="option"
          aria-selected={active}
          onClick={() => onSelect(n)}
          className={cn(
            "px-4 py-1.5 text-center font-mono text-[13px] tabular-nums transition-[colors,box-shadow]",
            active
              ? "bg-white font-bold text-foreground shadow-[0_-3px_4px_-2px_rgba(0,0,0,0.25),0_3px_4px_-2px_rgba(0,0,0,0.25)]"
              : "text-muted-foreground hover:text-foreground hover:shadow-[0_-3px_4px_-2px_rgba(0,0,0,0.25),0_3px_4px_-2px_rgba(0,0,0,0.25)]"
          )}
        >
          {format(n)}
        </button>
      )
    })}
  </div>
)

const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  ({ className, value, onValueChange, minuteStep = 5, placeholder = "Select time" }, ref) => {
    const [open, setOpen] = React.useState(false)
    const current = value ?? defaultTime

    const hours = Array.from({ length: 12 }, (_, i) => i + 1)
    const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            className={cn(
              "flex h-9 w-[220px] items-center gap-2 rounded-sm border border-input bg-background px-3 text-left text-sm transition-colors hover:border-[var(--border-hover)] focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:border-foreground",
              className
            )}
          >
            <Clock className="size-4 shrink-0 text-muted-foreground" />
            <span className={cn("flex-1", !value && "text-muted-foreground")}>
              {value ? formatTime(value) : placeholder}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <div className="flex items-center justify-center gap-2 p-2">
            <Column
              label="Hour"
              items={hours}
              selected={current.hour}
              format={(n) => String(n)}
              onSelect={(hour) => onValueChange?.({ ...current, hour })}
            />
            <span className=" text-gray font-bold">:</span>
            <Column
              label="Minute"
              items={minutes}
              selected={current.minute}
              format={(n) => n.toString().padStart(2, "0")}
              onSelect={(minute) => onValueChange?.({ ...current, minute })}
            />
            <div className="flex flex-col gap-0.5 rounded-lg p-1 bg-secondary">
              {(["AM", "PM"] as const).map((m) => {
                const active = current.meridiem === m
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onValueChange?.({ ...current, meridiem: m })}
                    className={cn(
                      "rounded-md px-3 py-1.5 font-mono text-[13px] transition-[colors,box-shadow]",
                      active
                        ? "bg-white font-bold  text-foreground "
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {m}
                  </button>
                )
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
TimePicker.displayName = "TimePicker"

export { TimePicker }
