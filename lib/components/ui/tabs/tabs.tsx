import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../utils"

/**
 * TRI Tabs. Per the design-system Tabs preview, three styles are supported:
 * `underline` (recommended, ink active indicator), `pills` (rounded, filled
 * active), and `segmented` (gray track, white active chip — always neutral).
 * `color` themes the active accent for underline/pills (ink / brand / blue).
 */
type TabsVariant = "underline" | "pills" | "segmented"
type TabsColor = "ink" | "brand" | "blue"

const TabsStyleContext = React.createContext<{
  variant: TabsVariant
  color: TabsColor
}>({ variant: "underline", color: "ink" })

const Tabs = TabsPrimitive.Root

const listVariant: Record<TabsVariant, string> = {
  underline: "inline-flex w-full items-center gap-0 overflow-x-auto border-b border-border",
  pills: "inline-flex items-center gap-1.5",
  segmented: "inline-flex items-center gap-0.5 rounded-lg bg-muted p-1",
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsVariant
    color?: TabsColor
  }
>(({ className, variant = "underline", color = "ink", ...props }, ref) => (
  <TabsStyleContext.Provider value={{ variant, color }}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(listVariant[variant], className)}
      {...props}
    />
  </TabsStyleContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

const activeAccent: Record<TabsColor, { underline: string; pill: string }> = {
  ink: {
    underline: "data-[state=active]:border-primary data-[state=active]:text-foreground",
    pill: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
  },
  brand: {
    underline: "data-[state=active]:border-brand data-[state=active]:text-brand",
    pill: "data-[state=active]:bg-brand data-[state=active]:text-brand-foreground",
  },
  blue: {
    underline: "data-[state=active]:border-info data-[state=active]:text-info",
    pill: "data-[state=active]:bg-info data-[state=active]:text-white",
  },
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant, color } = React.useContext(TabsStyleContext)
  const base =
    "inline-flex items-center gap-2 whitespace-nowrap font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:text-[#d4d4d4]"
  const byVariant: Record<TabsVariant, string> = {
    underline: cn(
      "-mb-px border-b-2 border-transparent px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground",
      activeAccent[color].underline
    ),
    pills: cn(
      "cursor-pointer rounded-pill px-3.5 py-1.5 text-[13px] text-[#404040] hover:bg-[#f5f5f5]",
      activeAccent[color].pill
    ),
    segmented:
      "cursor-pointer rounded-sm px-3.5 py-1.5 text-[13px] text-[#525252] data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  }
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(base, byVariant[variant], className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/** Pill-style count badge for use inside a TabsTrigger (the `.count` chip). */
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
