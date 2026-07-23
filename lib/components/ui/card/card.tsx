import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Card. Per the design-system Cards preview: outlined (default), elevated,
 * or flat surfaces, 12px radius, composed of plain sub-parts so it can wrap
 * media, KPI tiles, articles, etc. `clickable` adds the interactive hover-lift.
 */
const cardVariants = cva(
  "rounded-lg text-foreground transition-shadow",
  {
    variants: {
      variant: {
        outlined: "border border-border bg-card shadow-none",
        elevated:
          "border border-transparent bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]",
        flat: "border-none bg-muted",
      },
      clickable: {
        true: "cursor-pointer transition-all duration-150 hover:-translate-y-px hover:border-[var(--border-strong)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
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
      "flex h-[140px] items-center justify-center bg-gradient-to-br from-[#fbe5e8] to-[#ECF6FF] font-mono text-[11px] uppercase tracking-[0.08em] text-[#a81b28]",
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
      "font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground",
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
    className={cn("flex flex-col gap-1.5 p-6", className)}
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
      "text-base font-semibold leading-snug tracking-tight text-foreground",
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
    className={cn("text-[13px] leading-normal text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-2 border-t border-border p-6 pt-4",
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
    className={cn("flex flex-col gap-1 px-5 py-[18px]", className)}
    {...props}
  >
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground [&_svg]:size-3.5">
      {icon}
      {label}
    </span>
    <span className="text-[32px] font-semibold tracking-[-0.02em] text-foreground [font-feature-settings:'tnum']">
      {value}
    </span>
    {delta != null && (
      <span
        className={cn(
          "text-xs font-medium",
          deltaDirection === "down" ? "text-[#c93030]" : "text-[#256628]"
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
