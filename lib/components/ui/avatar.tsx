import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

/**
 * TRI Avatar. Per the design-system Avatars preview: circular (default),
 * rounded, or square surface, in five sizes (xs·24 / s·32 / m·40 / l·56 /
 * xl·80). The fallback carries named tint tokens (red/blue/green/amber/purple/
 * steel/dark). Presence dots (online/away/offline) attach via `AvatarWrap` +
 * `AvatarPresence`, and overlapping stacks via `AvatarGroup`.
 */
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        s: "h-8 w-8 text-xs",
        m: "h-10 w-10 text-sm",
        l: "h-14 w-14 text-lg",
        xl: "h-20 w-20 text-2xl",
      },
      shape: {
        circle: "rounded-pill",
        rounded: "rounded-lg",
        square: "rounded-sm",
      },
    },
    defaultVariants: { size: "m", shape: "circle" },
  }
)

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
    VariantProps<typeof avatarVariants>
>(({ className, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/** Named tint tokens for initials / icon fallbacks (DS `.c-*`). */
const avatarFallbackColors = {
  neutral: "bg-[#eeeeee] text-[#404040]",
  red: "bg-[#fbe5e8] text-[#a81b28]",
  blue: "bg-[#ECF6FF] text-[#155a96]",
  green: "bg-[#EAF4EA] text-[#256628]",
  amber: "bg-[#FDF0E2] text-[#c45800]",
  purple: "bg-[#efe6f8] text-[#5e3792]",
  steel: "bg-[#e6e7e8] text-[#525252]",
  dark: "bg-[#0b0b0d] text-white",
} as const

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    /** Tint token for the fallback surface. */
    color?: keyof typeof avatarFallbackColors
  }
>(({ className, color = "neutral", ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center font-semibold [&_svg]:size-[45%]",
      avatarFallbackColors[color],
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/** Relative wrapper so a presence dot can be anchored to an avatar. */
const AvatarWrap = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("relative inline-flex", className)}
    {...props}
  />
))
AvatarWrap.displayName = "AvatarWrap"

const presenceColors = {
  online: "bg-[#2E7D32]",
  away: "bg-[#D14900]",
  offline: "bg-[#a1a1aa]",
} as const

/** Presence status dot — place inside an `AvatarWrap` next to the avatar. */
const AvatarPresence = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    status?: keyof typeof presenceColors
  }
>(({ className, status = "online", ...props }, ref) => (
  <span
    ref={ref}
    aria-label={status}
    className={cn(
      "absolute -bottom-0.5 -right-0.5 z-[1] size-3.5 rounded-pill border-2 border-white shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
      presenceColors[status],
      className
    )}
    {...props}
  />
))
AvatarPresence.displayName = "AvatarPresence"

/** Overlapping avatar stack. Each direct avatar gets a white ring and overlaps
 *  the previous by 10px, per the DS `.grp`. */
const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex [&>*]:border-2 [&>*]:border-white [&>*:not(:first-child)]:-ml-2.5",
      className
    )}
    {...props}
  />
))
AvatarGroup.displayName = "AvatarGroup"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarWrap,
  AvatarPresence,
  AvatarGroup,
  avatarVariants,
}
