import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "../utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "tri-z-50 tri-w-72 tri-rounded-md tri-border tri-bg-popover tri-p-4 tri-text-popover-foreground tri-shadow-md tri-outline-none data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=open]:tri-fade-in-0 data-[state=closed]:tri-zoom-out-95 data-[state=open]:tri-zoom-in-95 data-[side=bottom]:tri-slide-in-from-top-2 data-[side=left]:tri-slide-in-from-right-2 data-[side=right]:tri-slide-in-from-left-2 data-[side=top]:tri-slide-in-from-bottom-2 tri-origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
