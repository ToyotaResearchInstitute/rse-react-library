import * as React from "react"
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react"

import { cn } from "./utils"

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
      "relative w-full overflow-x-auto",
      bordered && "rounded-md border border-border"
    )}
  >
    <table
      ref={ref}
      data-striped={striped ? "" : undefined}
      data-dense={dense ? "" : undefined}
      className={cn(
        "w-full caption-bottom border-collapse text-[13px]",
        striped &&
          "[&_tbody_tr]:border-0 [&_tbody_tr:nth-child(even)]:bg-[var(--bg-subtle)] [&_tbody_tr:hover]:bg-[var(--neutral-150)]",
        dense && "text-xs [&_td]:py-[7px] [&_th]:py-[7px]",
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
      "flex items-center justify-between gap-3 border-b border-border px-3.5 py-3",
      selected ? "bg-[#fbe5e8] text-[#8a1621]" : "bg-background",
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
      "inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  >
    {children}
    {direction === "asc" ? (
      <ArrowUp className="size-3 text-foreground" />
    ) : direction === "desc" ? (
      <ArrowDown className="size-3 text-foreground" />
    ) : (
      <ChevronsUpDown className="size-3 text-[var(--neutral-300)]" />
    )}
  </button>
))
TableSortButton.displayName = "TableSortButton"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
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
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
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
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-info-bg",
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
      "h-auto bg-[var(--bg-subtle)] px-3.5 py-2.5 text-left align-middle text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground font-mono [&:has([role=checkbox])]:pr-0",
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
      "px-3.5 py-3 align-middle text-foreground [&:has([role=checkbox])]:pr-0",
      align === "right" && "text-right",
      mono && "font-mono text-xs text-[var(--fg-subtle)]",
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
    className={cn("mt-4 text-sm text-muted-foreground", className)}
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
