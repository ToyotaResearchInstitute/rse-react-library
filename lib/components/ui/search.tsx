import * as React from "react"
import { Search as SearchIcon, X } from "lucide-react"

import { cn } from "./utils"
import { Input, type InputProps } from "./input"
import { Kbd } from "./kbd"

export interface SearchProps extends Omit<InputProps, "icon" | "type" | "size"> {
  /** Override the default leading magnifier icon. */
  icon?: React.ReactNode
  /** Field size — sm (30px) / md (36px, default) / lg (48px hero). */
  size?: "sm" | "md" | "lg"
  /** Pill / filled toolbar style (rounded-full, muted surface, no border). */
  pill?: boolean
  /** Trailing keyboard hint (e.g. "⌘K"). Rendered as a Kbd keycap. */
  kbdHint?: React.ReactNode
  /** When provided, renders a trailing circular clear (X) button. */
  onClear?: () => void
}

const sizeWrapper = {
  sm: "h-[30px] px-2.5",
  md: "",
  lg: "h-12 px-4",
} as const

const sizeInput = {
  sm: "text-[13px]",
  md: "",
  lg: "text-base",
} as const

/**
 * TRI search field — an Input pre-wired with a leading magnifier. Per the
 * Search preview: supports sm/md/lg sizes, a pill/filled variant, an optional
 * trailing ⌘K hint, and an optional circular clear button.
 */
const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      wrapperClassName,
      icon,
      size = "md",
      pill = false,
      kbdHint,
      onClear,
      placeholder = "Search…",
      ...props
    },
    ref
  ) => {
    const trailing = (
      <span className="flex items-center gap-2">
        {onClear && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={onClear}
            className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-pill bg-[var(--brand-gray)] p-0.5 text-[var(--fg-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-3" />
          </button>
        )}
        {kbdHint && <Kbd>{kbdHint}</Kbd>}
      </span>
    )

    return (
      <Input
        ref={ref}
        type="search"
        icon={icon ?? <SearchIcon aria-hidden="true" />}
        trailing={onClear || kbdHint ? trailing : undefined}
        placeholder={placeholder}
        wrapperClassName={cn(
          sizeWrapper[size],
          pill && "rounded-pill border-transparent bg-muted hover:border-transparent hover:bg-[var(--brand-gray)]",
          wrapperClassName
        )}
        className={cn(
          sizeInput[size],
          "[&::-webkit-search-cancel-button]:appearance-none",
          className
        )}
        {...props}
      />
    )
  }
)
Search.displayName = "Search"

export { Search }
