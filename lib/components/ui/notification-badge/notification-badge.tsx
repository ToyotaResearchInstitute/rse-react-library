import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Notification badges. Per the design-system Badges preview, these are
 * small indicators that attach to an anchor (icon or avatar):
 *  - `NotificationDot`  — a 10px colored dot with a 2px white ring, no label.
 *  - `CountBadge`       — a numeric pill (min 18px, white text, 2px white ring).
 *
 * Both position themselves at the anchor's top-right via `absolute`, so the
 * anchor element must be `position: relative` (use the `NotificationAnchor`
 * helper, or any element with `relative`).
 */
const dotColors = {
  brand: "bg-brand",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  ink: "bg-primary",
} as const

type BadgeColor = keyof typeof dotColors

const dotVariants = cva(
  "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-pill border-2 border-white",
  {
    variants: {
      color: dotColors,
    },
    defaultVariants: {
      color: "brand",
    },
  }
)

export interface NotificationDotProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof dotVariants> {}

const NotificationDot = React.forwardRef<HTMLSpanElement, NotificationDotProps>(
  ({ className, color, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(dotVariants({ color }), className)}
      {...props}
    />
  )
)
NotificationDot.displayName = "NotificationDot"

const countVariants = cva(
  "absolute -right-1.5 -top-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[9px] border-2 border-white px-[5px] text-[11px] font-semibold leading-none text-white",
  {
    variants: {
      color: dotColors,
    },
    defaultVariants: {
      color: "brand",
    },
  }
)

export interface CountBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "children">,
    VariantProps<typeof countVariants> {
  /** The numeric value to display. */
  count: number
  /** Counts above this are shown as `${max}+`. Defaults to 99. */
  max?: number
}

const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  ({ className, color, count, max = 99, ...props }, ref) => {
    const display = count > max ? `${max}+` : `${count}`
    return (
      <span
        ref={ref}
        className={cn(countVariants({ color }), className)}
        {...props}
      >
        {display}
      </span>
    )
  }
)
CountBadge.displayName = "CountBadge"

/**
 * Optional convenience wrapper: a relatively-positioned inline-flex anchor that
 * a dot/count badge can attach to. Children render the icon/avatar; place the
 * badge as a sibling after the content.
 */
const NotificationAnchor = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("relative inline-flex", className)}
    {...props}
  />
))
NotificationAnchor.displayName = "NotificationAnchor"

export {
  NotificationDot,
  CountBadge,
  NotificationAnchor,
  dotVariants,
  countVariants,
}
export type { BadgeColor }
