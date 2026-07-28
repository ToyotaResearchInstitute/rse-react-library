import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../utils"

/**
 * TRI Chip. Per the design-system Chips preview: compact, often-removable
 * tokens for tags, filters and selected values. The recommended treatment on
 * white backgrounds is a neutral filled chip (bg #eeeeee, ink text). It can be
 * `outlined`, and toggled to a `selected` state that fills with a per-color
 * accent (brand / ink / info). Pass `onRemove` to render a removable × button.
 */
const chipVariants = cva(
  "tri-inline-flex tri-items-center tri-gap-1.5 tri-rounded-pill tri-px-2.5 tri-py-1 tri-text-xs tri-font-medium tri-leading-snug tri-transition-colors focus-visible:tri-outline-none focus-visible:tri-ring-2 focus-visible:tri-ring-ring focus-visible:tri-ring-offset-1 tri-border tri-border-transparent",
  {
    variants: {
      variant: {
        filled: "tri-bg-[#eeeeee] tri-text-[#0b0b0d] hover:tri-bg-[#e4e4e4]",
        outlined:
          "tri-bg-transparent tri-text-[#0b0b0d] tri-border-[#d4d4d4] hover:tri-bg-[#f5f5f5]",
        // Dashed "+ Add" affordance
        dashed:
          "tri-bg-transparent tri-text-[#737373] tri-border-dashed tri-border-[#d4d4d4] hover:tri-bg-[#f5f5f5]",
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
        className: "tri-bg-brand tri-text-white hover:tri-bg-brand",
      },
      {
        variant: "filled",
        color: "ink",
        selected: true,
        className: "tri-bg-primary tri-text-white hover:tri-bg-primary",
      },
      {
        variant: "filled",
        color: "info",
        selected: true,
        className: "tri-bg-info tri-text-white hover:tri-bg-info",
      },
      // Outlined · selected — soft tint + accent border
      {
        variant: "outlined",
        color: "brand",
        selected: true,
        className: "tri-bg-[#fbe5e8] tri-text-[#a81b28] tri-border-brand",
      },
      {
        variant: "outlined",
        color: "ink",
        selected: true,
        className: "tri-bg-[#f5f5f5] tri-text-[#0b0b0d] tri-border-primary",
      },
      {
        variant: "outlined",
        color: "info",
        selected: true,
        className: "tri-bg-[#ECF6FF] tri-text-info tri-border-info",
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
        onRemove && "tri-pr-1",
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
            "tri-inline-flex tri-h-4 tri-w-4 tri-items-center tri-justify-center tri-rounded-pill tri-text-white tri-transition-colors",
            selected ? "tri-bg-white/30 hover:tri-bg-white/40" : "tri-bg-black/[0.18] hover:tri-bg-black/30"
          )}
        >
          <X className="tri-h-2 tri-w-2" strokeWidth={3} />
        </button>
      )}
    </span>
  )
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
