import * as React from "react"

import { cn } from "../utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visual error state — applies the error border + ring. */
  error?: boolean
}

/**
 * TRI multi-line text field. Matches the Inputs preview: min-height 64px,
 * 10px/12px padding, rounded-sm, 14px text, same border + focus + error
 * treatment as Input.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        data-error={error ? "" : undefined}
        className={cn(
          "tri-flex tri-min-h-[64px] tri-w-full tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-3 tri-py-2.5 tri-text-sm tri-text-foreground tri-transition-colors",
          "placeholder:tri-text-muted-foreground",
          "hover:tri-border-[var(--tri-border-hover)]",
          "focus-visible:tri-border-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2",
          error &&
            "tri-border-error hover:tri-border-error focus-visible:tri-border-error focus-visible:tri-ring-error/30",
          "disabled:tri-cursor-not-allowed disabled:tri-bg-[#fafafa] disabled:tri-opacity-70 disabled:hover:tri-border-input",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
