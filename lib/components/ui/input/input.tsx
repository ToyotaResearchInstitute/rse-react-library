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
          "flex h-9 items-center gap-2 rounded-sm border border-input bg-background px-3 transition-colors",
          "hover:border-[var(--border-hover)]",
          "focus-within:border-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          error &&
            "border-error hover:border-error focus-within:border-error focus-within:ring-error/30",
          disabled &&
            "cursor-not-allowed bg-[#fafafa] opacity-70 hover:border-input",
          wrapperClassName
        )}
      >
        {icon ? (
          <span className="flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
            {icon}
          </span>
        ) : null}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "h-full w-full flex-1 border-0 bg-transparent p-0 text-sm text-foreground outline-none",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            className
          )}
          {...props}
        />
        {trailing ? (
          <span className="flex shrink-0 items-center justify-center text-muted-foreground">
            {trailing}
          </span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
