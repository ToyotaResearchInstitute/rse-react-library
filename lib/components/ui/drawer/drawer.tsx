import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Drawer (side sheet). Built on @radix-ui/react-dialog. Per the
 * design-system Drawer preview: a sliding panel over a dimmed, blurred scrim.
 * Defaults to the right placement; `side` supports right / left / top / bottom.
 */
const Drawer = DialogPrimitive.Root

const DrawerTrigger = DialogPrimitive.Trigger

const DrawerPortal = DialogPrimitive.Portal

const DrawerClose = DialogPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "tri-fixed tri-inset-0 tri-z-50 tri-bg-[var(--tri-overlay)] tri-backdrop-blur-sm data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=open]:tri-fade-in-0",
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

const drawerVariants = cva(
  "tri-fixed tri-z-50 tri-flex tri-flex-col tri-gap-0 tri-bg-background tri-shadow-lg tri-transition tri-ease-in-out data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-duration-300 data-[state=open]:tri-duration-300",
  {
    variants: {
      side: {
        right:
          "tri-inset-y-0 tri-right-0 tri-h-full tri-w-3/4 tri-max-w-md tri-border-l data-[state=closed]:tri-slide-out-to-right data-[state=open]:tri-slide-in-from-right",
        left: "tri-inset-y-0 tri-left-0 tri-h-full tri-w-3/4 tri-max-w-md tri-border-r data-[state=closed]:tri-slide-out-to-left data-[state=open]:tri-slide-in-from-left",
        top: "tri-inset-x-0 tri-top-0 tri-rounded-b-[14px] tri-border-b data-[state=closed]:tri-slide-out-to-top data-[state=open]:tri-slide-in-from-top",
        bottom:
          "tri-inset-x-0 tri-bottom-0 tri-rounded-t-[14px] tri-border-t data-[state=closed]:tri-slide-out-to-bottom data-[state=open]:tri-slide-in-from-bottom",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  /** Hide the built-in top-right close button. */
  hideClose?: boolean
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ side = "right", className, children, hideClose = false, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(drawerVariants({ side }), className)}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className="tri-absolute tri-right-4 tri-top-4 tri-rounded-sm tri-text-muted-foreground tri-transition-colors hover:tri-text-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-pointer-events-none">
          <X className="tri-h-[18px] tri-w-[18px]" />
          <span className="tri-sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = DialogPrimitive.Content.displayName

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tri-flex tri-flex-shrink-0 tri-items-center tri-justify-between tri-border-b tri-border-[var(--tri-border)] tri-px-4 tri-py-3.5",
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tri-flex tri-flex-shrink-0 tri-justify-end tri-gap-2 tri-border-t tri-border-[var(--tri-border)] tri-bg-[var(--tri-bg-subtle,#fafafa)] tri-px-4 tri-py-3",
      className
    )}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("tri-text-sm tri-font-semibold tri-text-foreground", className)}
    {...props}
  />
))
DrawerTitle.displayName = DialogPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("tri-text-[13px] tri-leading-snug tri-text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  drawerVariants,
}
