import * as React from "react"

import { cn } from "./utils"

/**
 * TRI List. Per the design-system Lists preview: stacked rows with a
 * consistent leading + label + trailing structure. Supports contacts,
 * settings panels, sidebar nav, and checklist patterns.
 *
 * Composition:
 *   <List>
 *     <ListItem>
 *       <ListItemIcon>{icon}</ListItemIcon>
 *       <ListItemText primary="Title" secondary="Subtitle" />
 *       <span>trailing</span>
 *     </ListItem>
 *   </List>
 */

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "overflow-hidden rounded-md border bg-background",
      className
    )}
    {...props}
  />
))
List.displayName = "List"

/**
 * Optional grouping header inside a List (e.g. "General", "Security").
 */
const ListSubheader = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "border-b bg-muted px-3.5 pb-1 pt-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
      className
    )}
    {...props}
  />
))
ListSubheader.displayName = "ListSubheader"

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Highlights the row with the brand-sky active state. */
  active?: boolean
  /** Makes the row interactive (cursor + hover background). */
  interactive?: boolean
  /** Hides the bottom divider on this row. */
  disableDivider?: boolean
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      active = false,
      interactive = true,
      disableDivider = false,
      ...props
    },
    ref
  ) => (
    <li
      ref={ref}
      data-active={active || undefined}
      className={cn(
        "flex items-center gap-3 px-3.5 py-3 text-foreground transition-colors",
        !disableDivider && "border-b last:border-b-0",
        interactive && "cursor-pointer hover:bg-muted",
        active && "bg-brand-sky hover:bg-brand-sky",
        className
      )}
      {...props}
    />
  )
)
ListItem.displayName = "ListItem"

/**
 * Leading slot. By default renders the neutral rounded icon chip from the
 * Settings list. Pass `plain` for a bare 16px icon (e.g. sidebar nav), or
 * `asChild`-style content like an avatar/checkbox via `unstyled`.
 */
export interface ListItemIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Render a bare icon with no chip background (sidebar nav style). */
  plain?: boolean
  /** Render no styling at all — use for avatars / custom leading elements. */
  unstyled?: boolean
}

const ListItemIcon = React.forwardRef<HTMLSpanElement, ListItemIconProps>(
  ({ className, plain = false, unstyled = false, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "flex shrink-0 items-center justify-center [&_svg]:size-4",
        !unstyled &&
          (plain
            ? "size-4 text-current [&_svg]:size-4"
            : "size-8 rounded-md bg-muted text-neutral-600"),
        className
      )}
      {...props}
    />
  )
)
ListItemIcon.displayName = "ListItemIcon"

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
}

const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ className, primary, secondary, children, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 flex-1", className)} {...props}>
      {primary != null && (
        <div className="text-sm font-medium leading-tight text-foreground">
          {primary}
        </div>
      )}
      {secondary != null && (
        <div className="mt-0.5 text-xs text-muted-foreground">{secondary}</div>
      )}
      {children}
    </div>
  )
)
ListItemText.displayName = "ListItemText"

export {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
}
