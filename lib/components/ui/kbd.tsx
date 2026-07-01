import * as React from "react"

import { cn } from "./utils"

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
        "inline-flex items-center rounded-xs border border-border bg-muted px-1.5 py-px font-mono text-[10.5px] leading-none text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
