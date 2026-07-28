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
  brand: "tri-bg-brand",
  info: "tri-bg-info",
  success: "tri-bg-success",
  warning: "tri-bg-warning",
  ink: "tri-bg-primary",
} as const

type BadgeColor = keyof typeof dotColors

const dotVariants = cva(
  "tri-absolute -tri-right-0.5 -tri-top-0.5 tri-h-2.5 tri-w-2.5 tri-rounded-pill tri-border-2 tri-border-white",
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
  "tri-absolute -tri-right-1.5 -tri-top-1.5 tri-inline-flex tri-h-[18px] tri-min-w-[18px] tri-items-center tri-justify-center tri-rounded-[9px] tri-border-2 tri-border-white tri-px-[5px] tri-text-[11px] tri-font-semibold tri-leading-none tri-text-white",
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
    className={cn("tri-relative tri-inline-flex", className)}
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
