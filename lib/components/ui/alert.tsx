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
        // Tinted — soft background, status border, deepened text for AA contrast
        info: "border-[#1D73BF] bg-[#ECF6FF] text-[#0F4F87]",
        success: "border-[#2E7D32] bg-[#EAF4EA] text-[#1F5E22]",
        warning: "border-[#D14900] bg-[#FDF0E2] text-[#D14900]",
        error: "border-[#EB0000] bg-[#FFECEC] text-[#A1242C]",
        // Alias of error
        destructive: "border-[#EB0000] bg-[#FFECEC] text-[#A1242C]",
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
    className={cn("text-sm leading-snug [&_p]:leading-snug", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }
