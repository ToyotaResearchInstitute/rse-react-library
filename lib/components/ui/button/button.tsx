import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI button. Per the design-system Buttons preview, Brand Red is the
 * Recommended default; Black (ink) and Blue are alternative accents.
 * Three hierarchy levels: primary (filled), secondary (outline), ghost.
 */
const buttonVariants = cva(
  "tri-inline-flex tri-items-center tri-justify-center tri-gap-2 tri-whitespace-nowrap tri-rounded-sm tri-border tri-border-transparent tri-text-sm tri-font-medium tri-leading-none tri-transition-colors tri-duration-150 focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-pointer-events-none disabled:tri-opacity-50 [&_svg]:tri-pointer-events-none [&_svg]:tri-size-4 [&_svg]:tri-shrink-0",
  {
    variants: {
      variant: {
        // Recommended — Brand Red primary
        default: "tri-bg-brand tri-text-brand-foreground hover:tri-bg-brand-hover",
        // Neutral secondary (white + ink border) — e.g. Cancel
        secondary: "tri-bg-background tri-text-foreground tri-border-foreground hover:tri-bg-secondary",
        // Ghost — dense UI / table rows
        ghost: "tri-bg-transparent tri-text-foreground hover:tri-bg-muted",
        // Neutral outline (kept for compatibility, e.g. Multiselect trigger)
        outline: "tri-border-input tri-bg-background tri-text-foreground hover:tri-bg-muted",
        // Destructive
        destructive: "tri-bg-destructive tri-text-destructive-foreground hover:tri-bg-destructive/90",
        // Link
        link: "tri-text-link tri-underline-offset-4 hover:tri-underline",
        // Alternative accents (filled primary)
        ink: "tri-bg-primary tri-text-primary-foreground hover:tri-bg-neutral-700",
        blue: "tri-bg-info tri-text-white hover:tri-bg-[var(--tri-blue-700)]",
      },
      size: {
        default: "tri-h-9 tri-px-4 tri-py-2",
        sm: "tri-h-8 tri-px-3 tri-text-sm",
        lg: "tri-h-10 tri-px-6",
        icon: "tri-h-9 tri-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Show an inline spinner and disable the button (DS button loading state). */
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // With asChild the child must be a single element, so we don't inject a
    // spinner (the caller composes it); otherwise render the loading spinner.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), loading && "tri-cursor-wait")}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {!asChild && loading && (
          <span
            aria-hidden
            className="tri-size-4 tri-animate-spin tri-rounded-full tri-border-2 tri-border-current tri-border-t-transparent tri-opacity-70"
          />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
