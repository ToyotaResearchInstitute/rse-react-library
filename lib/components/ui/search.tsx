import * as React from "react"
import { Search as SearchIcon } from "lucide-react"

import { cn } from "./utils"
import { Input, type InputProps } from "./input"

export interface SearchProps extends Omit<InputProps, "icon" | "type"> {
  /** Override the default leading magnifier icon. */
  icon?: React.ReactNode
}

/**
 * TRI search field — an Input pre-wired with a leading lucide search icon.
 * Per the Search preview: leading magnifier, type="search", placeholder
 * muted, same bordered field + focus ring as Input.
 */
const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, icon, placeholder = "Search…", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        icon={icon ?? <SearchIcon aria-hidden="true" />}
        placeholder={placeholder}
        className={cn("[&::-webkit-search-cancel-button]:appearance-none", className)}
        {...props}
      />
    )
  }
)
Search.displayName = "Search"

export { Search }
