import * as React from "react"
import { Search as SearchIcon } from "lucide-react"

import { cn } from "../utils"
import { Dialog, DialogContent } from "../dialog"

/**
 * TRI Command palette (⌘K). Hand-rolled (no `cmdk` dependency) on top of the
 * library Dialog. Per the design-system "Search → Command palette" preview:
 * a 560px modal with a heavy elevation, a leading search icon + large input +
 * trailing `esc` hint over a borderless grouped results list. Items support a
 * leading icon and a right-aligned keyboard shortcut; the active row is tinted
 * brand-sky (#ECF6FF). Supports substring filtering and up/down + enter nav.
 */

interface CommandContextValue {
  search: string
  activeValue: string | null
  setActiveValue: (v: string | null) => void
  register: (value: string) => void
  unregister: (value: string) => void
}

const CommandContext = React.createContext<CommandContextValue | null>(null)

function useCommand() {
  const ctx = React.useContext(CommandContext)
  if (!ctx) throw new Error("Command components must be used within <Command>")
  return ctx
}

const matches = (value: string, search: string) =>
  value.toLowerCase().includes(search.trim().toLowerCase())

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fired when an item is chosen (by click or Enter). */
  onValueSelect?: (value: string) => void
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, children, onValueSelect, ...props }, ref) => {
    const [search, setSearch] = React.useState("")
    const [activeValue, setActiveValue] = React.useState<string | null>(null)
    // Ordered registry of currently-mounted (visible) item values.
    const itemsRef = React.useRef<string[]>([])

    const register = React.useCallback((value: string) => {
      if (!itemsRef.current.includes(value)) itemsRef.current.push(value)
    }, [])
    const unregister = React.useCallback((value: string) => {
      itemsRef.current = itemsRef.current.filter((v) => v !== value)
    }, [])

    // Keep a valid item selected as the list filters in/out. Child item
    // register/unregister effects run before this parent effect in the same
    // commit, so `itemsRef` is current here. Keyed on `search` (the filter
    // driver) and `activeValue` so a stale selection is corrected.
    React.useEffect(() => {
      const list = itemsRef.current
      if (list.length === 0) {
        if (activeValue !== null) setActiveValue(null)
      } else if (!activeValue || !list.includes(activeValue)) {
        setActiveValue(list[0] ?? null)
      }
    }, [search, activeValue])

    const move = (dir: 1 | -1) => {
      const list = itemsRef.current
      if (list.length === 0) return
      const idx = activeValue ? list.indexOf(activeValue) : -1
      const next = (idx + dir + list.length) % list.length
      setActiveValue(list[next] ?? null)
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        move(1)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        move(-1)
      } else if (e.key === "Enter" && activeValue) {
        e.preventDefault()
        onValueSelect?.(activeValue)
      }
    }

    return (
      <CommandContext.Provider
        value={{ search, activeValue, setActiveValue, register, unregister }}
      >
        <div
          ref={ref}
          className={cn("tri-flex tri-flex-col tri-overflow-hidden", className)}
          onKeyDown={onKeyDown}
          {...props}
        >
          {/* Controlled search state is threaded via context; expose the setter
              to CommandInput through a cloned child would be brittle, so we use
              a nested provider value swap here. */}
          <CommandSearchContext.Provider value={{ search, setSearch }}>
            {children}
          </CommandSearchContext.Provider>
        </div>
      </CommandContext.Provider>
    )
  }
)
Command.displayName = "Command"

const CommandSearchContext = React.createContext<{
  search: string
  setSearch: (s: string) => void
} | null>(null)

const CommandInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    /** Show the trailing `esc` hint. */
    showEsc?: boolean
  }
