import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../utils"

/**
 * TRI Separator. Per the design-system Dividers preview, the default is a 1px
 * #e5e5e5 hairline rule used to separate sibling content, available in both
 * horizontal and vertical orientation. Wraps @radix-ui/react-separator.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    /** Visual style: default hairline, strong (2px ink), dashed, or gradient fade. */
    variant?: "default" | "strong" | "dashed" | "gradient"
  }
>(
  (
    { className, orientation = "horizontal", decorative = true, variant = "default", ...props },
    ref
  ) => {
    const horizontal = orientation === "horizontal"
    const byVariant = {
      default: cn("tri-bg-border", horizontal ? "tri-h-px tri-w-full" : "tri-h-full tri-w-px"),
      strong: cn("tri-bg-primary", horizontal ? "tri-h-0.5 tri-w-full" : "tri-h-full tri-w-0.5"),
      dashed: cn(
        "tri-bg-transparent",
        horizontal
          ? "tri-h-0 tri-w-full tri-border-t tri-border-dashed tri-border-[var(--tri-border-hover)]"
          : "tri-h-full tri-w-0 tri-border-l tri-border-dashed tri-border-[var(--tri-border-hover)]"
      ),
      gradient: horizontal
        ? "tri-h-px tri-w-full tri-bg-gradient-to-r tri-from-transparent tri-via-[var(--tri-border-hover)] tri-to-transparent"
        : "tri-h-full tri-w-px tri-bg-gradient-to-b tri-from-transparent tri-via-[var(--tri-border-hover)] tri-to-transparent",
    }
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn("tri-shrink-0", byVariant[variant], className)}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

/** Labeled divider — a centered uppercase label bracketed by two hairlines. */
const LabeledSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      "tri-flex tri-items-center tri-gap-3 tri-font-mono tri-text-xs tri-font-medium tri-uppercase tri-tracking-[0.08em] tri-text-muted-foreground",
      "before:tri-h-px before:tri-flex-1 before:tri-bg-border before:tri-content-['']",
      "after:tri-h-px after:tri-flex-1 after:tri-bg-border after:tri-content-['']",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
LabeledSeparator.displayName = "LabeledSeparator"

export { Separator, LabeledSeparator }
