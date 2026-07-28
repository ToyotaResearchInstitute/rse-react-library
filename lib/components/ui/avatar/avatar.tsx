import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

/**
 * TRI Avatar. Per the design-system Avatars preview: circular (default),
 * rounded, or square surface, in five sizes (xs·24 / s·32 / m·40 / l·56 /
 * xl·80). The fallback carries named tint tokens (red/blue/green/amber/purple/
 * steel/dark). Presence dots (online/away/offline) attach via `AvatarWrap` +
 * `AvatarPresence`, and overlapping stacks via `AvatarGroup`.
 */
const avatarVariants = cva(
  "tri-relative tri-flex tri-shrink-0 tri-overflow-hidden",
  {
    variants: {
      size: {
        xs: "tri-h-6 tri-w-6 tri-text-[10px]",
        s: "tri-h-8 tri-w-8 tri-text-xs",
        m: "tri-h-10 tri-w-10 tri-text-sm",
        l: "tri-h-14 tri-w-14 tri-text-lg",
        xl: "tri-h-20 tri-w-20 tri-text-2xl",
      },
      shape: {
        circle: "tri-rounded-pill",
        rounded: "tri-rounded-lg",
        square: "tri-rounded-sm",
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
    className={cn("tri-aspect-square tri-h-full tri-w-full tri-object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/** Named tint tokens for initials / icon fallbacks (DS `.c-*`). */
const avatarFallbackColors = {
  neutral: "tri-bg-[#eeeeee] tri-text-[#404040]",
  red: "tri-bg-[#fbe5e8] tri-text-[#a81b28]",
  blue: "tri-bg-[#ECF6FF] tri-text-[#155a96]",
  green: "tri-bg-[#EAF4EA] tri-text-[#256628]",
  amber: "tri-bg-[#FDF0E2] tri-text-[#c45800]",
  purple: "tri-bg-[#efe6f8] tri-text-[#5e3792]",
  steel: "tri-bg-[#e6e7e8] tri-text-[#525252]",
  dark: "tri-bg-[#0b0b0d] tri-text-white",
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
      "tri-flex tri-h-full tri-w-full tri-items-center tri-justify-center tri-font-semibold [&_svg]:tri-size-[45%]",
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
    className={cn("tri-relative tri-inline-flex", className)}
    {...props}
  />
))
AvatarWrap.displayName = "AvatarWrap"

const presenceColors = {
  online: "tri-bg-[#2E7D32]",
  away: "tri-bg-[#D14900]",
  offline: "tri-bg-[#a1a1aa]",
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
      "tri-absolute -tri-bottom-0.5 -tri-right-0.5 tri-z-[1] tri-size-3.5 tri-rounded-pill tri-border-2 tri-border-white tri-shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
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
      "tri-inline-flex [&>*]:tri-border-2 [&>*]:tri-border-white [&>*:not(:first-child)]:-tri-ml-2.5",
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
