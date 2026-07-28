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
  "tri-inline-block tri-animate-spin tri-rounded-full tri-border-brand-gray tri-border-solid",
  {
    variants: {
      size: {
        sm: "tri-h-4 tri-w-4 tri-border-2",
        md: "tri-h-6 tri-w-6 tri-border-[3px]",
        lg: "tri-h-10 tri-w-10 tri-border-4",
      },
      variant: {
        ink: "tri-border-t-primary",
        brand: "tri-border-t-brand",
        info: "tri-border-t-info",
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
      <span className="tri-sr-only">{label}</span>
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
      "tri-flex tri-flex-col tri-items-center tri-justify-center tri-gap-3 tri-rounded-lg tri-bg-[var(--tri-bg-subtle)] tri-p-10",
      className
    )}
    {...props}
  >
    <Spinner size="lg" />
    {message && (
      <span className="tri-text-[13px] tri-text-[var(--tri-fg-subtle)]">{message}</span>
    )}
  </div>
))
FullPageLoader.displayName = "FullPageLoader"

export { Spinner, FullPageLoader, spinnerVariants }
