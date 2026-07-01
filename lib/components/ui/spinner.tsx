import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

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

export { Spinner, spinnerVariants }
