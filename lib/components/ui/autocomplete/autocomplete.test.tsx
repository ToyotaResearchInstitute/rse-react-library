import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Autocomplete, type AutocompleteOption } from "./autocomplete"

const OPTIONS: AutocompleteOption[] = [
  { value: "alice", label: "Alice Adams", description: "alice@example.com" },
  { value: "bob", label: "Bob Brown", description: "bob@example.com" },
  { value: "carol", label: "Carol Clark", description: "carol@work.com" },
]

/** Controlled wrapper that owns the selected-values state. */
function Harness({
  options = OPTIONS,
  initial = [],
  onValueChange,
  ...rest
}: {
  options?: AutocompleteOption[]
  initial?: string[]
  onValueChange?: (v: string[]) => void
  placeholder?: string
  emptyText?: string
}) {
  const [value, setValue] = React.useState<string[]>(initial)
  return (
    <Autocomplete
      options={options}
      value={value}
      onValueChange={(v) => {
        setValue(v)
        onValueChange?.(v)
      }}
      {...rest}
    />
  )
}

describe("Autocomplete", () => {
  it("renders the input with the default placeholder", () => {
    render(<Harness />)
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument()
  })

  it("honours a custom placeholder", () => {
    render(<Harness placeholder="Add people" />)
    expect(screen.getByPlaceholderText("Add people")).toBeInTheDocument()
  })

  it("opens the option list on click and shows all options", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("textbox"))
    const listbox = await screen.findByRole("listbox")
    const options = within(listbox).getAllByRole("option")
    expect(options).toHaveLength(3)
    expect(within(listbox).getByText("Alice Adams")).toBeInTheDocument()
  })

  it("filters options by substring of label", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.type(input, "carol")
    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).getByText("Carol Clark")).toBeInTheDocument()
    expect(within(listbox).queryByText("Alice Adams")).not.toBeInTheDocument()
  })

  it("filters options by substring of description", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.type(input, "work.com")
    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).getByText("Carol Clark")).toBeInTheDocument()
    expect(within(listbox).queryByText("Bob Brown")).not.toBeInTheDocument()
  })

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.type(input, "zzzzz")
    expect(await screen.findByText("No matches")).toBeInTheDocument()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("honours a custom emptyText", async () => {
    const user = userEvent.setup()
    render(<Harness emptyText="Nobody here" />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.type(input, "zzzzz")
    expect(await screen.findByText("Nobody here")).toBeInTheDocument()
  })

  it("selects an option on click, creating a chip and calling onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness onValueChange={onValueChange} />)
    await user.click(screen.getByRole("textbox"))
    const listbox = await screen.findByRole("listbox")
    await user.click(within(listbox).getByText("Bob Brown"))
    expect(onValueChange).toHaveBeenCalledWith(["bob"])
    // chip appears + remove button
    expect(
      screen.getByRole("button", { name: "Remove Bob Brown" })
    ).toBeInTheDocument()
  })

  it("does not list already-selected options", async () => {
    const user = userEvent.setup()
    render(<Harness initial={["alice"]} />)
    await user.click(screen.getByRole("textbox"))
    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).queryByText("Alice Adams")).not.toBeInTheDocument()
    expect(within(listbox).getByText("Bob Brown")).toBeInTheDocument()
  })

  it("hides the placeholder once something is selected", () => {
    render(<Harness initial={["alice"]} />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("placeholder", "")
  })

  it("removes a chip via its remove button", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness initial={["alice", "bob"]} onValueChange={onValueChange} />)
    await user.click(screen.getByRole("button", { name: "Remove Alice Adams" }))
    expect(onValueChange).toHaveBeenCalledWith(["bob"])
    expect(
      screen.queryByRole("button", { name: "Remove Alice Adams" })
    ).not.toBeInTheDocument()
  })

  it("selects the first filtered option on Enter", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness onValueChange={onValueChange} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.type(input, "bob")
    await user.keyboard("{Enter}")
    expect(onValueChange).toHaveBeenCalledWith(["bob"])
  })

  it("removes the last chip on Backspace when the query is empty", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness initial={["alice", "bob"]} onValueChange={onValueChange} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.keyboard("{Backspace}")
    expect(onValueChange).toHaveBeenCalledWith(["alice"])
  })

  it("does not remove a chip on Backspace when the query is non-empty", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness initial={["alice"]} onValueChange={onValueChange} />)
    const input = screen.getByRole("textbox")
    await user.click(input)
    await user.type(input, "x")
    onValueChange.mockClear()
    await user.keyboard("{Backspace}")
    // Backspace here just edits the query text; no value change
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("clears the query after a selection", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const input = screen.getByRole<HTMLInputElement>("textbox")
    await user.click(input)
    await user.type(input, "ali")
    const listbox = await screen.findByRole("listbox")
    await user.click(within(listbox).getByText("Alice Adams"))
    expect(input.value).toBe("")
  })

  it("renders a leading node for an option", async () => {
    const user = userEvent.setup()
    render(
      <Harness
        options={[
          {
            value: "x",
            label: "With Avatar",
            leading: <span data-testid="avatar">AV</span>,
          },
        ]}
      />
    )
    await user.click(screen.getByRole("textbox"))
    await screen.findByRole("listbox")
    expect(screen.getByTestId("avatar")).toBeInTheDocument()
  })

  it("forwards a ref to the field container", () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <Autocomplete
        ref={ref}
        options={OPTIONS}
        value={[]}
        onValueChange={() => {}}
      />
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe("DIV")
  })
})
