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
  underline: "tri-inline-flex tri-w-full tri-items-center tri-gap-0 tri-overflow-x-auto tri-border-b tri-border-border",
  pills: "tri-inline-flex tri-items-center tri-gap-1.5",
  segmented: "tri-inline-flex tri-items-center tri-gap-0.5 tri-rounded-lg tri-bg-muted tri-p-1",
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
    underline: "data-[state=active]:tri-border-primary data-[state=active]:tri-text-foreground",
    pill: "data-[state=active]:tri-bg-primary data-[state=active]:tri-text-primary-foreground",
  },
  brand: {
    underline: "data-[state=active]:tri-border-brand data-[state=active]:tri-text-brand",
    pill: "data-[state=active]:tri-bg-brand data-[state=active]:tri-text-brand-foreground",
  },
  blue: {
    underline: "data-[state=active]:tri-border-info data-[state=active]:tri-text-info",
    pill: "data-[state=active]:tri-bg-info data-[state=active]:tri-text-white",
  },
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant, color } = React.useContext(TabsStyleContext)
  const base =
    "tri-inline-flex tri-items-center tri-gap-2 tri-whitespace-nowrap tri-font-medium tri-leading-none tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-pointer-events-none disabled:tri-text-[#d4d4d4]"
  const byVariant: Record<TabsVariant, string> = {
    underline: cn(
      "-tri-mb-px tri-border-b-2 tri-border-transparent tri-px-4 tri-py-2.5 tri-text-[13px] tri-text-muted-foreground hover:tri-text-foreground",
      activeAccent[color].underline
    ),
    pills: cn(
      "tri-cursor-pointer tri-rounded-pill tri-px-3.5 tri-py-1.5 tri-text-[13px] tri-text-[#404040] hover:tri-bg-[#f5f5f5]",
      activeAccent[color].pill
    ),
    segmented:
      "tri-cursor-pointer tri-rounded-sm tri-px-3.5 tri-py-1.5 tri-text-[13px] tri-text-[#525252] data-[state=active]:tri-bg-white data-[state=active]:tri-text-foreground data-[state=active]:tri-shadow-sm",
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
      "tri-rounded-pill tri-bg-[#eeeeee] tri-px-[7px] tri-py-px tri-text-[11px] tri-font-semibold tri-leading-normal tri-text-[#525252]",
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
      "tri-mt-4 tri-text-sm tri-text-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsTriggerCount, TabsContent }
