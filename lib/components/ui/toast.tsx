import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Check, Info, X } from "lucide-react"

import { cn } from "./utils"
import { useToast } from "./use-toast"

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
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col sm:gap-3 md:max-w-[400px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-3.5 pr-9 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-right-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border bg-background text-foreground",
        error: "border bg-background text-foreground",
        warning: "border bg-background text-foreground",
        info: "border-[#cfe2f3] bg-info-bg text-foreground",
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
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent p-0 text-xs font-semibold uppercase tracking-[0.04em] ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      variant === "default" && "text-info",
      variant === "danger" && "text-[#c93030]",
      variant === "muted" && "text-muted-foreground",
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
      "absolute right-2.5 top-2.5 rounded-sm p-0.5 text-muted-foreground opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-3.5 w-3.5" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold text-foreground", className)}
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
    className={cn("text-[13px] leading-snug text-muted-foreground", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/**
 * Rounded status-icon chip shown at the leading edge of a toast, matching the
 * tinted icon badges in the Snackbar & toast preview.
 */
const toastIconVariants = cva(
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full [&_svg]:h-4 [&_svg]:w-4",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        success: "bg-success-bg text-[#256628]",
        error: "bg-error-bg text-[#c93030]",
        warning: "bg-[#FDF0E2] text-[#c45800]",
        info: "bg-[#ECF6FF] text-[#155a96]",
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
            <div className="grid flex-1 gap-1">
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
