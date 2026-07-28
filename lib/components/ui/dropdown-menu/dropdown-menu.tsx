import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Dropdown / Action menu. Per the design-system "Select & menu → Action menu"
 * preview: a kebab (⋮) trigger opens a rounded (8px), hairline-bordered white
 * panel (min-width 200px) with layered elevation. Supports grouped section
 * labels, items with leading icons and right-aligned keyboard-shortcut meta,
 * separators, checkbox/radio items, submenus, and a `danger` item treatment
 * (#c93030). Highlighted rows use the brand-sky (#ECF6FF) surface.
 */
const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "tri-flex tri-cursor-pointer tri-select-none tri-items-center tri-gap-2.5 tri-rounded-sm tri-px-3 tri-py-2 tri-text-sm tri-text-foreground tri-outline-none focus:tri-bg-brand-sky data-[state=open]:tri-bg-brand-sky [&_svg]:tri-size-4 [&_svg]:tri-shrink-0 [&_svg]:tri-text-[var(--tri-neutral-600)]",
      inset && "tri-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="tri-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "tri-z-50 tri-min-w-[200px] tri-overflow-hidden tri-rounded-lg tri-border tri-border-border tri-bg-background tri-p-1 tri-shadow-[0_8px_24px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)] data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=open]:tri-fade-in-0 data-[state=closed]:tri-zoom-out-95 data-[state=open]:tri-zoom-in-95",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "tri-z-50 tri-min-w-[200px] tri-overflow-hidden tri-rounded-lg tri-border tri-border-border tri-bg-background tri-p-1 tri-shadow-[0_8px_24px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)] data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=open]:tri-fade-in-0 data-[state=closed]:tri-zoom-out-95 data-[state=open]:tri-zoom-in-95",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    /** `danger` renders the destructive (#c93030) treatment. */
    variant?: "default" | "danger"
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "tri-relative tri-flex tri-cursor-pointer tri-select-none tri-items-center tri-gap-2.5 tri-rounded-sm tri-px-3 tri-py-2 tri-text-sm tri-text-foreground tri-outline-none tri-transition-colors focus:tri-bg-brand-sky data-[disabled]:tri-pointer-events-none data-[disabled]:tri-text-[var(--tri-neutral-300)] [&_svg]:tri-size-4 [&_svg]:tri-shrink-0 [&_svg]:tri-text-[var(--tri-neutral-600)]",
      inset && "tri-pl-8",
      variant === "danger" &&
        "tri-text-[#c93030] focus:tri-bg-[#ffecec] focus:tri-text-[#c93030] [&_svg]:tri-text-[#c93030]",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "tri-relative tri-flex tri-cursor-pointer tri-select-none tri-items-center tri-gap-2.5 tri-rounded-sm tri-py-2 tri-pl-8 tri-pr-3 tri-text-sm tri-text-foreground tri-outline-none tri-transition-colors focus:tri-bg-brand-sky data-[disabled]:tri-pointer-events-none data-[disabled]:tri-text-[var(--tri-neutral-300)]",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="tri-absolute tri-left-3 tri-flex tri-size-3.5 tri-items-center tri-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="tri-size-3.5" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "tri-relative tri-flex tri-cursor-pointer tri-select-none tri-items-center tri-gap-2.5 tri-rounded-sm tri-py-2 tri-pl-8 tri-pr-3 tri-text-sm tri-text-foreground tri-outline-none tri-transition-colors focus:tri-bg-brand-sky data-[disabled]:tri-pointer-events-none data-[disabled]:tri-text-[var(--tri-neutral-300)]",
      className
    )}
    {...props}
  >
    <span className="tri-absolute tri-left-3 tri-flex tri-size-3.5 tri-items-center tri-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="tri-size-2 tri-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "tri-px-3 tri-pb-1 tri-pt-2 tri-font-mono tri-text-[10px] tri-font-semibold tri-uppercase tri-tracking-[0.08em] tri-text-[var(--tri-neutral-300)]",
      inset && "tri-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("tri-my-1 tri-h-px tri-bg-[var(--tri-neutral-150)]", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/** Right-aligned keyboard-shortcut hint (the DS `.meta` element). */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "tri-ml-auto tri-font-mono tri-text-[11px] tri-tracking-normal tri-text-[var(--tri-neutral-300)]",
      className
    )}
    {...props}
  />
)
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
