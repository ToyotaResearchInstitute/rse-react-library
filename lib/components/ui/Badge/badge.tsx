import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import "./styles.css"

import { cn } from "../utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Semantic color variants
        red: "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        warning:
          "border-transparent bg-orange-500 text-white hover:bg-orange-500/80",
        activity: "border-transparent bg-black text-white hover:bg-black/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

/**
 * A small overlay badge (a dot, or a numeric count) that sits on the
 * top-right corner of an icon or any other element.
 *
 * Usage:
 *   <NotificationBadge dot>
 *     <MessageSquare className="size-[24px]" />
 *   </NotificationBadge>
 *
 *   <NotificationBadge count={5}>
 *     <MessageSquare className="size-[24px]" />
 *   </NotificationBadge>
 */
/** Semantic color for the notification indicator. */
export type NotificationBadgeColor =
  | "red"
  | "info"
  | "success"
  | "warning"
  | "activity"

const notificationBadgeColors: Record<NotificationBadgeColor, string> = {
  red: "red",
  info: "info",
  success: "success",
  warning: "warning",
  activity: "activity",
}

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** The element to overlay the badge onto (e.g. an icon). */
  children: React.ReactNode
  /** Render a small dot instead of a number. */
  dot?: boolean
  /** The number to display. Hidden when 0 (unless `showZero`). */
  count?: number
  /** Numbers above this show as `{max}+`. Defaults to 99. */
  max?: number
  /** Show the count badge even when count is 0. */
  showZero?: boolean
  /** Semantic color of the indicator. Defaults to `red`. */
  variant?: NotificationBadgeColor
  /** Extra classes applied to the badge indicator itself. */
  badgeClassName?: string
}

function NotificationBadge({
  children,
  dot = false,
  count,
  max = 99,
  showZero = false,
  variant = "red",
  className,
  badgeClassName,
  ...props
}: NotificationBadgeProps) {
  const hasCount = typeof count === "number" && (count > 0 || showZero)
  const showIndicator = dot || hasCount
  const display =
    count !== undefined && count > max ? `${max}+` : count

  return (
    <span
      className={cn("relative inline-flex flex-shrink-0", className)}
      {...props}
    >
      {children}
      {showIndicator &&
        (dot ? (
          <span
            className={cn(
              "dot",
              notificationBadgeColors[variant],
              badgeClassName
            )}
          />
        ) : (
          <span
            className={cn(
              "count",
              notificationBadgeColors[variant],
              badgeClassName
            )}
          >
            {display}
          </span>
        ))}
    </span>
  )
}

export { Badge, badgeVariants, NotificationBadge }
