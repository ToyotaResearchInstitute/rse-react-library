import * as React from "react"

import { cn } from "./utils"

/**
 * TRI Time picker. Per the design-system "Date & time → Time" preview: scrolling
 * hour and minute columns plus an AM/PM (meridiem) toggle. Controlled via a
 * `{ hour, minute, meridiem }` value (12-hour clock).
 */
export interface TimeValue {
  /** 1–12 */
  hour: number
  /** 0–59 */
  minute: number
  meridiem: "AM" | "PM"
}

export interface TimePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: TimeValue
  onValueChange: (value: TimeValue) => void
  /** Minute step (default 5). */
  minuteStep?: number
}

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
    className="flex max-h-[168px] flex-col gap-0.5 overflow-y-auto px-1"
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
            "rounded-sm px-3 py-1.5 text-center font-mono text-[13px] tabular-nums transition-colors",
            active
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          )}
        >
          {format(n)}
        </button>
      )
    })}
  </div>
)

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ className, value, onValueChange, minuteStep = 5, ...props }, ref) => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1)
    const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep)

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex gap-2 rounded-lg border border-border bg-background p-2 shadow-lg",
          className
        )}
        {...props}
      >
        <Column
          label="Hour"
          items={hours}
          selected={value.hour}
          format={(n) => String(n)}
          onSelect={(hour) => onValueChange({ ...value, hour })}
        />
        <Column
          label="Minute"
          items={minutes}
          selected={value.minute}
          format={(n) => n.toString().padStart(2, "0")}
          onSelect={(minute) => onValueChange({ ...value, minute })}
        />
        <div className="flex flex-col gap-0.5 border-l border-border pl-2">
          {(["AM", "PM"] as const).map((m) => {
            const active = value.meridiem === m
            return (
              <button
                key={m}
                type="button"
                onClick={() => onValueChange({ ...value, meridiem: m })}
                className={cn(
                  "rounded-sm px-3 py-1.5 font-mono text-[13px] transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {m}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)
TimePicker.displayName = "TimePicker"

export { TimePicker }
