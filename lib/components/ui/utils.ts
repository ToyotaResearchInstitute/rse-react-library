import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// All library utilities are namespaced with the `tri-` prefix (see
// lib/tailwind.config.ts). tailwind-merge must be told about that prefix so it
// still recognises and de-dupes conflicting utilities (e.g. `tri-px-2 tri-px-4`).
const twMerge = extendTailwindMerge({ prefix: "tri-" })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
