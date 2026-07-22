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
        "inline-flex min-w-[280px] items-center gap-3.5 rounded-sm border border-[#cfe2f3] bg-brand-sky px-4 py-3 text-sm font-semibold text-info shadow-lg",
        className
      )}
      {...props}
    >
      <span className="flex-1 text-info">{children}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="cursor-pointer border-none bg-transparent text-[13px] font-semibold uppercase tracking-[0.06em] text-info underline underline-offset-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 text-info focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" />
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
      "pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center [&>*]:pointer-events-auto",
      className
    )}
    {...props}
  />
))
SnackbarViewport.displayName = "SnackbarViewport"

export { Snackbar, SnackbarViewport }
