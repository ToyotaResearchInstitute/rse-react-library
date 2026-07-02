import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "./utils"

/**
 * TRI Progress. Per the design-system Loading & Sliders previews: a thin track
 * (#eeeeee) with an accent fill. Supports determinate (`value`) and
 * indeterminate modes, plus accent themes ink (default) / brand / info. See
 * `CircularProgress` for the ring variant.
 */
const accentBar = {
  ink: "bg-primary",
  brand: "bg-brand",
  info: "bg-info",
} as const

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** 0–100. Ignored when `indeterminate`. */
  value?: number
  /** Show the looping indeterminate animation instead of a fixed value. */
  indeterminate?: boolean
  color?: "ink" | "brand" | "info"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, indeterminate = false, color = "ink", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={indeterminate ? null : value}
    className={cn(
      "relative h-1.5 w-full overflow-hidden rounded-pill bg-[var(--brand-gray)]",
      className
    )}
    {...props}
  >
    {indeterminate ? (
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-2/5 rounded-pill animate-progress-indeterminate",
          accentBar[color]
        )}
      />
    ) : (
      <ProgressPrimitive.Indicator
        className={cn("h-full rounded-pill transition-transform", accentBar[color])}
        style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
      />
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

const accentStroke = {
  ink: "stroke-primary",
  brand: "stroke-brand",
  info: "stroke-info",
} as const

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. */
  value?: number
  /** Pixel diameter. */
  size?: number
  /** Ring thickness. */
  strokeWidth?: number
  color?: "ink" | "brand" | "info"
  /** Render the numeric percentage in the center. */
  showValue?: boolean
}

/** Circular determinate progress ring with an optional centered percentage. */
const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    { className, value = 0, size = 48, strokeWidth = 5, color = "ink", showValue = true, ...props },
    ref
  ) => {
    const clamped = Math.min(100, Math.max(0, value))
    const radius = 22
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (clamped / 100) * circumference
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg viewBox="0 0 56 56" className="-rotate-90" width={size} height={size}>
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-[var(--brand-gray)]"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn("transition-[stroke-dashoffset]", accentStroke[color])}
          />
        </svg>
        {showValue && (
          <span className="absolute text-xs font-semibold text-foreground [font-feature-settings:'tnum']">
            {Math.round(clamped)}%
          </span>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { Progress, CircularProgress }
