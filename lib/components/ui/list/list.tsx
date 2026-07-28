import * as React from "react"

import { cn } from "../utils"

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
      "tri-overflow-hidden tri-rounded-md tri-border tri-bg-background",
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
      "tri-border-b tri-bg-muted tri-px-3.5 tri-pb-1 tri-pt-2.5 tri-font-mono tri-text-[10px] tri-font-semibold tri-uppercase tri-tracking-wider tri-text-muted-foreground",
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
        "tri-flex tri-items-center tri-gap-3 tri-px-3.5 tri-py-3 tri-text-foreground tri-transition-colors",
        !disableDivider && "tri-border-b last:tri-border-b-0",
        interactive && "tri-cursor-pointer hover:tri-bg-muted",
        active && "tri-bg-brand-sky hover:tri-bg-brand-sky",
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
        "tri-flex tri-shrink-0 tri-items-center tri-justify-center [&_svg]:tri-size-4",
        !unstyled &&
          (plain
            ? "tri-size-4 tri-text-current [&_svg]:tri-size-4"
            : "tri-size-8 tri-rounded-md tri-bg-muted tri-text-neutral-600"),
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
    <div ref={ref} className={cn("tri-min-w-0 tri-flex-1", className)} {...props}>
      {primary != null && (
        <div className="tri-text-sm tri-font-medium tri-leading-tight tri-text-foreground">
          {primary}
        </div>
      )}
      {secondary != null && (
        <div className="tri-mt-0.5 tri-text-xs tri-text-muted-foreground">{secondary}</div>
      )}
      {children}
    </div>
  )
)
ListItemText.displayName = "ListItemText"

/**
 * Trailing count pill for list / sidebar-nav rows. Neutral by default; pass
 * `active` on the selected nav row to invert to the white-on-tint treatment.
 */
const ListItemCount = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }
>(({ className, active = false, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "tri-ml-auto tri-inline-flex tri-min-w-5 tri-items-center tri-justify-center tri-rounded-pill tri-px-1.5 tri-py-0.5 tri-text-[11px] tri-font-semibold tri-leading-none",
      active ? "tri-bg-background tri-text-info" : "tri-bg-neutral-200 tri-text-[var(--tri-fg-muted)]",
      className
    )}
    {...props}
  />
))
ListItemCount.displayName = "ListItemCount"

export {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemCount,
}
