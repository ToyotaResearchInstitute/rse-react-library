import * as React from "react"

import { cn } from "../utils"

/**
 * TRI keyboard hint (the DS `.kbd`). A small monospace keycap used for shortcut
 * affordances (e.g. ⌘K in search, esc in the command palette). #f5f5f5 surface,
 * 1px #e5e5e5 border, 4px radius, muted text.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "tri-inline-flex tri-items-center tri-rounded-xs tri-border tri-border-border tri-bg-muted tri-px-1.5 tri-py-px tri-font-mono tri-text-[10.5px] tri-leading-none tri-text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
