import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Card. Per the design-system Cards preview: outlined (default), elevated,
 * or flat surfaces, 12px radius, composed of plain sub-parts so it can wrap
 * media, KPI tiles, articles, etc. `clickable` adds the interactive hover-lift.
 */
const cardVariants = cva(
  "tri-rounded-lg tri-text-foreground tri-transition-shadow",
  {
    variants: {
      variant: {
        outlined: "tri-border tri-border-border tri-bg-card tri-shadow-none",
        elevated:
          "tri-border tri-border-transparent tri-bg-card tri-shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]",
        flat: "tri-border-none tri-bg-muted",
      },
      clickable: {
        true: "tri-cursor-pointer tri-transition-all tri-duration-150 hover:-tri-translate-y-px hover:tri-border-[var(--tri-border-strong)] hover:tri-shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        false: "",
      },
    },
    defaultVariants: { variant: "outlined", clickable: false },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, clickable, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, clickable }), className)}
    {...props}
  />
))
Card.displayName = "Card"

/** Media block for article cards — 140px gradient banner with centered caption. */
const CardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-flex tri-h-[140px] tri-items-center tri-justify-center tri-bg-gradient-to-br tri-from-[#fbe5e8] tri-to-[#ECF6FF] tri-font-mono tri-text-[11px] tri-uppercase tri-tracking-[0.08em] tri-text-[#a81b28]",
      className
    )}
    {...props}
  />
))
CardMedia.displayName = "CardMedia"

/** Small uppercase mono label above a card title (DS `.eyebrow`). */
const CardEyebrow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-font-mono tri-text-[10px] tri-uppercase tri-tracking-[0.08em] tri-text-muted-foreground",
      className
    )}
    {...props}
  />
))
CardEyebrow.displayName = "CardEyebrow"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tri-flex tri-flex-col tri-gap-1.5 tri-p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-text-base tri-font-semibold tri-leading-snug tri-tracking-tight tri-text-foreground",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tri-text-[13px] tri-leading-normal tri-text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("tri-p-6 tri-pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tri-flex tri-items-center tri-justify-between tri-gap-2 tri-border-t tri-border-border tri-p-6 tri-pt-4",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/**
 * KPI / stat tile. A label (with optional leading icon), a large tabular-numeral
 * value, and an optional up/down delta. Per the DS `.stat`.
 */
const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label: React.ReactNode
    value: React.ReactNode
    /** Delta text (e.g. "+12%"). */
    delta?: React.ReactNode
    /** Delta direction — controls color (up = green, down = red). */
    deltaDirection?: "up" | "down"
    icon?: React.ReactNode
  }
>(({ className, label, value, delta, deltaDirection = "up", icon, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tri-flex tri-flex-col tri-gap-1 tri-px-5 tri-py-[18px]", className)}
    {...props}
  >
    <span className="tri-flex tri-items-center tri-gap-1.5 tri-text-xs tri-text-muted-foreground [&_svg]:tri-size-3.5">
      {icon}
      {label}
    </span>
    <span className="tri-text-[32px] tri-font-semibold tri-tracking-[-0.02em] tri-text-foreground tri-[font-feature-settings:'tnum']">
      {value}
    </span>
    {delta != null && (
      <span
        className={cn(
          "tri-text-xs tri-font-medium",
          deltaDirection === "down" ? "tri-text-[#c93030]" : "tri-text-[#256628]"
        )}
      >
        {delta}
      </span>
    )}
  </div>
))
StatCard.displayName = "StatCard"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  CardEyebrow,
  StatCard,
  cardVariants,
}
