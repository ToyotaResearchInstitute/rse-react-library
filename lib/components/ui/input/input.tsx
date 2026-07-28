import * as React from "react"

import { cn } from "../utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual error state — applies the error border + ring. */
  error?: boolean
  /** Optional leading icon rendered inside the bordered field. */
  icon?: React.ReactNode
  /** Optional trailing adornment (e.g. a clear button or ⌘K hint). */
  trailing?: React.ReactNode
  /** Class names applied to the outer bordered wrapper. */
  wrapperClassName?: string
}

/**
 * TRI single-line text field. Per the design-system Inputs preview the
 * border lives on a wrapper so an optional leading icon (and trailing
 * adornment) can sit inside the field. h-9 (36px), rounded-sm, 14px text.
 *
 * Default border #e5e5e5 · hover #d4d4d4 · focus #09090b + ring · error #EB0000.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, wrapperClassName, type = "text", error, icon, trailing, disabled, ...props },
    ref
  ) => {
    return (
      <div
        data-error={error ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "tri-flex tri-h-9 tri-items-center tri-gap-2 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-3 tri-transition-colors",
          "hover:tri-border-[var(--tri-border-hover)]",
          "focus-within:tri-border-foreground focus-within:tri-outline-none focus-within:tri-ring-2 focus-within:tri-ring-ring focus-within:tri-ring-offset-2",
          error &&
            "tri-border-error hover:tri-border-error focus-within:tri-border-error focus-within:tri-ring-error/30",
          disabled &&
            "tri-cursor-not-allowed tri-bg-[#fafafa] tri-opacity-70 hover:tri-border-input",
          wrapperClassName
        )}
      >
        {icon ? (
          <span className="tri-flex tri-shrink-0 tri-items-center tri-justify-center tri-text-muted-foreground [&_svg]:tri-size-4 [&_svg]:tri-shrink-0">
            {icon}
          </span>
        ) : null}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "tri-h-full tri-w-full tri-flex-1 tri-border-0 tri-bg-transparent tri-p-0 tri-text-sm tri-text-foreground tri-outline-none",
            "placeholder:tri-text-muted-foreground",
            "disabled:tri-cursor-not-allowed",
            "file:tri-border-0 file:tri-bg-transparent file:tri-text-sm file:tri-font-medium",
            className
          )}
          {...props}
        />
        {trailing ? (
          <span className="tri-flex tri-shrink-0 tri-items-center tri-justify-center tri-text-muted-foreground">
            {trailing}
          </span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
