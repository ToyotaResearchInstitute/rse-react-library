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
  ink: "data-[state=checked]:bg-primary",
  brand: "data-[state=checked]:bg-brand",
  blue: "data-[state=checked]:bg-info",
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
      "peer inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-pill border border-transparent ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-[var(--border-hover)] data-[disabled]:bg-[#eeeeee]",
      switchColors[color],
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[18px] w-[18px] rounded-pill bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] ring-0 transition-transform data-[state=checked]:translate-x-[16px] data-[state=unchecked]:translate-x-[2px] data-[disabled]:bg-[#fafafa]"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
