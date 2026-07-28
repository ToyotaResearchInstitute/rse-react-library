import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Dialog. Per the design-system Dialog preview: a centered modal card
 * (white surface, 12px radius, layered shadow) over a dimmed, blurred scrim.
 * Supports confirmation, form, success-notice, and compact-prompt patterns.
 */
const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
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
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /** Hide the built-in top-right close button. */
    hideClose?: boolean
  }
>(({ className, children, hideClose = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "tri-fixed tri-left-1/2 tri-top-1/2 tri-z-50 tri-grid tri-w-full tri-max-w-[420px] -tri-translate-x-1/2 -tri-translate-y-1/2 tri-gap-4 tri-overflow-hidden tri-rounded-lg tri-border tri-bg-background tri-shadow-lg tri-duration-200 data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[state=closed]:tri-fade-out-0 data-[state=open]:tri-fade-in-0 data-[state=closed]:tri-zoom-out-95 data-[state=open]:tri-zoom-in-95 data-[state=closed]:tri-slide-out-to-left-1/2 data-[state=closed]:tri-slide-out-to-top-[48%] data-[state=open]:tri-slide-in-from-left-1/2 data-[state=open]:tri-slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className="tri-absolute tri-right-4 tri-top-4 tri-rounded-sm tri-text-muted-foreground tri-opacity-100 tri-transition-colors hover:tri-text-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 disabled:tri-pointer-events-none">
          <X className="tri-h-[18px] tri-w-[18px]" />
          <span className="tri-sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tri-flex tri-flex-col tri-space-y-1 tri-px-5 tri-pb-3 tri-pt-[18px] tri-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "tri-flex tri-justify-end tri-gap-2 tri-border-t tri-border-[var(--tri-border)] tri-bg-[var(--tri-bg-subtle,#fafafa)] tri-px-5 tri-py-3.5 sm:tri-flex-row",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "tri-text-base tri-font-semibold tri-leading-tight tri-text-foreground",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("tri-text-[13px] tri-leading-snug tri-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
