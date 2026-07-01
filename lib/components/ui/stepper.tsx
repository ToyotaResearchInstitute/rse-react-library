import * as React from "react"
import { Check, X } from "lucide-react"

import { cn } from "./utils"

/**
 * TRI Stepper. Per the design-system Stepper preview: numbered circles connected
 * by lines, with completed / current / upcoming / error states. Supports
 * `horizontal` (default) and `vertical` orientation, and a `dot` variant for
 * compact / mobile progress.
 */
export type StepperStep =
  | string
  | {
      label: string
      /** Optional helper text shown beneath the label (e.g. "Completed"). */
      description?: string
      /** Force the error state on this step. */
      status?: "error"
    }

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered step labels, or `{ label, description, status }` objects. */
  steps: StepperStep[]
  /** Zero-based index of the current (in-progress) step. */
  currentStep: number
  orientation?: "horizontal" | "vertical"
  /** `dot` renders compact dots instead of numbered circles. */
  variant?: "default" | "dot"
}

function normalizeStep(step: StepperStep): {
  label: string
  description?: string
  status?: "error"
} {
  return typeof step === "string" ? { label: step } : step
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { steps, currentStep, orientation = "horizontal", variant = "default", className, ...props },
    ref
  ) => {
    const vertical = orientation === "vertical"
    const dot = variant === "dot"

    return (
      <div
        ref={ref}
        role="list"
        aria-label="progress"
        className={cn(
          "flex w-full overflow-x-auto",
          vertical ? "flex-col" : "items-center",
          className
        )}
        {...props}
      >
        {steps.map((rawStep, index) => {
          const { label, description, status } = normalizeStep(rawStep)
          const isError = status === "error"
          const isCompleted = !isError && index < currentStep
          const isCurrent = !isError && index === currentStep
          const isLast = index === steps.length - 1
          const active = isCompleted || isCurrent

          const marker = dot ? (
            <span
              className={cn(
                "block shrink-0 rounded-pill transition-colors",
                isError
                  ? "size-2.5 bg-brand"
                  : active
                    ? "size-2.5 bg-primary"
                    : "size-2 bg-[#d4d4d4]",
                isCurrent && "ring-4 ring-[rgba(11,11,13,0.18)]"
              )}
            />
          ) : (
            <span
              className={cn(
                "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-pill text-xs font-semibold transition-colors",
                isError
                  ? "bg-brand text-white"
                  : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-[#eeeeee] text-[#525252]",
                isCurrent && "ring-4 ring-[rgba(11,11,13,0.18)]"
              )}
            >
              {isError ? (
                <X className="h-3.5 w-3.5" strokeWidth={3} />
              ) : isCompleted ? (
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              ) : (
                index + 1
              )}
            </span>
          )

          const labelBlock = (
            <span className="flex flex-col gap-px">
              <span
                className={cn(
                  "text-[13px] font-medium leading-tight",
                  isError ? "text-brand" : active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
              {description ? (
                <span className="text-[11px] leading-tight text-[#a1a1aa]">
                  {description}
                </span>
              ) : null}
            </span>
          )

          const connector = !isLast ? (
            <span
              aria-hidden
              className={cn(
                "transition-colors",
                vertical ? "my-1 ml-[12px] w-px flex-1 self-stretch" : "mx-3.5 h-px flex-1",
                isCompleted ? "bg-primary" : "bg-border",
                vertical && "min-h-4"
              )}
            />
          ) : null

          if (vertical) {
            return (
              <div key={index} className="flex flex-col">
                <div
                  role="listitem"
                  aria-current={isCurrent ? "step" : undefined}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex w-[26px] justify-center">{marker}</span>
                  {labelBlock}
                </div>
                {connector}
              </div>
            )
          }

          return (
            <React.Fragment key={index}>
              <div
                role="listitem"
                aria-current={isCurrent ? "step" : undefined}
                className="flex items-center gap-2.5"
              >
                {marker}
                {labelBlock}
              </div>
              {connector}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export { Stepper }
