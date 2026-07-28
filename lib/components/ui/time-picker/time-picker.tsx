import * as React from "react"
import { Clock, ChevronDown } from "lucide-react"

import { cn } from "../utils"
import { Popover, PopoverTrigger, PopoverContent } from "../popover"

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
    className="tri-flex tri-max-h-[168px] tri-flex-col tri-overflow-y-auto tri-rounded-md  tri-bg-secondary "
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
            "tri-px-4 tri-py-1.5 tri-text-center tri-font-mono tri-text-[13px] tri-tabular-nums tri-transition-[colors,box-shadow]",
            active
              ? "tri-bg-white tri-font-bold tri-text-foreground tri-shadow-[0_-3px_4px_-2px_rgba(0,0,0,0.25),0_3px_4px_-2px_rgba(0,0,0,0.25)]"
              : "tri-text-muted-foreground hover:tri-text-foreground hover:tri-shadow-[0_-3px_4px_-2px_rgba(0,0,0,0.25),0_3px_4px_-2px_rgba(0,0,0,0.25)]"
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
              "tri-flex tri-h-9 tri-w-[220px] tri-items-center tri-gap-2 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-3 tri-text-left tri-text-sm tri-transition-colors hover:tri-border-[var(--tri-border-hover)] focus-visible:tri-border-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 data-[state=open]:tri-border-foreground",
              className
            )}
          >
            <Clock className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
            <span className={cn("tri-flex-1", !value && "tri-text-muted-foreground")}>
              {value ? formatTime(value) : placeholder}
            </span>
            <ChevronDown className="tri-size-4 tri-shrink-0 tri-text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="tri-w-auto tri-p-0">
          <div className="tri-flex tri-items-center tri-justify-center tri-gap-2 tri-p-2">
            <Column
              label="Hour"
              items={hours}
              selected={current.hour}
              format={(n) => String(n)}
              onSelect={(hour) => onValueChange?.({ ...current, hour })}
            />
            <span className=" tri-text-gray tri-font-bold">:</span>
            <Column
              label="Minute"
              items={minutes}
              selected={current.minute}
              format={(n) => n.toString().padStart(2, "0")}
              onSelect={(minute) => onValueChange?.({ ...current, minute })}
            />
            <div className="tri-flex tri-flex-col tri-gap-0.5 tri-rounded-lg tri-p-1 tri-bg-secondary">
              {(["AM", "PM"] as const).map((m) => {
                const active = current.meridiem === m
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onValueChange?.({ ...current, meridiem: m })}
                    className={cn(
                      "tri-rounded-md tri-px-3 tri-py-1.5 tri-font-mono tri-text-[13px] tri-transition-[colors,box-shadow]",
                      active
                        ? "tri-bg-white tri-font-bold  tri-text-foreground "
                        : "tri-bg-secondary tri-text-muted-foreground hover:tri-text-foreground"
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
