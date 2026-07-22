import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./selectShadcn"

function BasicSelect(props: {
  value?: string
  defaultValue?: string
  onValueChange?: (v: string) => void
  open?: boolean
  onOpenChange?: (o: boolean) => void
  disabled?: boolean
  itemDisabled?: boolean
}) {
  return (
    <Select
      value={props.value}
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <SelectTrigger aria-label="fruit" disabled={props.disabled}>
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana" meta="ripe">
          Banana
        </SelectItem>
        <SelectItem value="cherry" disabled={props.itemDisabled}>
          Cherry
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

describe("selectShadcn primitives", () => {
  it("renders a trigger with role combobox and the placeholder", () => {
    render(<BasicSelect />)
    const trigger = screen.getByRole("combobox", { name: "fruit" })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent("Pick a fruit")
  })

  it("does not show the listbox until opened", () => {
    render(<BasicSelect />)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("opens the listbox on trigger click and shows the options", async () => {
    const user = userEvent.setup()
    render(<BasicSelect />)
    await user.click(screen.getByRole("combobox", { name: "fruit" }))
    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).getByRole("option", { name: "Apple" })).toBeInTheDocument()
    expect(within(listbox).getByRole("option", { name: /Banana/ })).toBeInTheDocument()
    expect(within(listbox).getByRole("option", { name: "Cherry" })).toBeInTheDocument()
  })

  it("selects an option on click and fires onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    await user.click(screen.getByRole("combobox", { name: "fruit" }))
    await user.click(await screen.findByRole("option", { name: "Apple" }))
    expect(onValueChange).toHaveBeenCalledWith("apple")
  })

  it("shows the selected value on the trigger (uncontrolled defaultValue)", () => {
    render(<BasicSelect defaultValue="banana" />)
    expect(screen.getByRole("combobox", { name: "fruit" })).toHaveTextContent(
      "Banana"
    )
  })

  it("reflects a controlled value on the trigger", () => {
    render(<BasicSelect value="apple" onValueChange={() => {}} />)
    expect(screen.getByRole("combobox", { name: "fruit" })).toHaveTextContent(
      "Apple"
    )
  })

  it("updates a controlled value when the parent state changes", () => {
    const { rerender } = render(
      <BasicSelect value="apple" onValueChange={() => {}} />
    )
    expect(screen.getByRole("combobox", { name: "fruit" })).toHaveTextContent(
      "Apple"
    )
    rerender(<BasicSelect value="cherry" onValueChange={() => {}} />)
    expect(screen.getByRole("combobox", { name: "fruit" })).toHaveTextContent(
      "Cherry"
    )
  })

  it("renders an item's meta tag", async () => {
    const user = userEvent.setup()
    render(<BasicSelect />)
    await user.click(screen.getByRole("combobox", { name: "fruit" }))
    await screen.findByRole("listbox")
    expect(screen.getByText("ripe")).toBeInTheDocument()
  })

  it("does not open when the trigger is disabled", async () => {
    const user = userEvent.setup()
    render(<BasicSelect disabled />)
    const trigger = screen.getByRole("combobox", { name: "fruit" })
    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("marks a disabled item and does not select it", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect itemDisabled onValueChange={onValueChange} />)
    await user.click(screen.getByRole("combobox", { name: "fruit" }))
    const cherry = await screen.findByRole("option", { name: "Cherry" })
    expect(cherry).toHaveAttribute("data-disabled")
    await user.click(cherry)
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("supports the controlled-open path", async () => {
    const onOpenChange = vi.fn()
    render(<BasicSelect open onOpenChange={onOpenChange} />)
    // With open forced true, the listbox renders immediately
    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).getByRole("option", { name: "Apple" })).toBeInTheDocument()
  })

  it("selects an option via keyboard (open + arrow + enter)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSelect onValueChange={onValueChange} />)
    const trigger = screen.getByRole("combobox", { name: "fruit" })
    trigger.focus()
    await user.keyboard("{Enter}")
    await screen.findByRole("listbox")
    await user.keyboard("{ArrowDown}{Enter}")
    expect(onValueChange).toHaveBeenCalled()
  })

  it("renders grouped items with a label and separator", async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger aria-label="grouped">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Veg</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
    await user.click(screen.getByRole("combobox", { name: "grouped" }))
    await screen.findByRole("listbox")
    expect(screen.getByText("Fruits")).toBeInTheDocument()
    expect(screen.getByText("Veg")).toBeInTheDocument()
  })
})