>(({ className, showEsc = true, placeholder = "Type a command or search…", ...props }, ref) => {
  const ctx = React.useContext(CommandSearchContext)
  return (
    <div className="tri-flex tri-items-center tri-gap-3 tri-border-b tri-border-border tri-px-4">
      <SearchIcon className="tri-size-[18px] tri-shrink-0 tri-text-muted-foreground" />
      <input
        ref={ref}
        autoFocus
        value={ctx?.search ?? ""}
        onChange={(e) => ctx?.setSearch(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "tri-h-12 tri-flex-1 tri-border-none tri-bg-transparent tri-text-sm tri-text-foreground tri-outline-none placeholder:tri-text-muted-foreground",
          className
        )}
        {...props}
      />
      {showEsc && (
        <kbd className="tri-rounded-xs tri-border tri-border-border tri-bg-muted tri-px-1.5 tri-py-0.5 tri-font-mono tri-text-[11px] tri-text-muted-foreground">
          esc
        </kbd>
      )}
    </div>
  )
})
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="listbox"
    className={cn("tri-max-h-[360px] tri-overflow-y-auto tri-overflow-x-hidden tri-p-2", className)}
    {...props}
  />
))
CommandList.displayName = "CommandList"

const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { heading?: React.ReactNode }
>(({ className, heading, children, ...props }, ref) => (
  <div ref={ref} className={cn("tri-pb-1", className)} {...props}>
    {heading && (
      <div className="tri-px-2 tri-pb-1 tri-pt-2 tri-font-mono tri-text-[10px] tri-font-semibold tri-uppercase tri-tracking-[0.08em] tri-text-[var(--tri-neutral-300)]">
        {heading}
      </div>
    )}
    {children}
  </div>
))
CommandGroup.displayName = "CommandGroup"

interface CommandItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** The searchable / selectable value. Defaults to the text content. */
  value: string
  /** Extra keywords to match against the search query. */
  keywords?: string[]
  onSelect?: (value: string) => void
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value, keywords = [], onSelect, children, ...props }, ref) => {
    const { search, activeValue, setActiveValue, register, unregister } =
      useCommand()
    const haystack = [value, ...keywords].join(" ")
    const visible = search.trim() === "" || matches(haystack, search)

    React.useEffect(() => {
      if (visible) {
        register(value)
        return () => unregister(value)
      }
      return undefined
    }, [visible, value, register, unregister])

    if (!visible) return null
    const active = activeValue === value

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={active}
        data-active={active ? "" : undefined}
        onMouseEnter={() => setActiveValue(value)}
        onClick={() => onSelect?.(value)}
        className={cn(
          "tri-flex tri-cursor-pointer tri-select-none tri-items-center tri-gap-2.5 tri-rounded-sm tri-px-2 tri-py-2 tri-text-sm tri-text-foreground [&_svg]:tri-size-4 [&_svg]:tri-shrink-0 [&_svg]:tri-text-[var(--tri-neutral-600)]",
          active && "tri-bg-brand-sky",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CommandItem.displayName = "CommandItem"

/** Right-aligned keyboard shortcut hint for a command item. */
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "tri-ml-auto tri-font-mono tri-text-[11px] tri-tracking-normal tri-text-[var(--tri-neutral-300)]",
      className
    )}
    {...props}
  />
)
CommandShortcut.displayName = "CommandShortcut"

const CommandEmpty = ({
  className,
  children = "No results found.",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { search } = useCommand()
  // Rendered by the consumer; only meaningful when a search is active. We keep
  // it simple: always render, consumers can gate on their own filtered count.
  if (search.trim() === "") return null
  return (
    <div
      className={cn("tri-px-2 tri-py-6 tri-text-center tri-text-[13px] tri-text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
}
CommandEmpty.displayName = "CommandEmpty"

const CommandSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("-tri-mx-2 tri-my-1 tri-h-px tri-bg-[var(--tri-neutral-150)]", className)} {...props} />
)
CommandSeparator.displayName = "CommandSeparator"

interface CommandDialogProps extends CommandProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/** Command palette wrapped in the library Dialog (560px, no close button). */
const CommandDialog = ({
  open,
  onOpenChange,
  children,
  ...props
}: CommandDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      hideClose
      className="tri-max-w-[560px] tri-gap-0 tri-overflow-hidden tri-p-0 tri-shadow-[0_24px_64px_rgba(0,0,0,0.24)]"
    >
      <Command {...props}>{children}</Command>
    </DialogContent>
  </Dialog>
)
CommandDialog.displayName = "CommandDialog"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandEmpty,
  CommandSeparator,
}
