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
  "tri-z-50 tri-max-w-xs tri-overflow-hidden tri-text-xs tri-font-medium tri-shadow-md data-[state=delayed-open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=delayed-open]:tri-fade-in-0 data-[state=closed]:tri-zoom-out-95 data-[state=delayed-open]:tri-zoom-in-95 data-[side=bottom]:tri-slide-in-from-top-2 data-[side=left]:tri-slide-in-from-right-2 data-[side=right]:tri-slide-in-from-left-2 data-[side=top]:tri-slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        // Dark · default — #0B0B0D / white, 6px radius, 6×10 padding
        dark: "tri-rounded-sm tri-bg-[#0B0B0D] tri-px-2.5 tri-py-1.5 tri-text-white",
        // Light · info — white surface with hairline border
        light: "tri-rounded-sm tri-border tri-border-[var(--tri-border)] tri-bg-background tri-px-2.5 tri-py-1.5 tri-text-foreground",
        // Blue · action hint
        blue: "tri-rounded-sm tri-bg-[#1D73BF] tri-px-2.5 tri-py-1.5 tri-text-white",
        // Annotation · pill — sky-blue, always-on label
        annotation: "tri-rounded-full tri-bg-[#A9D6FF] tri-px-[11px] tri-py-[5px] tri-text-[13px] tri-text-[#0B0B0D]",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
)

/** Arrow fill matched to each tooltip variant's surface. */
const arrowFill = {
  dark: "tri-fill-[#0B0B0D]",
  light: "tri-fill-background",
  blue: "tri-fill-[#1D73BF]",
  annotation: "tri-fill-[#A9D6FF]",
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
          className={cn("tri-size-2.5", arrowFill[variant ?? "dark"])}
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
    "after:tri-left-1/2 after:tri-top-full after:-tri-translate-x-1/2 after:tri-border-t-[#A9D6FF] after:tri-border-b-0",
  // pointer above the bubble (bubble sits below the target)
  above:
    "after:tri-bottom-full after:tri-left-1/2 after:-tri-translate-x-1/2 after:tri-border-b-[#A9D6FF] after:tri-border-t-0",
  // pointer on the left (bubble sits to the right of the target)
  left: "after:tri-right-full after:tri-top-1/2 after:-tri-translate-y-1/2 after:tri-border-r-[#A9D6FF] after:tri-border-l-0",
  // pointer on the right (bubble sits to the left of the target)
  right:
    "after:tri-left-full after:tri-top-1/2 after:-tri-translate-y-1/2 after:tri-border-l-[#A9D6FF] after:tri-border-r-0",
} as const

const AnnotationTooltip = React.forwardRef<
  HTMLDivElement,
  AnnotationTooltipProps
>(({ className, tail = "below", children, ...props }, ref) => (
  <div
    ref={ref}
    role="note"
    className={cn(
      "tri-relative tri-inline-block tri-whitespace-nowrap tri-rounded-full tri-bg-[#A9D6FF] tri-px-[11px] tri-py-[5px] tri-text-[13px] tri-font-medium tri-text-[#0B0B0D] tri-shadow-sm",
      "after:tri-absolute after:tri-h-0 after:tri-w-0 after:tri-border-[6px] after:tri-border-transparent after:tri-content-['']",
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
