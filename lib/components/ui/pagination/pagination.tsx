import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Pagination. Per the design-system pagination preview, controls are a row
 * of 32px square outlined buttons (hairline #e5e5e5 border, rounded). The
 * current page is highlighted with an ink (#0B0B0D) fill; ellipsis is a muted
 * gap. Prev/Next render lucide chevrons.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const paginationLinkBase =
  "inline-flex h-8 min-w-8 select-none items-center justify-center rounded-md border border-border bg-background px-2 text-[13px] text-[#404040] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:size-3.5 [&_svg]:shrink-0"

type PaginationLinkProps = {
  isActive?: boolean
  href?: string
} & React.HTMLAttributes<HTMLElement>

const PaginationLink = ({
  className,
  isActive,
  href,
  ...props
}: PaginationLinkProps) => {
  const classes = cn(
    paginationLinkBase,
    "cursor-pointer hover:bg-muted",
    isActive &&
      "border-primary bg-primary text-primary-foreground hover:bg-primary",
    className
  )
  const ariaCurrent = isActive ? "page" : undefined
  const dataActive = isActive ? "" : undefined
  // Render a navigational <a> when an href is supplied; otherwise a real
  // <button> so controlled (onClick-driven) pagination stays keyboard-focusable.
  return href !== undefined ? (
    <a
      href={href}
      aria-current={ariaCurrent}
      data-active={dataActive}
      className={classes}
      {...props}
    />
  ) : (
    <button
      type="button"
      aria-current={ariaCurrent}
      data-active={dataActive}
      className={classes}
      {...props}
    />
  )
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("px-2", className)}
    {...props}
  >
    <ChevronLeft />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("px-2", className)}
    {...props}
  >
    <ChevronRight />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-8 w-8 items-center justify-center px-1 text-[#a1a1aa]",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
