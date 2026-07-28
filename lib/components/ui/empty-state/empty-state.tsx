import * as React from "react"

import { cn } from "../utils"

/**
 * TRI Empty state. Per the design-system "Search → Empty / no-results" preview:
 * a centered card (24px padding, 1px #e5e5e5 border, 10px radius) with a large
 * muted icon, a bold title, a muted sub-line, and an optional action. Reused by
 * search-empty and table-empty surfaces.
 *
 * Pass a lucide icon (rendered at 36px, muted) via `icon`, and any action
 * (e.g. a Button) as `children`.
 */
export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "tri-flex tri-flex-col tri-items-center tri-gap-2 tri-rounded-lg tri-border tri-border-border tri-bg-background tri-p-6 tri-text-center [&>svg]:tri-size-9 [&>svg]:tri-text-[var(--tri-neutral-300)]",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="tri-text-[var(--tri-neutral-300)] [&_svg]:tri-size-9 [&_svg]:tri-stroke-[1.5]">
          {icon}
        </span>
      )}
      <div className="tri-text-sm tri-font-semibold tri-text-foreground">{title}</div>
      {description && (
        <div className="tri-text-[13px] tri-text-muted-foreground">{description}</div>
      )}
      {children && <div className="tri-mt-2">{children}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
