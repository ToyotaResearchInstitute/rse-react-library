import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

/**
 * TRI Tooltip. Per the design-system Tooltips preview: a small label that
 * appears on hover / focus to clarify icons. Four styles —
 * dark (default), light, blue, and the sky-blue annotation pill.
 */
const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipVariants = cva(
  "z-50 max-w-xs overflow-hidden text-xs font-medium shadow-md data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        // Dark · default — #0B0B0D / white, 6px radius, 6×10 padding
        dark: "rounded-sm bg-[#0B0B0D] px-2.5 py-1.5 text-white",
        // Light · info — white surface with hairline border
        light: "rounded-sm border border-[var(--border)] bg-background px-2.5 py-1.5 text-foreground",
        // Blue · action hint
        blue: "rounded-sm bg-[#1D73BF] px-2.5 py-1.5 text-white",
        // Annotation · pill — sky-blue, always-on label
        annotation: "rounded-full bg-[#A9D6FF] px-[11px] py-[5px] text-[13px] text-[#0B0B0D]",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
)

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ variant }), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipVariants,
}
