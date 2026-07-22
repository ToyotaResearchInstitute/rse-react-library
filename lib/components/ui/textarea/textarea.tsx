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
          "flex min-h-[64px] w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors",
          "placeholder:text-muted-foreground",
          "hover:border-[var(--border-hover)]",
          "focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          error &&
            "border-error hover:border-error focus-visible:border-error focus-visible:ring-error/30",
          "disabled:cursor-not-allowed disabled:bg-[#fafafa] disabled:opacity-70 disabled:hover:border-input",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
