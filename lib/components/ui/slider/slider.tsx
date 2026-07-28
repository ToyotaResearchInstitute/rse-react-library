import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../utils"

/**
 * TRI slider. Per the design-system Sliders preview: a 4px muted track with a
 * filled range and a 16px white thumb bordered in the accent color. Brand red
 * is the recommended accent on white surfaces; the range/thumb pull from
 * `bg-primary` here and can be themed via className. Supports single and range
 * (multiple thumbs) values.
 */
const sliderAccent = {
  ink: { range: "tri-bg-primary", thumb: "tri-border-primary" },
  brand: { range: "tri-bg-brand", thumb: "tri-border-brand" },
  info: { range: "tri-bg-info", thumb: "tri-border-info" },
} as const

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    /** Accent theme for the range + thumb. */
    color?: "ink" | "brand" | "info"
    /** Show a value bubble above each thumb. */
    showValue?: boolean
  }
>(({ className, color = "ink", showValue = false, ...props }, ref) => {
  const value = props.value ?? props.defaultValue ?? [0]
  const values = Array.isArray(value) ? value : [value]
  const thumbCount = values.length
  const accent = sliderAccent[color]

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "tri-relative tri-flex tri-w-full tri-touch-none tri-select-none tri-items-center data-[disabled]:tri-opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="tri-relative tri-h-1 tri-w-full tri-grow tri-overflow-hidden tri-rounded-pill tri-bg-muted">
        <SliderPrimitive.Range className={cn("tri-absolute tri-h-full tri-rounded-pill", accent.range)} />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "tri-relative tri-block tri-h-4 tri-w-4 tri-rounded-pill tri-border-2 tri-bg-background tri-shadow-sm tri-ring-offset-background tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 data-[disabled]:tri-pointer-events-none",
            accent.thumb
          )}
        >
          {showValue && (
            <span className="tri-absolute -tri-top-7 tri-left-1/2 -tri-translate-x-1/2 tri-rounded-sm tri-bg-primary tri-px-1.5 tri-py-0.5 tri-font-mono tri-text-[11px] tri-leading-none tri-text-primary-foreground">
              {values[i]}
            </span>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
