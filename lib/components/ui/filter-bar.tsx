import * as React from "react"
import { X, Plus } from "lucide-react"

import { cn } from "./utils"

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
      "flex flex-wrap items-center gap-2 rounded-md border border-border bg-[var(--bg-subtle)] p-2",
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
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs",
        dashed
          ? "cursor-pointer border-dashed border-[var(--border-hover)] bg-transparent text-muted-foreground"
          : "border-[var(--border-hover)] bg-background text-foreground",
        className
      )}
      {...props}
    >
      {dashed && <Plus className="size-3" />}
      {children}
      {!dashed && onRemove && (
        <button
          type="button"
          aria-label="Remove filter"
          onClick={onRemove}
          className="inline-flex size-3 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-3" />
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
    className={cn("ml-auto font-mono text-xs text-muted-foreground", className)}
    {...props}
  />
))
FilterCount.displayName = "FilterCount"

export { FilterBar, FilterChip, FilterCount }
