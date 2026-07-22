import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Multiselect } from "./multiselect"

const OPTIONS = ["Apple", "Banana", "Cherry"]

/** Controlled wrapper owning the selected-options state. */
function Harness({
  label = "Select fruit",
  options = OPTIONS,
  initial = [],
  onChange,
}: {
  label?: string
  options?: string[]
  initial?: string[]
  onChange?: (v: string[]) => void
}) {
  const [selected, setSelected] = React.useState<string[]>(initial)
  return (
    <Multiselect
      label={label}
      options={options}
      selectedOptions={selected}
      setSelectedOptions={(v) => {
        // support functional + direct updates
        setSelected((prev) => {
          const next = typeof v === "function" ? (v as (p: string[]) => string[])(prev) : v
          onChange?.(next)
          return next
        })
      }}
    />
  )
}

/**
 * The Radix trigger is a real <button> element; chip remove controls are
 * <span role="button">. Filter by tag so a chip's text/label can't be confused
 * with the trigger.
 */
function getTrigger() {
  const trigger = screen
    .getAllByRole("button")
    .find((el) => el.tagName === "BUTTON" && el.hasAttribute("aria-haspopup"))
  if (!trigger) throw new Error("trigger not found")
  return trigger
}

/**
 * Find an option button inside the open popover by its text. The trigger button
 * can share the same accessible name (it holds the selected chip), so exclude
 * anything carrying aria-haspopup (the trigger).
 */
async function findOption(name: string) {
  const options = await screen.findAllByRole("button", { name })
  const opt = options.find((el) => !el.hasAttribute("aria-haspopup"))
  if (!opt) throw new Error(`option "${name}" not found`)
  return opt
}

/** Open the popover by clicking the trigger and return the option list container. */
async function openMenu(user: ReturnType<typeof userEvent.setup>, _triggerName?: RegExp | string) {
  await user.click(getTrigger())
  // options render as buttons in the portal; wait for the first one
  return screen.findByRole("button", { name: OPTIONS[0] })
}

describe("Multiselect", () => {
  it("renders the label when nothing is selected", () => {
    render(<Harness label="Pick some" />)
    expect(screen.getByRole("button", { name: "Pick some" })).toBeInTheDocument()
  })

  it("opens the popover and lists all options", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await openMenu(user, "Select fruit")
    OPTIONS.forEach((opt) => {
      expect(screen.getByRole("button", { name: opt })).toBeInTheDocument()
    })
  })

  it("renders a checkbox for each option", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await openMenu(user, "Select fruit")
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
  })

  it("selects an option, adding it to the selection", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await openMenu(user, "Select fruit")
    await user.click(screen.getByRole("button", { name: "Banana" }))
    expect(onChange).toHaveBeenLastCalledWith(["Banana"])
  })

  it("renders selected options as chips in the trigger", async () => {
    render(<Harness initial={["Apple", "Cherry"]} />)
    // chips show the label text and a remove control
    expect(
      screen.getByRole("button", { name: "Remove Apple" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Remove Cherry" })
    ).toBeInTheDocument()
  })

  it("deselects an already-selected option when clicked in the menu", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness initial={["Apple"]} onChange={onChange} />)
    // open menu (trigger name now includes the chip text + remove label)
    await user.click(getTrigger())
    const appleOption = await findOption("Apple")
    await user.click(appleOption)
    expect(onChange).toHaveBeenLastCalledWith([])
  })

  it("reflects the checked state of selected options in the menu", async () => {
    const user = userEvent.setup()
    render(<Harness initial={["Banana"]} />)
    await user.click(getTrigger())
    const bananaOption = await findOption("Banana")
    const checkbox = within(bananaOption).getByRole("checkbox")
    expect(checkbox).toHaveAttribute("data-state", "checked")
  })

  it("removes a selected option via its chip remove button", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness initial={["Apple", "Banana"]} onChange={onChange} />)
    await user.click(screen.getByRole("button", { name: "Remove Apple" }))
    expect(onChange).toHaveBeenLastCalledWith(["Banana"])
    expect(
      screen.queryByRole("button", { name: "Remove Apple" })
    ).not.toBeInTheDocument()
  })

  it("removes a chip via keyboard (Enter) on the remove control", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness initial={["Apple"]} onChange={onChange} />)
    const remove = screen.getByRole("button", { name: "Remove Apple" })
    remove.focus()
    await user.keyboard("{Enter}")
    expect(onChange).toHaveBeenLastCalledWith([])
  })

  it("supports selecting multiple options cumulatively", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)
    await openMenu(user, "Select fruit")
    await user.click(screen.getByRole("button", { name: "Apple" }))
    await user.click(screen.getByRole("button", { name: "Cherry" }))
    expect(onChange).toHaveBeenLastCalledWith(["Apple", "Cherry"])
  })

  it("renders an empty option list without error", async () => {
    const user = userEvent.setup()
    render(<Harness options={[]} label="Empty" />)
    await user.click(screen.getByRole("button", { name: "Empty" }))
    // no option buttons besides the trigger
    expect(
      screen.queryByRole("button", { name: "Apple" })
    ).not.toBeInTheDocument()
  })
})
