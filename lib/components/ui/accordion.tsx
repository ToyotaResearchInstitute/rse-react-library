import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { Minus, Plus } from "lucide-react"

import { cn } from "./utils"

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
  "mb-2 rounded-md border border-border bg-background last:mb-0 transition-colors",
  {
    variants: {
      variant: {
        default:
          "data-[state=open]:border-primary data-[state=open]:bg-muted",
        error: "data-[state=open]:border-brand-deep data-[state=open]:bg-error-bg",
        info: "data-[state=open]:border-info data-[state=open]:bg-info-bg",
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
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
      <span className="relative h-[18px] w-[18px] shrink-0 text-muted-foreground">
        <Plus className="absolute inset-0 h-[18px] w-[18px] transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
        <Minus className="absolute inset-0 h-[18px] w-[18px] -rotate-90 opacity-0 transition-all duration-200 group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100" />
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
      "overflow-hidden text-[13px] leading-relaxed text-muted-foreground",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className={cn("px-4 pb-4 pt-0")}>{children}</div>
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
