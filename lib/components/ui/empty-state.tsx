import * as React from "react"

import { cn } from "./utils"

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
        "flex flex-col items-center gap-2 rounded-lg border border-border bg-background p-6 text-center [&>svg]:size-9 [&>svg]:text-[var(--neutral-300)]",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="text-[var(--neutral-300)] [&_svg]:size-9 [&_svg]:stroke-[1.5]">
          {icon}
        </span>
      )}
      <div className="text-sm font-semibold text-foreground">{title}</div>
      {description && (
        <div className="text-[13px] text-muted-foreground">{description}</div>
      )}
      {children && <div className="mt-2">{children}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
