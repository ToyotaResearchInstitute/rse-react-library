import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI radio group. Per the design-system Selection-controls preview, Black
 * (ink) is the Recommended accent. 18px circle, 1.5px #a1a1aa border, white
 * bg; selected shows a 9px ink dot. Disabled: border #e5e5e5, bg #fafafa.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("tri-grid tri-gap-2", className)}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioColors = {
  ink: "tri-text-primary data-[state=checked]:tri-border-primary",
  brand: "tri-text-brand data-[state=checked]:tri-border-brand",
  blue: "tri-text-info data-[state=checked]:tri-border-info",
} as const

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    /** Selected accent color. Ink (default), brand red, or blue. */
    color?: "ink" | "brand" | "blue"
  }
>(({ className, color = "ink", ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "tri-aspect-square tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-rounded-pill tri-border-[1.5px] tri-border-[var(--tri-border-strong)] tri-bg-background tri-ring-offset-background tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-cursor-not-allowed disabled:tri-border-input disabled:tri-bg-[#fafafa] disabled:tri-opacity-50",
      radioColors[color],
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="tri-flex tri-items-center tri-justify-center">
      <Circle className="tri-h-[9px] tri-w-[9px] tri-fill-current tri-text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
