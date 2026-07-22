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
              "flex min-h-9 w-full cursor-text flex-wrap items-center gap-1.5 rounded-sm border border-input bg-background px-2 py-1.5 text-sm transition-colors focus-within:border-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
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
                className="inline-flex items-center gap-1 rounded-xs bg-[var(--brand-gray)] px-1.5 py-0.5 text-xs text-foreground"
              >
                {o.label}
                <button
                  type="button"
                  aria-label={`Remove ${o.label}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggle(o.value)
                  }}
                  className="text-[var(--fg-muted)] hover:text-foreground"
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
              className="h-6 min-w-[60px] flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[--radix-popover-trigger-width] p-1"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {filtered.length === 0 ? (
            <div className="px-2 py-3 text-center text-[13px] text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <div role="listbox" className="max-h-64 overflow-y-auto">
              {filtered.map((o) => (
                <div
                  key={o.value}
                  role="option"
                  aria-selected={false}
                  onClick={() => toggle(o.value)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-1.5 hover:bg-brand-sky"
                >
                  {o.leading}
                  <span className="flex flex-col">
                    <span className="text-sm text-foreground">{o.label}</span>
                    {o.description && (
                      <span className="text-[11px] text-muted-foreground">
                        {o.description}
                      </span>
                    )}
                  </span>
                  <Check className="ml-auto size-4 opacity-0" />
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
