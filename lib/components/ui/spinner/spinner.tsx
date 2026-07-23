import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI spinner. Per the design-system Loading preview: a circular border
 * spinner on a neutral track with the accent on the top edge, rotating via
 * `animate-spin`. Sizes sm·16 / md·24 / lg·40; accents ink (default), brand,
 * info. Rendered as a `role="status"` element for accessibility.
 */
const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-brand-gray border-solid",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-[3px]",
        lg: "h-10 w-10 border-4",
      },
      variant: {
        ink: "border-t-primary",
        brand: "border-t-brand",
        info: "border-t-info",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "ink",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label announced to screen readers. */
  label?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
)
Spinner.displayName = "Spinner"

/**
 * Full-page / container loader. Per the DS "Full-page loader": a centered
 * large spinner with a muted message on a subtle surface. Add `fixed inset-0`
 * via className to cover the viewport, or drop it into any container.
 */
const FullPageLoader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { message?: React.ReactNode }
>(({ className, message = "Loading…", ...props }, ref) => (
  <div
    ref={ref}
    role="status"
    className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-lg bg-[var(--bg-subtle)] p-10",
      className
    )}
    {...props}
  >
    <Spinner size="lg" />
    {message && (
      <span className="text-[13px] text-[var(--fg-subtle)]">{message}</span>
    )}
  </div>
))
FullPageLoader.displayName = "FullPageLoader"

export { Spinner, FullPageLoader, spinnerVariants }
