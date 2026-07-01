import * as React from "react"

import { cn } from "./utils"

/**
 * TRI skeleton. A pulsing neutral-gray placeholder that preserves the final
 * layout while data resolves. Compose width/height/shape via className
 * (e.g. `h-4 w-1/2`, `h-10 w-10 rounded-full`).
 */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }
