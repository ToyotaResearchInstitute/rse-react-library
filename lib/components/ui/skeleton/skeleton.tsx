import * as React from "react"

import { cn } from "../utils"

/**
 * TRI skeleton. A neutral-gray placeholder that preserves the final layout
 * while data resolves, with a linear left-to-right shimmer sweep. Compose
 * width/height/shape via className (e.g. `h-4 w-1/2`, `h-10 w-10 rounded-full`).
 */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-relative tri-overflow-hidden tri-rounded-md tri-bg-muted",
      className
    )}
    {...props}
  >
    <div className="tri-absolute tri-inset-0 -tri-translate-x-full tri-animate-shimmer tri-bg-gradient-to-r tri-from-transparent tri-via-foreground/10 tri-to-transparent" />
  </div>
))
Skeleton.displayName = "Skeleton"

/** List-item placeholder: avatar circle + two stacked lines + trailing bar. */
const SkeletonListItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("tri-flex tri-items-center tri-gap-3 tri-p-3", className)}
    {...props}
  >
    <Skeleton className="tri-size-9 tri-rounded-full" />
    <div className="tri-flex tri-flex-1 tri-flex-col tri-gap-1.5">
      <Skeleton className="tri-h-3 tri-w-[55%]" />
      <Skeleton className="tri-h-3 tri-w-[35%]" />
    </div>
    <Skeleton className="tri-h-2 tri-w-10" />
  </div>
)
SkeletonListItem.displayName = "SkeletonListItem"

/** Row of KPI-tile placeholders. */
const SkeletonStatTiles = ({
  count = 3,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { count?: number }) => (
  <div
    className={cn("tri-grid tri-grid-cols-3 tri-gap-4", className)}
    {...props}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="tri-flex tri-flex-col tri-gap-2">
        <Skeleton className="tri-h-2 tri-w-3/5" />
        <Skeleton className="tri-h-6 tri-w-4/5 tri-rounded-xs" />
        <Skeleton className="tri-h-2 tri-w-2/5" />
      </div>
    ))}
  </div>
)
SkeletonStatTiles.displayName = "SkeletonStatTiles"

/** Table-row placeholders (checkbox · text · pill · trailing dot). */
const SkeletonTableRows = ({
  rows = 3,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { rows?: number }) => (
  <div className={cn("tri-flex tri-flex-col", className)} {...props}>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="tri-grid tri-grid-cols-[16px_2fr_1fr_80px_24px] tri-items-center tri-gap-4 tri-border-b tri-border-border tri-px-3 tri-py-3 last:tri-border-b-0"
      >
        <Skeleton className="tri-size-3.5 tri-rounded-xs" />
        <Skeleton className="tri-h-3 tri-w-3/4" />
        <Skeleton className="tri-h-3 tri-w-1/2" />
        <Skeleton className="tri-h-[18px] tri-w-14 tri-rounded-pill" />
        <Skeleton className="tri-size-3.5 tri-rounded-full" />
      </div>
    ))}
  </div>
)
SkeletonTableRows.displayName = "SkeletonTableRows"

export { Skeleton, SkeletonListItem, SkeletonStatTiles, SkeletonTableRows }
