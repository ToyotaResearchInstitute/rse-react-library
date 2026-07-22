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
      default: cn("bg-border", horizontal ? "h-px w-full" : "h-full w-px"),
      strong: cn("bg-primary", horizontal ? "h-0.5 w-full" : "h-full w-0.5"),
      dashed: cn(
        "bg-transparent",
        horizontal
          ? "h-0 w-full border-t border-dashed border-[var(--border-hover)]"
          : "h-full w-0 border-l border-dashed border-[var(--border-hover)]"
      ),
      gradient: horizontal
        ? "h-px w-full bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent"
        : "h-full w-px bg-gradient-to-b from-transparent via-[var(--border-hover)] to-transparent",
    }
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn("shrink-0", byVariant[variant], className)}
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
      "flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground",
      "before:h-px before:flex-1 before:bg-border before:content-['']",
      "after:h-px after:flex-1 after:bg-border after:content-['']",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
LabeledSeparator.displayName = "LabeledSeparator"

export { Separator, LabeledSeparator }
