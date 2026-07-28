import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI checkbox. Per the design-system Selection-controls preview: 18px box,
 * 1.5px border, rounded-xs. Ink (black) is the recommended accent; `color`
 * switches to the brand-red or blue alternatives. Indeterminate renders a
 * horizontal dash (not a check), per the DS.
 */
const checkboxColors = {
  ink: "data-[state=checked]:tri-border-primary data-[state=checked]:tri-bg-primary data-[state=indeterminate]:tri-border-primary data-[state=indeterminate]:tri-bg-primary",
  brand:
    "data-[state=checked]:tri-border-brand data-[state=checked]:tri-bg-brand data-[state=indeterminate]:tri-border-brand data-[state=indeterminate]:tri-bg-brand",
  blue: "data-[state=checked]:tri-border-info data-[state=checked]:tri-bg-info data-[state=indeterminate]:tri-border-info data-[state=indeterminate]:tri-bg-info",
} as const

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    /** Accent color. Ink (default), brand red, or blue. */
    color?: "ink" | "brand" | "blue"
  }
>(({ className, color = "ink", checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    checked={checked}
    className={cn(
      "tri-peer tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-rounded-xs tri-border-[1.5px] tri-border-[var(--tri-border-strong)] tri-bg-background tri-text-primary-foreground tri-ring-offset-background tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-cursor-not-allowed disabled:tri-border-input disabled:tri-bg-[var(--tri-bg-subtle)] disabled:tri-opacity-60",
      checkboxColors[color],
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("tri-flex tri-items-center tri-justify-center tri-text-current")}
    >
      {checked === "indeterminate" ? (
        <Minus className="tri-h-4 tri-w-4" strokeWidth={3} />
      ) : (
        <Check className="tri-h-4 tri-w-4" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
