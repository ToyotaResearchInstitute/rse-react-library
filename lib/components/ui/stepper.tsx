import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "./utils"

/**
 * TRI Stepper. Per the design-system Stepper preview, a horizontal row of
 * numbered circles connected by hairline lines, with three states:
 *  - completed (index < currentStep): ink (#0B0B0D) filled circle with a check
 *    icon; the connector that follows turns ink.
 *  - current (index === currentStep): ink filled circle with the step number and
 *    a soft focus ring; label text is ink.
 *  - upcoming (index > currentStep): muted gray (#eeeeee) circle, muted label.
 */
export type StepperStep =
  | string
  | {
      label: string
      /** Optional helper text shown beneath the label (e.g. "Completed"). */
      description?: string
    }

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered step labels, or `{ label, description }` objects. */
  steps: StepperStep[]
  /** Zero-based index of the current (in-progress) step. */
  currentStep: number
}

function normalizeStep(step: StepperStep): {
  label: string
  description?: string
} {
  return typeof step === "string" ? { label: step } : step
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, className, ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      aria-label="progress"
      className={cn("flex w-full items-center overflow-x-auto", className)}
      {...props}
    >
      {steps.map((rawStep, index) => {
        const { label, description } = normalizeStep(rawStep)
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            <div
              role="listitem"
              aria-current={isCurrent ? "step" : undefined}
              className="flex items-center gap-2.5"
            >
              <span
                className={cn(
                  "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-pill text-xs font-semibold transition-colors",
                  isCompleted || isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-[#eeeeee] text-[#525252]",
                  isCurrent && "ring-4 ring-[rgba(11,11,13,0.18)]"
                )}
              >
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </span>
              <span className="flex flex-col gap-px">
                <span
                  className={cn(
                    "text-[13px] font-medium leading-tight",
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
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
            </div>
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "mx-3.5 h-px flex-1 transition-colors",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            ) : null}
          </React.Fragment>
        )
      })}
    </div>
  )
)
Stepper.displayName = "Stepper"

export { Stepper }
