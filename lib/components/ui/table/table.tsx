import * as React from "react"
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI table. Per the design-system Table preview: 13px body text, uppercase
 * mono header labels in muted gray on a subtle (#fafafa) header row, 1px row
 * borders, and a hover tint on body rows. Supports `bordered` (boxed wrap),
 * `striped` (zebra, borderless) and `dense` variants, plus a `TableToolbar`,
 * sortable headers (`TableSortButton`), row selection styling, and numeric /
 * mono cell helpers.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    /** Wrap in a rounded, hairline-bordered container. */
    bordered?: boolean
    /** Zebra striping (implies borderless body rows). */
    striped?: boolean
    /** Compact row padding + smaller text. */
    dense?: boolean
  }
>(({ className, bordered = false, striped = false, dense = false, ...props }, ref) => (
  <div
    className={cn(
      "tri-relative tri-w-full tri-overflow-x-auto",
      bordered && "tri-rounded-md tri-border tri-border-border"
    )}
  >
    <table
      ref={ref}
      data-striped={striped ? "" : undefined}
      data-dense={dense ? "" : undefined}
      className={cn(
        "tri-w-full tri-caption-bottom tri-border-collapse tri-text-[13px]",
        striped &&
          "[&_tbody_tr]:tri-border-0 [&_tbody_tr:nth-child(even)]:tri-bg-[var(--tri-bg-subtle)] [&_tbody_tr:hover]:tri-bg-[var(--tri-neutral-150)]",
        dense && "tri-text-xs [&_td]:tri-py-[7px] [&_th]:tri-py-[7px]",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/**
 * Table toolbar — a title + row count on the left and icon actions on the
 * right, above the table. Set `selected` to render the bulk-action bar (blush
 * surface) shown when rows are selected.
 */
const TableToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-flex tri-items-center tri-justify-between tri-gap-3 tri-border-b tri-border-border tri-px-3.5 tri-py-3",
      selected ? "tri-bg-[#fbe5e8] tri-text-[#8a1621]" : "tri-bg-background",
      className
    )}
    {...props}
  />
))
TableToolbar.displayName = "TableToolbar"

/** Sortable header trigger — renders a neutral ↕ until sorted, then ↑/↓ in ink. */
const TableSortButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Current sort direction for this column, or false when unsorted. */
    direction?: "asc" | "desc" | false
  }
>(({ className, direction = false, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "tri-inline-flex tri-items-center tri-gap-1 tri-font-mono tri-text-[11px] tri-font-semibold tri-uppercase tri-tracking-[0.06em] tri-text-muted-foreground hover:tri-text-foreground focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring",
      className
    )}
    {...props}
  >
    {children}
    {direction === "asc" ? (
      <ArrowUp className="tri-size-3 tri-text-foreground" />
    ) : direction === "desc" ? (
      <ArrowDown className="tri-size-3 tri-text-foreground" />
    ) : (
      <ChevronsUpDown className="tri-size-3 tri-text-[var(--tri-neutral-300)]" />
    )}
  </button>
))
TableSortButton.displayName = "TableSortButton"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:tri-border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:tri-border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "tri-border-t tri-bg-muted/50 tri-font-medium [&>tr]:last:tri-border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "tri-border-b tri-transition-colors hover:tri-bg-muted/50 data-[state=selected]:tri-bg-info-bg",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "tri-h-auto tri-bg-[var(--tri-bg-subtle)] tri-px-3.5 tri-py-2.5 tri-text-left tri-align-middle tri-text-[11px] tri-font-semibold tri-uppercase tri-tracking-[0.06em] tri-text-muted-foreground tri-font-mono [&:has([role=checkbox])]:tri-pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    /** Right-align (e.g. numeric columns). */
    align?: "left" | "right"
    /** Monospace, muted treatment for IDs / timestamps / figures. */
    mono?: boolean
  }
>(({ className, align = "left", mono = false, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "tri-px-3.5 tri-py-3 tri-align-middle tri-text-foreground [&:has([role=checkbox])]:tri-pr-0",
      align === "right" && "tri-text-right",
      mono && "tri-font-mono tri-text-xs tri-text-[var(--tri-fg-subtle)]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("tri-mt-4 tri-text-sm tri-text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableToolbar,
  TableSortButton,
}
