import * as React from "react"

import { cn } from "./utils"

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
    className={cn("relative overflow-hidden rounded-md bg-muted", className)}
    {...props}
  >
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
  </div>
))
Skeleton.displayName = "Skeleton"

/** List-item placeholder: avatar circle + two stacked lines + trailing bar. */
const SkeletonListItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-3 p-3", className)} {...props}>
    <Skeleton className="size-9 rounded-full" />
    <div className="flex flex-1 flex-col gap-1.5">
      <Skeleton className="h-3 w-[55%]" />
      <Skeleton className="h-3 w-[35%]" />
    </div>
    <Skeleton className="h-2 w-10" />
  </div>
)
SkeletonListItem.displayName = "SkeletonListItem"

/** Row of KPI-tile placeholders. */
const SkeletonStatTiles = ({
  count = 3,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { count?: number }) => (
  <div className={cn("grid grid-cols-3 gap-4", className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex flex-col gap-2">
        <Skeleton className="h-2 w-3/5" />
        <Skeleton className="h-6 w-4/5 rounded-xs" />
        <Skeleton className="h-2 w-2/5" />
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
  <div className={cn("flex flex-col", className)} {...props}>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-[16px_2fr_1fr_80px_24px] items-center gap-4 border-b border-border px-3 py-3 last:border-b-0"
      >
        <Skeleton className="size-3.5 rounded-xs" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-[18px] w-14 rounded-pill" />
        <Skeleton className="size-3.5 rounded-full" />
      </div>
    ))}
  </div>
)
SkeletonTableRows.displayName = "SkeletonTableRows"

export { Skeleton, SkeletonListItem, SkeletonStatTiles, SkeletonTableRows }
