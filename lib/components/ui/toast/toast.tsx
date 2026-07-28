import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Check, Info, X } from "lucide-react"

import { cn } from "../utils"
import { useToast } from "../use-toast"

/**
 * TRI toast. Per the design-system Snackbar & toast preview: light toast cards
 * with a 1px border, rounded-lg corners, and a soft elevation shadow. The
 * `info` variant additionally tints toward the sky snackbar treatment. Status
 * variants color the leading icon / accent (success / error / info).
 */

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "tri-fixed tri-bottom-0 tri-right-0 tri-z-[100] tri-flex tri-max-h-screen tri-w-full tri-flex-col-reverse tri-gap-2 tri-p-4 sm:tri-bottom-4 sm:tri-right-4 sm:tri-top-auto sm:tri-flex-col sm:tri-gap-3 md:tri-max-w-[400px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "tri-group tri-pointer-events-auto tri-relative tri-flex tri-w-full tri-items-start tri-gap-3 tri-overflow-hidden tri-rounded-lg tri-border tri-p-3.5 tri-pr-9 tri-shadow-lg tri-transition-all data-[swipe=cancel]:tri-translate-x-0 data-[swipe=end]:tri-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:tri-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:tri-transition-none data-[state=open]:tri-animate-in data-[state=closed]:tri-animate-out data-[swipe=end]:tri-animate-out data-[state=closed]:tri-fade-out-80 data-[state=closed]:tri-slide-out-to-right-full data-[state=open]:tri-slide-in-from-bottom-full sm:data-[state=open]:tri-slide-in-from-right-full",
  {
    variants: {
      variant: {
        default: "tri-border tri-bg-background tri-text-foreground",
        success: "tri-border tri-bg-background tri-text-foreground",
        error: "tri-border tri-bg-background tri-text-foreground",
        warning: "tri-border tri-bg-background tri-text-foreground",
        info: "tri-border-[#cfe2f3] tri-bg-info-bg tri-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
))
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> & {
    /** `danger` = destructive (#c93030); `muted` = low-emphasis secondary action. */
    variant?: "default" | "danger" | "muted"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "tri-inline-flex tri-shrink-0 tri-cursor-pointer tri-items-center tri-justify-center tri-rounded-sm tri-border-none tri-bg-transparent tri-p-0 tri-text-xs tri-font-semibold tri-uppercase tri-tracking-[0.04em] tri-ring-offset-background tri-transition-colors hover:tri-underline focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring disabled:tri-pointer-events-none disabled:tri-opacity-50",
      variant === "default" && "tri-text-info",
      variant === "danger" && "tri-text-[#c93030]",
      variant === "muted" && "tri-text-muted-foreground",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "tri-absolute tri-right-2.5 tri-top-2.5 tri-rounded-sm tri-p-0.5 tri-text-muted-foreground tri-opacity-70 tri-transition-opacity hover:tri-text-foreground hover:tri-opacity-100 focus:tri-opacity-100 focus:tri-outline-none focus:tri-ring-2 focus:tri-ring-ring",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="tri-h-3.5 tri-w-3.5" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("tri-text-sm tri-font-semibold tri-text-foreground", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("tri-text-[13px] tri-leading-snug tri-text-muted-foreground", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/**
 * Rounded status-icon chip shown at the leading edge of a toast, matching the
 * tinted icon badges in the Snackbar & toast preview.
 */
const toastIconVariants = cva(
  "tri-flex tri-h-8 tri-w-8 tri-shrink-0 tri-items-center tri-justify-center tri-rounded-full [&_svg]:tri-h-4 [&_svg]:tri-w-4",
  {
    variants: {
      variant: {
        default: "tri-bg-muted tri-text-muted-foreground",
        success: "tri-bg-success-bg tri-text-[#256628]",
        error: "tri-bg-error-bg tri-text-[#c93030]",
        warning: "tri-bg-[#FDF0E2] tri-text-[#c45800]",
        info: "tri-bg-[#ECF6FF] tri-text-[#155a96]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const toastIcons = {
  success: Check,
  error: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
} as const

const ToastIcon = ({
  variant,
}: {
  variant?: VariantProps<typeof toastIconVariants>["variant"]
}) => {
  if (!variant || variant === "default") return null
  const Icon = toastIcons[variant]
  return (
    <span className={cn(toastIconVariants({ variant }))} aria-hidden>
      <Icon strokeWidth={variant === "success" ? 2.5 : 2} />
    </span>
  )
}
ToastIcon.displayName = "ToastIcon"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<
  React.ComponentPropsWithoutRef<typeof ToastAction>
>

/**
 * Drop-in toast renderer. Mount once near the app root; it subscribes to the
 * shared toast store via `useToast` and renders queued toasts in the bottom-
 * right viewport with a leading status icon, title, description, and actions.
 */
function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <ToastIcon variant={variant} />
            <div className="tri-grid tri-flex-1 tri-gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  Toaster,
  toastVariants,
  toastIconVariants,
}
