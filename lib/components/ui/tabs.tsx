import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "./utils"

/**
 * TRI Tabs. Per the design-system Tabs preview, the recommended treatment is
 * an underline list with an ink (#0B0B0D) active indicator. The triggers sit on
 * a hairline bottom border (#e5e5e5); the active trigger shows a 2px ink
 * underline and ink text, inactive triggers are muted (#737373).
 */
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex w-full items-center gap-0 overflow-x-auto border-b border-border",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-4 py-2.5 text-[13px] font-medium leading-none text-muted-foreground transition-colors",
      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:text-[#d4d4d4]",
      "data-[state=active]:border-primary data-[state=active]:text-foreground",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * Pill-style count badge for use inside a TabsTrigger, matching the preview's
 * `.count` chip.
 */
const TabsTriggerCount = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "rounded-pill bg-[#eeeeee] px-[7px] py-px text-[11px] font-semibold leading-normal text-[#525252]",
      className
    )}
    {...props}
  />
))
TabsTriggerCount.displayName = "TabsTriggerCount"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsTriggerCount, TabsContent }
