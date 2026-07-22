import * as React from "react"

import { cn } from "../utils"

/**
 * TRI three-dot bounce loader. Per the design-system Loading preview `.dots`:
 * three small dots bouncing with staggered delays. `color` themes the dots
 * (ink default / brand / info / white for use on dark surfaces).
 */
const dotColors = {
  ink: "bg-primary",
  brand: "bg-brand",
  info: "bg-info",
  white: "bg-white",
} as const

export interface DotsLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: keyof typeof dotColors
  /** Dot diameter in px. */
  size?: number
  label?: string
}

const DotsLoader = React.forwardRef<HTMLSpanElement, DotsLoaderProps>(
  ({ className, color = "ink", size = 6, label = "Loading", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-[5px]", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("inline-block rounded-pill animate-dot-bounce", dotColors[color])}
          style={{ width: size, height: size, animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
)
DotsLoader.displayName = "DotsLoader"

export { DotsLoader }
