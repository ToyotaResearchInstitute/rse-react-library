import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "../utils"

/**
 * TRI form label. Per the Inputs preview: 13px, weight 500, foreground ink.
 * Dims with its disabled peer.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "tri-text-[13px] tri-font-medium tri-leading-none tri-text-foreground peer-disabled:tri-cursor-not-allowed peer-disabled:tri-opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
