import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "../utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "tri-flex tri-h-9 tri-w-full tri-items-center tri-justify-between tri-rounded-sm tri-border tri-border-[var(--tri-border-hover)] tri-bg-background tri-px-3 tri-py-2 tri-text-sm tri-text-foreground tri-ring-offset-background tri-transition-colors data-[placeholder]:tri-text-muted-foreground hover:tri-border-[var(--tri-border-strong)] focus:tri-border-foreground focus:tri-outline-none focus:tri-ring-2 focus:tri-ring-ring focus:tri-ring-offset-2 disabled:tri-cursor-not-allowed disabled:tri-border-input disabled:tri-bg-[var(--tri-bg-subtle)] disabled:tri-opacity-70 [&>span]:tri-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="tri-h-4 tri-w-4 tri-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "tri-flex tri-cursor-default tri-items-center tri-justify-center tri-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="tri-h-4 tri-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "tri-flex tri-cursor-default tri-items-center tri-justify-center tri-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="tri-h-4 tri-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "tri-relative tri-z-50 tri-max-h-[--radix-select-content-available-height] tri-min-w-[8rem] tri-overflow-y-auto tri-overflow-x-hidden tri-rounded-md tri-border tri-bg-popover tri-text-popover-foreground tri-shadow-lg data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=open]:tri-fade-in-0 data-[state=closed]:tri-zoom-out-95 data-[state=open]:tri-zoom-in-95 data-[side=bottom]:tri-slide-in-from-top-2 data-[side=left]:tri-slide-in-from-right-2 data-[side=right]:tri-slide-in-from-left-2 data-[side=top]:tri-slide-in-from-bottom-2 tri-origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:tri-translate-y-1 data-[side=left]:-tri-translate-x-1 data-[side=right]:tri-translate-x-1 data-[side=top]:-tri-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "tri-p-1",
          position === "popper" &&
            "tri-h-[var(--radix-select-trigger-height)] tri-w-full tri-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("tri-py-1.5 tri-pl-8 tri-pr-2 tri-text-sm tri-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    /** Right-aligned monospace meta tag (e.g. "live", "staging"). */
    meta?: React.ReactNode
  }
>(({ className, children, meta, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "tri-relative tri-flex tri-w-full tri-cursor-pointer tri-select-none tri-items-center tri-rounded-sm tri-py-2 tri-pl-8 tri-pr-2 tri-text-sm tri-text-foreground tri-outline-none focus:tri-bg-brand-sky focus:tri-text-foreground data-[state=checked]:tri-bg-brand-sky data-[disabled]:tri-pointer-events-none data-[disabled]:tri-cursor-not-allowed data-[disabled]:tri-opacity-50",
      className
    )}
    {...props}
  >
    <span className="tri-absolute tri-left-2 tri-flex tri-h-3.5 tri-w-3.5 tri-items-center tri-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="tri-h-4 tri-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    {meta != null && (
      <span className="tri-ml-auto tri-pl-4 tri-font-mono tri-text-[11px] tri-text-[var(--tri-neutral-300)]">
        {meta}
      </span>
    )}
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-tri-mx-1 tri-my-1 tri-h-px tri-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
