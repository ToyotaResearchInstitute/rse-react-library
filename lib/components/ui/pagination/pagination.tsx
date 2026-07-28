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
    className={cn("tri-mx-auto tri-flex tri-w-full tri-justify-center", className)}
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
    className={cn("tri-flex tri-flex-row tri-items-center tri-gap-1", className)}
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
  "tri-inline-flex tri-h-8 tri-min-w-8 tri-select-none tri-items-center tri-justify-center tri-rounded-md tri-border tri-border-border tri-bg-background tri-px-2 tri-text-[13px] tri-text-[#404040] tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-2 [&_svg]:tri-size-3.5 [&_svg]:tri-shrink-0"

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
    "tri-cursor-pointer hover:tri-bg-muted",
    isActive &&
      "tri-border-primary tri-bg-primary tri-text-primary-foreground hover:tri-bg-primary",
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
    className={cn("tri-px-2", className)}
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
    className={cn("tri-px-2", className)}
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
      "tri-flex tri-h-8 tri-w-8 tri-items-center tri-justify-center tri-px-1 tri-text-[#a1a1aa]",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="tri-h-4 tri-w-4" />
    <span className="tri-sr-only">More pages</span>
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
