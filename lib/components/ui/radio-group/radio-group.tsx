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
    className={cn("grid gap-2", className)}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioColors = {
  ink: "text-primary data-[state=checked]:border-primary",
  brand: "text-brand data-[state=checked]:border-brand",
  blue: "text-info data-[state=checked]:border-info",
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
      "aspect-square h-[18px] w-[18px] shrink-0 rounded-pill border-[1.5px] border-[var(--border-strong)] bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-input disabled:bg-[#fafafa] disabled:opacity-50",
      radioColors[color],
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-[9px] w-[9px] fill-current text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
