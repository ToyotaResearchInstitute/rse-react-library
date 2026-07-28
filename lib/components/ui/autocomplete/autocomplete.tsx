import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "../utils"
import { Popover, PopoverTrigger, PopoverContent } from "../popover"

/**
 * TRI Autocomplete (multi-select combobox). Per the design-system
 * "Select & menu → Autocomplete" preview: a bordered field holding removable
 * token chips for chosen values plus a type-to-filter text input, over a
 * results menu of option rows (each may carry a leading node such as a colored
 * initials avatar and a two-line label). Substring filtering; click or Enter to
 * toggle; Backspace on an empty query removes the last chip.
 */
export interface AutocompleteOption {
  value: string
  label: string
  /** Secondary muted line (e.g. an email). */
  description?: string
  /** Leading node (e.g. an avatar or icon). */
  leading?: React.ReactNode
}

export interface AutocompleteProps {
  options: AutocompleteOption[]
  /** Selected values (controlled). */
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
  /** Text shown when no option matches the query. */
  emptyText?: string
}

const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    { options, value, onValueChange, placeholder = "Search…", className, emptyText = "No matches" },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const selected = options.filter((o) => value.includes(o.value))
    const filtered = options.filter(
      (o) =>
        !value.includes(o.value) &&
        (query.trim() === "" ||
          `${o.label} ${o.description ?? ""}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()))
    )

    const toggle = (v: string) => {
      onValueChange(
        value.includes(v) ? value.filter((x) => x !== v) : [...value, v]
      )
      setQuery("")
      inputRef.current?.focus()
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && query === "" && value.length > 0) {
        onValueChange(value.slice(0, -1))
      } else if (e.key === "Enter" && filtered[0]) {
        e.preventDefault()
        toggle(filtered[0].value)
      }
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            className={cn(
              "tri-flex tri-min-h-9 tri-w-full tri-cursor-text tri-flex-wrap tri-items-center tri-gap-1.5 tri-rounded-sm tri-border tri-border-input tri-bg-background tri-px-2 tri-py-1.5 tri-text-sm tri-transition-colors focus-within:tri-border-foreground focus-within:tri-outline-none focus-within:tri-ring-2 focus-within:tri-ring-ring focus-within:tri-ring-offset-2",
              className
            )}
            onClick={() => {
              setOpen(true)
              inputRef.current?.focus()
            }}
          >
            {selected.map((o) => (
              <span
                key={o.value}
                className="tri-inline-flex tri-items-center tri-gap-1 tri-rounded-xs tri-bg-[var(--tri-brand-gray)] tri-px-1.5 tri-py-0.5 tri-text-xs tri-text-foreground"
              >
                {o.label}
                <button
                  type="button"
                  aria-label={`Remove ${o.label}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggle(o.value)
                  }}
                  className="tri-text-[var(--tri-fg-muted)] hover:tri-text-foreground"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onKeyDown={onKeyDown}
              placeholder={selected.length === 0 ? placeholder : ""}
              className="tri-h-6 tri-min-w-[60px] tri-flex-1 tri-border-0 tri-bg-transparent tri-p-0 tri-text-sm tri-outline-none placeholder:tri-text-muted-foreground"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="tri-w-[--radix-popover-trigger-width] tri-p-1"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {filtered.length === 0 ? (
            <div className="tri-px-2 tri-py-3 tri-text-center tri-text-[13px] tri-text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <div role="listbox" className="tri-max-h-64 tri-overflow-y-auto">
              {filtered.map((o) => (
                <div
                  key={o.value}
                  role="option"
                  aria-selected={false}
                  onClick={() => toggle(o.value)}
                  className="tri-flex tri-cursor-pointer tri-items-center tri-gap-2.5 tri-rounded-sm tri-px-2 tri-py-1.5 hover:tri-bg-brand-sky"
                >
                  {o.leading}
                  <span className="tri-flex tri-flex-col">
                    <span className="tri-text-sm tri-text-foreground">{o.label}</span>
                    {o.description && (
                      <span className="tri-text-[11px] tri-text-muted-foreground">
                        {o.description}
                      </span>
                    )}
                  </span>
                  <Check className="tri-ml-auto tri-size-4 tri-opacity-0" />
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    )
  }
)
Autocomplete.displayName = "Autocomplete"

export { Autocomplete }
