import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

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
  "relative flex w-full items-start gap-3 rounded-md border px-4 py-3.5 text-sm leading-snug [&>svg]:mt-px [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-[var(--border)] bg-background text-foreground",
        // Tinted (recommended) — soft background, status border, deepened text for AA contrast
        info: "border-[#1D73BF] bg-[#ECF6FF] text-[#0F4F87]",
        success: "border-[#2E7D32] bg-[#EAF4EA] text-[#1F5E22]",
        warning: "border-[#D14900] bg-[#FDF0E2] text-[#D14900]",
        error: "border-[#EB0000] bg-[#FFECEC] text-[#A1242C]",
        // Alias of error
        destructive: "border-[#EB0000] bg-[#FFECEC] text-[#A1242C]",
        // Filled — solid status surface, white text (high-priority system banners)
        "info-filled": "border-[#1D73BF] bg-[#1D73BF] text-white",
        "success-filled": "border-[#2E7D32] bg-[#2E7D32] text-white",
        "warning-filled": "border-[#D14900] bg-[#D14900] text-white",
        "error-filled": "border-[#EB0000] bg-[#EB0000] text-white",
        // Outlined — transparent surface, status border + deepened text (quiet inline notes)
        "info-outline": "border-[#1D73BF] bg-transparent text-[#0F4F87]",
        "success-outline": "border-[#2E7D32] bg-transparent text-[#1F5E22]",
        "warning-outline": "border-[#D14900] bg-transparent text-[#D14900]",
        "error-outline": "border-[#EB0000] bg-transparent text-[#A1242C]",
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
    className={cn("mb-0.5 font-semibold leading-snug", className)}
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
    className={cn("min-w-0 flex-1 text-sm leading-snug [&_p]:leading-snug", className)}
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
      "cursor-pointer rounded-sm border bg-transparent px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      onFilled ? "border-white/70 text-current" : "border-current text-current",
      className
    )}
    {...props}
  />
))
AlertAction.displayName = "AlertAction"

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
