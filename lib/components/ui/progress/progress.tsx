import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../utils"

/**
 * TRI Progress. Per the design-system Loading & Sliders previews: a thin track
 * (#eeeeee) with an accent fill. Supports determinate (`value`) and
 * indeterminate modes, plus accent themes ink (default) / brand / info. See
 * `CircularProgress` for the ring variant.
 */
const accentBar = {
  ink: "tri-bg-primary",
  brand: "tri-bg-brand",
  info: "tri-bg-info",
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
      "tri-relative tri-h-1.5 tri-w-full tri-overflow-hidden tri-rounded-pill tri-bg-[var(--tri-brand-gray)]",
      className
    )}
    {...props}
  >
    {indeterminate ? (
      <div
        className={cn(
          "tri-absolute tri-inset-y-0 tri-left-0 tri-w-2/5 tri-rounded-pill tri-animate-progress-indeterminate",
          accentBar[color]
        )}
      />
    ) : (
      <ProgressPrimitive.Indicator
        className={cn("tri-h-full tri-rounded-pill tri-transition-transform", accentBar[color])}
        style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
      />
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

const accentStroke = {
  ink: "tri-stroke-primary",
  brand: "tri-stroke-brand",
  info: "tri-stroke-info",
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
        className={cn("tri-relative tri-inline-flex tri-items-center tri-justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg viewBox="0 0 56 56" className="-tri-rotate-90" width={size} height={size}>
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="tri-stroke-[var(--tri-brand-gray)]"
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
            className={cn("tri-transition-[stroke-dashoffset]", accentStroke[color])}
          />
        </svg>
        {showValue && (
          <span className="tri-absolute tri-text-xs tri-font-semibold tri-text-foreground tri-[font-feature-settings:'tnum']">
            {Math.round(clamped)}%
          </span>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { Progress, CircularProgress }
