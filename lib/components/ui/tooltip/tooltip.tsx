import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

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

/** Arrow fill matched to each tooltip variant's surface. */
const arrowFill = {
  dark: "fill-[#0B0B0D]",
  light: "fill-background",
  blue: "fill-[#1D73BF]",
  annotation: "fill-[#A9D6FF]",
} as const

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {
  /** Render the pointer tail. Defaults to true. */
  showArrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, sideOffset = 6, showArrow = true, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ variant }), className)}
      {...props}
    >
      {props.children}
      {showArrow && (
        <TooltipPrimitive.Arrow
          className={cn("size-2.5", arrowFill[variant ?? "dark"])}
        />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

/**
 * TRI Annotation tooltip — the always-visible sky-blue pill used for figures,
 * onboarding walkthroughs, and product tours (NOT hover-gated). Anchor it near
 * a target inside a `relative` container and choose the tail direction. Per the
 * DS `.anno` spec: #A9D6FF pill, 99px radius, with a 6px CSS-triangle tail.
 */
export interface AnnotationTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edge the pointer tail sits on. */
  tail?: "below" | "above" | "left" | "right"
}

const tailClasses = {
  // pointer below the bubble (bubble sits above the target)
  below:
    "after:left-1/2 after:top-full after:-translate-x-1/2 after:border-t-[#A9D6FF] after:border-b-0",
  // pointer above the bubble (bubble sits below the target)
  above:
    "after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-b-[#A9D6FF] after:border-t-0",
  // pointer on the left (bubble sits to the right of the target)
  left: "after:right-full after:top-1/2 after:-translate-y-1/2 after:border-r-[#A9D6FF] after:border-l-0",
  // pointer on the right (bubble sits to the left of the target)
  right:
    "after:left-full after:top-1/2 after:-translate-y-1/2 after:border-l-[#A9D6FF] after:border-r-0",
} as const

const AnnotationTooltip = React.forwardRef<
  HTMLDivElement,
  AnnotationTooltipProps
>(({ className, tail = "below", children, ...props }, ref) => (
  <div
    ref={ref}
    role="note"
    className={cn(
      "relative inline-block whitespace-nowrap rounded-full bg-[#A9D6FF] px-[11px] py-[5px] text-[13px] font-medium text-[#0B0B0D] shadow-sm",
      "after:absolute after:h-0 after:w-0 after:border-[6px] after:border-transparent after:content-['']",
      tailClasses[tail],
      className
    )}
    {...props}
  >
    {children}
  </div>
))
AnnotationTooltip.displayName = "AnnotationTooltip"

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  AnnotationTooltip,
  tooltipVariants,
}
