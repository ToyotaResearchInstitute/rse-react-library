import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { Minus, Plus } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Accordion. Per the design-system Accordion preview, the recommended style
 * is the "separated" card treatment: each item is a bordered, rounded card on a
 * white background with hairline (#e5e5e5) borders. A lucide plus icon sits on
 * the right of each trigger and switches to a minus icon when the item is open.
 *
 * Items support a `variant` prop for three color treatments:
 * - `default` — neutral hairline border on a white surface (recommended)
 * - `red` — red border on a soft red-tinted surface
 * - `blue` — blue border on a soft blue-tinted surface
 */
const Accordion = AccordionPrimitive.Root

const accordionItemVariants = cva(
  // Closed items share the neutral treatment; the variant color only appears
  // once the item is open.
  "tri-mb-2 tri-rounded-md tri-border tri-border-border tri-bg-background last:tri-mb-0 tri-transition-colors",
  {
    variants: {
      variant: {
        default:
          "data-[state=open]:tri-border-primary data-[state=open]:tri-bg-muted",
        error: "data-[state=open]:tri-border-brand-deep data-[state=open]:tri-bg-error-bg",
        info: "data-[state=open]:tri-border-info data-[state=open]:tri-bg-info-bg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
    VariantProps<typeof accordionItemVariants>
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="tri-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "tri-group tri-flex tri-flex-1 tri-items-center tri-justify-between tri-gap-3 tri-px-4 tri-py-3.5 tri-text-left tri-text-sm tri-font-medium tri-text-foreground tri-transition-colors",
        "focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
      <span className="tri-relative tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-text-muted-foreground">
        <Plus className="tri-absolute tri-inset-0 tri-h-[18px] tri-w-[18px] tri-transition-all tri-duration-200 group-data-[state=open]:tri-rotate-90 group-data-[state=open]:tri-opacity-0" />
        <Minus className="tri-absolute tri-inset-0 tri-h-[18px] tri-w-[18px] -tri-rotate-90 tri-opacity-0 tri-transition-all tri-duration-200 group-data-[state=open]:tri-rotate-0 group-data-[state=open]:tri-opacity-100" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "tri-overflow-hidden tri-text-[13px] tri-leading-relaxed tri-text-muted-foreground",
      "data-[state=closed]:tri-animate-accordion-up data-[state=open]:tri-animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className={cn("tri-px-4 tri-pb-4 tri-pt-0")}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionItemVariants,
}
