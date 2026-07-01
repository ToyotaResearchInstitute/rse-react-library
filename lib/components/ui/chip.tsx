import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "./utils"

/**
 * TRI Chip. Per the design-system Chips preview: compact, often-removable
 * tokens for tags, filters and selected values. The recommended treatment on
 * white backgrounds is a neutral filled chip (bg #eeeeee, ink text). It can be
 * `outlined`, and toggled to a `selected` state that fills with a per-color
 * accent (brand / ink / info). Pass `onRemove` to render a removable × button.
 */
const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 border border-transparent",
  {
    variants: {
      variant: {
        filled: "bg-[#eeeeee] text-[#0b0b0d] hover:bg-[#e4e4e4]",
        outlined:
          "bg-transparent text-[#0b0b0d] border-[#d4d4d4] hover:bg-[#f5f5f5]",
      },
      color: {
        brand: "",
        ink: "",
        info: "",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Filled · selected — fills with the accent
      {
        variant: "filled",
        color: "brand",
        selected: true,
        className: "bg-brand text-white hover:bg-brand",
      },
      {
        variant: "filled",
        color: "ink",
        selected: true,
        className: "bg-primary text-white hover:bg-primary",
      },
      {
        variant: "filled",
        color: "info",
        selected: true,
        className: "bg-info text-white hover:bg-info",
      },
      // Outlined · selected — soft tint + accent border
      {
        variant: "outlined",
        color: "brand",
        selected: true,
        className: "bg-[#fbe5e8] text-[#a81b28] border-brand",
      },
      {
        variant: "outlined",
        color: "ink",
        selected: true,
        className: "bg-[#f5f5f5] text-[#0b0b0d] border-primary",
      },
      {
        variant: "outlined",
        color: "info",
        selected: true,
        className: "bg-[#ECF6FF] text-info border-info",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "brand",
      selected: false,
    },
  }
)

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof chipVariants> {
  /** When provided, renders a removable × button; called when it is clicked. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Accessible label for the remove button. */
  removeLabel?: string
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      variant,
      color,
      selected,
      onRemove,
      removeLabel = "Remove",
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(
        chipVariants({ variant, color, selected }),
        onRemove && "pr-1",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded-pill text-white transition-colors",
            selected ? "bg-white/30 hover:bg-white/40" : "bg-black/[0.18] hover:bg-black/30"
          )}
        >
          <X className="h-2 w-2" strokeWidth={3} />
        </button>
      )}
    </span>
  )
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
