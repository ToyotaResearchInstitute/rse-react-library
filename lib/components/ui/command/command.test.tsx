import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandEmpty,
  CommandSeparator,
} from "./command"

function BasicCommand({
  onValueSelect,
  onItemSelect,
}: {
  onValueSelect?: (v: string) => void
  onItemSelect?: (v: string) => void
}) {
  return (
    <Command onValueSelect={onValueSelect}>
      <CommandInput />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar" onSelect={onItemSelect}>
            Calendar
          </CommandItem>
          <CommandItem value="search-emoji" onSelect={onItemSelect}>
            Search Emoji
          </CommandItem>
          <CommandItem value="calculator" onSelect={onItemSelect}>
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  )
}

describe("Command", () => {
  it("renders the input and all items initially", () => {
    render(<BasicCommand />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByText("Calendar")).toBeInTheDocument()
    expect(screen.getByText("Search Emoji")).toBeInTheDocument()
    expect(screen.getByText("Calculator")).toBeInTheDocument()
  })

  it("renders the group heading", () => {
    render(<BasicCommand />)
    expect(screen.getByText("Suggestions")).toBeInTheDocument()
  })

  it("renders the search input with the default placeholder", () => {
    render(<BasicCommand />)
    expect(
      screen.getByPlaceholderText("Type a command or search…")
    ).toBeInTheDocument()
  })

  it("shows the esc hint by default and hides it when showEsc is false", () => {
    const { rerender } = render(
      <Command>
        <CommandInput />
      </Command>
    )
    expect(screen.getByText("esc")).toBeInTheDocument()
    rerender(
      <Command>
        <CommandInput showEsc={false} />
      </Command>
    )
    expect(screen.queryByText("esc")).not.toBeInTheDocument()
  })

  it("filters items by substring as the user types", async () => {
    const user = userEvent.setup()
    render(<BasicCommand />)
    await user.type(screen.getByRole("textbox"), "cal")
    // "Calendar" and "Calculator" match "cal"; "Search Emoji" does not
    expect(screen.getByText("Calendar")).toBeInTheDocument()
    expect(screen.getByText("Calculator")).toBeInTheDocument()
    expect(screen.queryByText("Search Emoji")).not.toBeInTheDocument()
  })

  it("matches against extra keywords", async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandItem value="profile" keywords={["account", "user"]}>
            Profile
          </CommandItem>
        </CommandList>
      </Command>
    )
    await user.type(screen.getByRole("textbox"), "account")
    expect(screen.getByText("Profile")).toBeInTheDocument()
  })

  it("shows CommandEmpty only when a search is active and nothing matches", async () => {
    const user = userEvent.setup()
    render(<BasicCommand />)
    // Not shown while query is empty
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument()
    await user.type(screen.getByRole("textbox"), "zzzz")
    expect(screen.getByText("No results found.")).toBeInTheDocument()
    // all items filtered out
    expect(screen.queryByText("Calendar")).not.toBeInTheDocument()
  })

  it("fires the item's onSelect with its value on click", async () => {
    const user = userEvent.setup()
    const onItemSelect = vi.fn()
    render(<BasicCommand onItemSelect={onItemSelect} />)
    await user.click(screen.getByText("Search Emoji"))
    expect(onItemSelect).toHaveBeenCalledWith("search-emoji")
  })

  it("marks the first visible item active by default", async () => {
    render(<BasicCommand />)
    // effect selects first item; find option by its value text
    const calendar = screen.getByText("Calendar").closest('[role="option"]')
    expect(calendar).toHaveAttribute("aria-selected", "true")
  })

  it("navigates with ArrowDown / ArrowUp and selects with Enter", async () => {
    const user = userEvent.setup()
    const onValueSelect = vi.fn()
    render(<BasicCommand onValueSelect={onValueSelect} />)
    const input = screen.getByRole("textbox")
    input.focus()
    // first active = calendar; ArrowDown -> search-emoji
    await user.keyboard("{ArrowDown}")
    await user.keyboard("{Enter}")
    expect(onValueSelect).toHaveBeenCalledWith("search-emoji")
  })

  it("wraps around when navigating up from the first item", async () => {
    const user = userEvent.setup()
    const onValueSelect = vi.fn()
    render(<BasicCommand onValueSelect={onValueSelect} />)
    const input = screen.getByRole("textbox")
    input.focus()
    // first active = calendar; ArrowUp wraps to last (calculator)
    await user.keyboard("{ArrowUp}")
    await user.keyboard("{Enter}")
    expect(onValueSelect).toHaveBeenCalledWith("calculator")
  })

  it("sets the active item on mouse enter", async () => {
    const user = userEvent.setup()
    const onValueSelect = vi.fn()
    render(<BasicCommand onValueSelect={onValueSelect} />)
    await user.hover(screen.getByText("Calculator"))
    const input = screen.getByRole("textbox")
    input.focus()
    await user.keyboard("{Enter}")
    expect(onValueSelect).toHaveBeenCalledWith("calculator")
  })

  it("renders a CommandShortcut and CommandSeparator", () => {
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandItem value="copy">
            Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandSeparator data-testid="sep" />
        </CommandList>
      </Command>
    )
    expect(screen.getByText("⌘C")).toBeInTheDocument()
    expect(screen.getByTestId("sep")).toBeInTheDocument()
  })

  it("keeps active selection valid after the list filters down", async () => {
    const user = userEvent.setup()
    const onValueSelect = vi.fn()
    render(<BasicCommand onValueSelect={onValueSelect} />)
    const input = screen.getByRole("textbox")
    await user.type(input, "calc")
    // only "Calculator" remains; it should become active
    input.focus()
    await user.keyboard("{Enter}")
    expect(onValueSelect).toHaveBeenCalledWith("calculator")
  })

  it("throws if a Command child is used outside <Command>", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    expect(() =>
      render(<CommandItem value="orphan">Orphan</CommandItem>)
    ).toThrow(/must be used within <Command>/)
    spy.mockRestore()
  })
})

describe("CommandDialog", () => {
  it("renders content when open and hides it when closed", () => {
    const { rerender } = render(
      <CommandDialog open={false}>
        <CommandInput />
        <CommandList>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandList>
      </CommandDialog>
    )
    expect(screen.queryByText("Settings")).not.toBeInTheDocument()

    rerender(
      <CommandDialog open>
        <CommandInput />
        <CommandList>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandList>
      </CommandDialog>
    )
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })

  it("fires an item's onSelect through the dialog on click", async () => {
    const user = userEvent.setup()
    const onItemSelect = vi.fn()
    render(
      <CommandDialog open>
        <CommandInput />
        <CommandList>
          <CommandItem value="settings" onSelect={onItemSelect}>
            Settings
          </CommandItem>
        </CommandList>
      </CommandDialog>
    )
    await user.click(screen.getByText("Settings"))
    expect(onItemSelect).toHaveBeenCalledWith("settings")
  })
})
