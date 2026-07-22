import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Status pill. Per the design-system Table preview `.p-*` tokens: a compact
 * rounded label in five semantic tones (success / warning / error / info /
 * neutral). Used for row status, KPI states, and inline badges.
 */
const statusPillVariants = cva(
  "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-semibold leading-none",
  {
    variants: {
      tone: {
        success: "bg-[#EAF4EA] text-[#256628]",
        warning: "bg-[#FDF0E2] text-[#c45800]",
        error: "bg-[#FFECEC] text-[#c93030]",
        info: "bg-[#ECF6FF] text-[#155a96]",
        neutral: "bg-[#eeeeee] text-[#404040]",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
)

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {}

const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(
  ({ className, tone, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusPillVariants({ tone }), className)}
      {...props}
    />
  )
)
StatusPill.displayName = "StatusPill"

export { StatusPill, statusPillVariants }
