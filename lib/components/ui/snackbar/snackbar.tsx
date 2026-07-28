import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Snackbar. Per the design-system "Snackbar & toast" preview, this is the
 * terse, single-line sky-tinted confirmation pill — distinct from the richer
 * Toast status card. Sky surface (#ECF6FF), info-blue text (#1D73BF), 1px
 * #cfe2f3 border, 6px radius, soft elevation, min-width 280px. Supports an
 * optional underlined-uppercase action and an optional dismiss (X).
 */
export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the trailing underlined-uppercase action (e.g. "Undo"). */
  actionLabel?: string
  /** Fired when the action is clicked. */
  onAction?: () => void
  /** Show a trailing dismiss (X) button. */
  onClose?: () => void
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, children, actionLabel, onAction, onClose, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(
        "tri-inline-flex tri-min-w-[280px] tri-items-center tri-gap-3.5 tri-rounded-sm tri-border tri-border-[#cfe2f3] tri-bg-brand-sky tri-px-4 tri-py-3 tri-text-sm tri-font-semibold tri-text-info tri-shadow-lg",
        className
      )}
      {...props}
    >
      <span className="tri-flex-1 tri-text-info">{children}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="tri-cursor-pointer tri-border-none tri-bg-transparent tri-text-[13px] tri-font-semibold tri-uppercase tri-tracking-[0.06em] tri-text-info tri-underline tri-underline-offset-[3px] focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring"
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="tri-inline-flex tri-size-4 tri-shrink-0 tri-cursor-pointer tri-items-center tri-justify-center tri-border-none tri-bg-transparent tri-p-0 tri-text-info focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring"
        >
          <X className="tri-size-4" />
        </button>
      )}
    </div>
  )
)
Snackbar.displayName = "Snackbar"

/**
 * Optional viewport that anchors snackbars to the bottom-center of the nearest
 * positioned ancestor (or the viewport), matching the DS "bottom-anchored
 * snackbar" pattern. Wrap a `Snackbar` in this, or place snackbars yourself.
 */
const SnackbarViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-pointer-events-none tri-fixed tri-inset-x-0 tri-bottom-4 tri-z-[100] tri-flex tri-justify-center [&>*]:tri-pointer-events-auto",
      className
    )}
    {...props}
  />
))
SnackbarViewport.displayName = "SnackbarViewport"

export { Snackbar, SnackbarViewport }
