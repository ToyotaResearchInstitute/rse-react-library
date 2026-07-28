import * as React from "react"
import { Check, X } from "lucide-react"

import { cn } from "../utils"

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
          "tri-flex tri-w-full tri-overflow-x-auto",
          vertical ? "tri-flex-col" : "tri-items-center",
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
                "tri-block tri-shrink-0 tri-rounded-pill tri-transition-colors",
                isError
                  ? "tri-size-2.5 tri-bg-brand"
                  : active
                    ? "tri-size-2.5 tri-bg-primary"
                    : "tri-size-2 tri-bg-[#d4d4d4]",
                isCurrent && "tri-ring-4 tri-ring-[rgba(11,11,13,0.18)]"
              )}
            />
          ) : (
            <span
              className={cn(
                "tri-flex tri-h-[26px] tri-w-[26px] tri-shrink-0 tri-items-center tri-justify-center tri-rounded-pill tri-text-xs tri-font-semibold tri-transition-colors",
                isError
                  ? "tri-bg-brand tri-text-white"
                  : active
                    ? "tri-bg-primary tri-text-primary-foreground"
                    : "tri-bg-[#eeeeee] tri-text-[#525252]",
                isCurrent && "tri-ring-4 tri-ring-[rgba(11,11,13,0.18)]"
              )}
            >
              {isError ? (
                <X className="tri-h-3.5 tri-w-3.5" strokeWidth={3} />
              ) : isCompleted ? (
                <Check className="tri-h-3.5 tri-w-3.5" strokeWidth={3} />
              ) : (
                index + 1
              )}
            </span>
          )

          const labelBlock = (
            <span className="tri-flex tri-flex-col tri-gap-px">
              <span
                className={cn(
                  "tri-text-[13px] tri-font-medium tri-leading-tight",
                  isError ? "tri-text-brand" : active ? "tri-text-foreground" : "tri-text-muted-foreground"
                )}
              >
                {label}
              </span>
              {description ? (
                <span className="tri-text-[11px] tri-leading-tight tri-text-[#a1a1aa]">
                  {description}
                </span>
              ) : null}
            </span>
          )

          const connector = !isLast ? (
            <span
              aria-hidden
              className={cn(
                "tri-transition-colors",
                vertical ? "tri-my-1 tri-ml-[12px] tri-w-px tri-flex-1 tri-self-stretch" : "tri-mx-3.5 tri-h-px tri-flex-1",
                isCompleted ? "tri-bg-primary" : "tri-bg-border",
                vertical && "tri-min-h-4"
              )}
            />
          ) : null

          if (vertical) {
            return (
              <div key={index} className="tri-flex tri-flex-col">
                <div
                  role="listitem"
                  aria-current={isCurrent ? "step" : undefined}
                  className="tri-flex tri-items-center tri-gap-2.5"
                >
                  <span className="tri-flex tri-w-[26px] tri-justify-center">{marker}</span>
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
                className="tri-flex tri-items-center tri-gap-2.5"
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
