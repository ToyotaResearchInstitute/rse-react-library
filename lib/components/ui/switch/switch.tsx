import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../utils"

/**
 * TRI switch. Per the design-system Selection-controls preview, Black (ink)
 * is the Recommended accent. Track 38x22px pill; off #d4d4d4, on ink;
 * white 18px thumb slides 16px. `color` switches the on-state accent to the
 * brand-red or blue alternatives.
 */
const switchColors = {
  ink: "data-[state=checked]:tri-bg-primary",
  brand: "data-[state=checked]:tri-bg-brand",
  blue: "data-[state=checked]:tri-bg-info",
} as const

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    /** On-state accent color. Ink (default), brand red, or blue. */
    color?: "ink" | "brand" | "blue"
  }
>(({ className, color = "ink", ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "tri-peer tri-inline-flex tri-h-[22px] tri-w-[38px] tri-shrink-0 tri-cursor-pointer tri-items-center tri-rounded-pill tri-border tri-border-transparent tri-ring-offset-background tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-cursor-not-allowed disabled:tri-opacity-50 data-[state=unchecked]:tri-bg-[var(--tri-border-hover)] data-[disabled]:tri-bg-[#eeeeee]",
      switchColors[color],
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "tri-pointer-events-none tri-block tri-h-[18px] tri-w-[18px] tri-rounded-pill tri-bg-white tri-shadow-[0_1px_3px_rgba(0,0,0,0.18)] tri-ring-0 tri-transition-transform data-[state=checked]:tri-translate-x-[16px] data-[state=unchecked]:tri-translate-x-[2px] data-[disabled]:tri-bg-[#fafafa]"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
