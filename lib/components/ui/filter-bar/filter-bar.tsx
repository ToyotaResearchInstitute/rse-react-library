import * as React from "react"
import { X, Plus } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Filter bar. Per the design-system "Search → Filter bar" preview: a muted
 * (#fafafa) bordered container that wraps a flex-1 search, a set of removable
 * facet chips, a dashed "+ Add filter" chip, and a right-aligned results count.
 * Compose freely — put a `Search` and any `FilterChip`s inside.
 */
const FilterBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-flex tri-flex-wrap tri-items-center tri-gap-2 tri-rounded-md tri-border tri-border-border tri-bg-[var(--tri-bg-subtle)] tri-p-2",
      className
    )}
    {...props}
  />
))
FilterBar.displayName = "FilterBar"

export interface FilterChipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Dashed "+ Add filter" affordance. */
  dashed?: boolean
  /** Fired when the remove (X) button is clicked (solid chips only). */
  onRemove?: () => void
}

/** Removable facet chip (the DS filter `.chip`). White pill with #d4d4d4 border;
 *  `dashed` renders the transparent add-filter affordance. */
const FilterChip = React.forwardRef<HTMLDivElement, FilterChipProps>(
  ({ className, dashed = false, onRemove, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "tri-inline-flex tri-items-center tri-gap-1.5 tri-rounded-pill tri-border tri-px-2.5 tri-py-1 tri-text-xs",
        dashed
          ? "tri-cursor-pointer tri-border-dashed tri-border-[var(--tri-border-hover)] tri-bg-transparent tri-text-muted-foreground"
          : "tri-border-[var(--tri-border-hover)] tri-bg-background tri-text-foreground",
        className
      )}
      {...props}
    >
      {dashed && <Plus className="tri-size-3" />}
      {children}
      {!dashed && onRemove && (
        <button
          type="button"
          aria-label="Remove filter"
          onClick={onRemove}
          className="tri-inline-flex tri-size-3 tri-shrink-0 tri-cursor-pointer tri-items-center tri-justify-center tri-border-none tri-bg-transparent tri-p-0 tri-opacity-60 hover:tri-opacity-100 focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring"
        >
          <X className="tri-size-3" />
        </button>
      )}
    </div>
  )
)
FilterChip.displayName = "FilterChip"

/** Right-aligned muted results count for the filter bar. */
const FilterCount = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("tri-ml-auto tri-font-mono tri-text-xs tri-text-muted-foreground", className)}
    {...props}
  />
))
FilterCount.displayName = "FilterCount"

export { FilterBar, FilterChip, FilterCount }
