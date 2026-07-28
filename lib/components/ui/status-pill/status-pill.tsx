import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Status pill. Per the design-system Table preview `.p-*` tokens: a compact
 * rounded label in five semantic tones (success / warning / error / info /
 * neutral). Used for row status, KPI states, and inline badges.
 */
const statusPillVariants = cva(
  "tri-inline-flex tri-items-center tri-gap-1 tri-rounded-pill tri-px-2 tri-py-0.5 tri-text-[11px] tri-font-semibold tri-leading-none",
  {
    variants: {
      tone: {
        success: "tri-bg-[#EAF4EA] tri-text-[#256628]",
        warning: "tri-bg-[#FDF0E2] tri-text-[#c45800]",
        error: "tri-bg-[#FFECEC] tri-text-[#c93030]",
        info: "tri-bg-[#ECF6FF] tri-text-[#155a96]",
        neutral: "tri-bg-[#eeeeee] tri-text-[#404040]",
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
