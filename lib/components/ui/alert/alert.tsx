import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Alert. Per the design-system Alerts preview: inline system feedback in
 * four severities — info, success, warning, error. The default (recommended)
 * treatment is "tinted": a soft surface with a status-colored icon, border,
 * and deepened (AA-contrast) text. `destructive` aliases the error severity.
 *
 * An optional leading icon is supported via the `[&>svg]` selectors (place an
 * svg as the first child, e.g. a lucide-react icon at h-5 w-5).
 */
const alertVariants = cva(
  "tri-relative tri-flex tri-w-full tri-items-start tri-gap-3 tri-rounded-md tri-border tri-px-4 tri-py-3.5 tri-text-sm tri-leading-snug [&>svg]:tri-mt-px [&>svg]:tri-h-5 [&>svg]:tri-w-5 [&>svg]:tri-shrink-0 [&>svg]:tri-text-current",
  {
    variants: {
      variant: {
        default: "tri-border-[var(--tri-border)] tri-bg-background tri-text-foreground",
        // Tinted (recommended) — soft background, status border, deepened text for AA contrast
        info: "tri-border-[#1D73BF] tri-bg-[#ECF6FF] tri-text-[#0F4F87]",
        success: "tri-border-[#2E7D32] tri-bg-[#EAF4EA] tri-text-[#1F5E22]",
        warning: "tri-border-[#D14900] tri-bg-[#FDF0E2] tri-text-[#D14900]",
        error: "tri-border-[#EB0000] tri-bg-[#FFECEC] tri-text-[#A1242C]",
        // Alias of error
        destructive: "tri-border-[#EB0000] tri-bg-[#FFECEC] tri-text-[#A1242C]",
        // Filled — solid status surface, white text (high-priority system banners)
        "info-filled": "tri-border-[#1D73BF] tri-bg-[#1D73BF] tri-text-white",
        "success-filled": "tri-border-[#2E7D32] tri-bg-[#2E7D32] tri-text-white",
        "warning-filled": "tri-border-[#D14900] tri-bg-[#D14900] tri-text-white",
        "error-filled": "tri-border-[#EB0000] tri-bg-[#EB0000] tri-text-white",
        // Outlined — transparent surface, status border + deepened text (quiet inline notes)
        "info-outline": "tri-border-[#1D73BF] tri-bg-transparent tri-text-[#0F4F87]",
        "success-outline": "tri-border-[#2E7D32] tri-bg-transparent tri-text-[#1F5E22]",
        "warning-outline": "tri-border-[#D14900] tri-bg-transparent tri-text-[#D14900]",
        "error-outline": "tri-border-[#EB0000] tri-bg-transparent tri-text-[#A1242C]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("tri-mb-0.5 tri-font-semibold tri-leading-snug", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tri-min-w-0 tri-flex-1 tri-text-sm tri-leading-snug [&_p]:tri-leading-snug", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

/**
 * Inline alert action button (the DS `.act`). Uppercase, `1px solid currentColor`
 * border so it inherits the alert's status color; on filled variants the border
 * softens to a translucent white via the `onFilled` flag.
 */
const AlertAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { onFilled?: boolean }
>(({ className, onFilled = false, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      "tri-cursor-pointer tri-rounded-sm tri-border tri-bg-transparent tri-px-2.5 tri-py-1 tri-text-xs tri-font-semibold tri-uppercase tri-tracking-[0.04em] tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2",
      onFilled ? "tri-border-white/70 tri-text-current" : "tri-border-current tri-text-current",
      className
    )}
    {...props}
  />
))
AlertAction.displayName = "AlertAction"

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
