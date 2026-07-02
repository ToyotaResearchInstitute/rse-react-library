import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "./utils"

/**
 * TRI slider. Per the design-system Sliders preview: a 4px muted track with a
 * filled range and a 16px white thumb bordered in the accent color. Brand red
 * is the recommended accent on white surfaces; the range/thumb pull from
 * `bg-primary` here and can be themed via className. Supports single and range
 * (multiple thumbs) values.
 */
const sliderAccent = {
  ink: { range: "bg-primary", thumb: "border-primary" },
  brand: { range: "bg-brand", thumb: "border-brand" },
  info: { range: "bg-info", thumb: "border-info" },
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
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-pill bg-muted">
        <SliderPrimitive.Range className={cn("absolute h-full rounded-pill", accent.range)} />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "relative block h-4 w-4 rounded-pill border-2 bg-background shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:pointer-events-none",
            accent.thumb
          )}
        >
          {showValue && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-sm bg-primary px-1.5 py-0.5 font-mono text-[11px] leading-none text-primary-foreground">
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
