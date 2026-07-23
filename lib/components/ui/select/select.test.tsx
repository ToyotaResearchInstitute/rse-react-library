import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Select, type OptionType } from "./select"

const OPTIONS: OptionType[] = [
  { label: "Development", value: "dev" },
  { label: "Staging", value: "staging", meta: "staging" },
  { label: "Production", value: "prod" },
  { label: "Archived", value: "archived", disabled: true },
]

/** Controlled wrapper — Select expects value + a setState-style onChange. */
function Harness({
  options = OPTIONS,
  id = "env",
  initial = "",
  onChange,
}: {
  options?: OptionType[]
  id?: string
  initial?: string
  onChange?: (v: string) => void
}) {
  const [value, setValue] = React.useState(initial)
  return (
    <Select
      id={id}
      options={options}
      value={value}
      onChange={(v) => {
        const next = typeof v === "function" ? (v as (p: string) => string)(value) : v
        onChange?.(next)
        setValue(next)
      }}
    />
  )
}

describe("Select (wrapper)", () => {
  it("renders the trigger with the placeholder and no selection", () => {
    render(<Harness />)
    const trigger = screen.getByRole("combobox")
    expect(trigger).toHaveTextContent("Select an option")
  })

  it("applies the id and data-testid to the trigger", () => {
    render(<Harness id="env" />)
    const trigger = screen.getByRole("combobox")
    expect(trigger).toHaveAttribute("id", "env")
    expect(trigger).toHaveAttribute("data-testid", "select-dropdown-env")
  })

  it("opens and lists all options", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("combobox"))
    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).getByRole("option", { name: "Development" })).toBeInTheDocument()
    expect(within(listbox).getByRole("option", { name: /Staging/ })).toBeInTheDocument()
    expect(within(listbox).getByRole("option", { name: "Production" })).toBeInTheDocument()
  })

  it("selects an option and reflects it on the trigger + fires onChange", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await user.click(screen.getByRole("combobox"))
    await user.click(await screen.findByRole("option", { name: "Production" }))
    expect(onChange).toHaveBeenCalledWith("prod")
    expect(screen.getByRole("combobox")).toHaveTextContent("Production")
  })

  it("shows an initially-selected value", () => {
    render(<Harness initial="dev" />)
    expect(screen.getByRole("combobox")).toHaveTextContent("Development")
  })

  it("renders an option's meta tag", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("combobox"))
    await screen.findByRole("listbox")
    expect(screen.getByText("staging")).toBeInTheDocument()
  })

  it("does not select a disabled option", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await user.click(screen.getByRole("combobox"))
    const archived = await screen.findByRole("option", { name: "Archived" })
    expect(archived).toHaveAttribute("data-disabled")
    await user.click(archived)
    expect(onChange).not.toHaveBeenCalled()
  })

  it("renders with an empty option list without crashing", async () => {
    const user = userEvent.setup()
    render(<Harness options={[]} />)
    const trigger = screen.getByRole("combobox")
    expect(trigger).toHaveTextContent("Select an option")
    await user.click(trigger)
    // opening an empty select shows a listbox with no options (or none at all)
    expect(screen.queryByRole("option")).not.toBeInTheDocument()
  })

  it("handles duplicate labels distinguished by value", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Harness
        options={[
          { label: "Same", value: "one" },
          { label: "Same", value: "two" },
        ]}
        onChange={onChange}
      />
    )
    await user.click(screen.getByRole("combobox"))
    const opts = await screen.findAllByRole("option", { name: "Same" })
    expect(opts).toHaveLength(2)
    await user.click(opts[1]!)
    expect(onChange).toHaveBeenCalledWith("two")
  })

  it("renders a long list of options", async () => {
    const user = userEvent.setup()
    const many: OptionType[] = Array.from({ length: 50 }, (_, i) => ({
      label: `Item ${i}`,
      value: `item-${i}`,
    }))
    render(<Harness options={many} />)
    await user.click(screen.getByRole("combobox"))
    await screen.findByRole("listbox")
    expect(screen.getByRole("option", { name: "Item 0" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Item 49" })).toBeInTheDocument()
  })
})
