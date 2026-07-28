import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

const badgeVariants = cva(
  "tri-inline-flex tri-items-center tri-rounded-full tri-border tri-px-2.5 tri-py-0.5 tri-text-xs tri-font-semibold tri-transition-colors focus:tri-outline-none focus:tri-ring-2 focus:tri-ring-ring focus:tri-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "tri-border-transparent tri-bg-primary tri-text-primary-foreground hover:tri-bg-primary/80",
        secondary:
          "tri-border-transparent tri-bg-secondary tri-text-secondary-foreground hover:tri-bg-secondary/80",
        destructive:
          "tri-border-transparent tri-bg-destructive tri-text-destructive-foreground hover:tri-bg-destructive/80",
        outline: "tri-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
