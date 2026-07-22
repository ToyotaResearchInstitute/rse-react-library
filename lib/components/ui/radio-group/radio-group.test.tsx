import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { RadioGroup, RadioGroupItem } from "./radio-group"

function renderGroup(props: React.ComponentProps<typeof RadioGroup> = {}) {
  return render(
    <RadioGroup aria-label="fruit" {...props}>
      <RadioGroupItem value="apple" aria-label="apple" />
      <RadioGroupItem value="banana" aria-label="banana" />
      <RadioGroupItem value="cherry" aria-label="cherry" />
    </RadioGroup>
  )
}

describe("RadioGroup", () => {
  it("renders items with role radio", () => {
    renderGroup()
    expect(screen.getAllByRole("radio")).toHaveLength(3)
    expect(screen.getByRole("radio", { name: "apple" })).toBeInTheDocument()
  })

  it("has no selection by default", () => {
    renderGroup()
    screen
      .getAllByRole("radio")
      .forEach((r) => expect(r).toHaveAttribute("aria-checked", "false"))
  })

  it("selects the defaultValue item (uncontrolled)", () => {
    renderGroup({ defaultValue: "banana" })
    expect(screen.getByRole("radio", { name: "banana" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
    expect(screen.getByRole("radio", { name: "apple" })).toHaveAttribute(
      "aria-checked",
      "false"
    )
  })

  it("selects an item on click and calls onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderGroup({ onValueChange })

    await user.click(screen.getByRole("radio", { name: "cherry" }))
    expect(onValueChange).toHaveBeenCalledWith("cherry")
    expect(screen.getByRole("radio", { name: "cherry" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
  })

  it("only one item is selected at a time", async () => {
    const user = userEvent.setup()
    renderGroup()
    await user.click(screen.getByRole("radio", { name: "apple" }))
    await user.click(screen.getByRole("radio", { name: "banana" }))

    expect(screen.getByRole("radio", { name: "apple" })).toHaveAttribute(
      "aria-checked",
      "false"
    )
    expect(screen.getByRole("radio", { name: "banana" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
  })

  it("respects controlled value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <RadioGroup aria-label="fruit" value="apple" onValueChange={onValueChange}>
        <RadioGroupItem value="apple" aria-label="apple" />
        <RadioGroupItem value="banana" aria-label="banana" />
      </RadioGroup>
    )
    await user.click(screen.getByRole("radio", { name: "banana" }))
    expect(onValueChange).toHaveBeenCalledWith("banana")
    // controlled: still apple
    expect(screen.getByRole("radio", { name: "apple" })).toHaveAttribute(
      "aria-checked",
      "true"
    )

    rerender(
      <RadioGroup aria-label="fruit" value="banana" onValueChange={onValueChange}>
        <RadioGroupItem value="apple" aria-label="apple" />
        <RadioGroupItem value="banana" aria-label="banana" />
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "banana" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
  })

  it("moves roving focus with arrow keys", async () => {
    // NOTE: In this Radix version under jsdom, arrow keys move the roving
    // focus between items but do not automatically select / fire
    // onValueChange (selection happens on click / Space). We assert the
    // actual focus-movement behavior here.
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderGroup({ defaultValue: "apple", onValueChange })

    screen.getByRole("radio", { name: "apple" }).focus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("radio", { name: "banana" })).toHaveFocus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("radio", { name: "cherry" })).toHaveFocus()
  })

  it("selects the focused item via Space", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderGroup({ onValueChange })

    const banana = screen.getByRole("radio", { name: "banana" })
    banana.focus()
    await user.keyboard(" ")
    expect(onValueChange).toHaveBeenCalledWith("banana")
    expect(banana).toHaveAttribute("aria-checked", "true")
  })

  it("disables a single item so it cannot be selected", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup aria-label="fruit" onValueChange={onValueChange}>
        <RadioGroupItem value="apple" aria-label="apple" disabled />
        <RadioGroupItem value="banana" aria-label="banana" />
      </RadioGroup>
    )
    const apple = screen.getByRole("radio", { name: "apple" })
    expect(apple).toBeDisabled()
    await user.click(apple)
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("disables the whole group", () => {
    renderGroup({ disabled: true })
    screen.getAllByRole("radio").forEach((r) => expect(r).toBeDisabled())
  })

  it.each([
    ["ink", "data-[state=checked]:border-primary"],
    ["brand", "data-[state=checked]:border-brand"],
    ["blue", "data-[state=checked]:border-info"],
  ] as const)("applies item color=%s classes", (color, expectedClass) => {
    render(
      <RadioGroup aria-label="fruit">
        <RadioGroupItem value="apple" aria-label="apple" color={color} />
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "apple" })).toHaveClass(
      expectedClass
    )
  })

  it("merges custom className on group and item", () => {
    render(
      <RadioGroup aria-label="fruit" className="group-class">
        <RadioGroupItem value="apple" aria-label="apple" className="item-class" />
      </RadioGroup>
    )
    expect(screen.getByRole("radiogroup")).toHaveClass("group-class")
    expect(screen.getByRole("radio", { name: "apple" })).toHaveClass("item-class")
  })

  it("forwards refs", () => {
    const groupRef = createRef<HTMLDivElement>()
    const itemRef = createRef<HTMLButtonElement>()
    render(
      <RadioGroup aria-label="fruit" ref={groupRef}>
        <RadioGroupItem value="apple" aria-label="apple" ref={itemRef} />
      </RadioGroup>
    )
    expect(groupRef.current).not.toBeNull()
    expect(itemRef.current).not.toBeNull()
  })
})
