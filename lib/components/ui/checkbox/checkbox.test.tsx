import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders with role checkbox", () => {
    render(<Checkbox aria-label="agree" />)
    expect(screen.getByRole("checkbox", { name: "agree" })).toBeInTheDocument()
  })

  it("defaults to unchecked", () => {
    render(<Checkbox aria-label="cb" />)
    const cb = screen.getByRole("checkbox")
    expect(cb).toHaveAttribute("aria-checked", "false")
    expect(cb).toHaveAttribute("data-state", "unchecked")
  })

  it("toggles when clicked (uncontrolled)", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="cb" />)
    const cb = screen.getByRole("checkbox")

    await user.click(cb)
    expect(cb).toHaveAttribute("aria-checked", "true")
    expect(cb).toHaveAttribute("data-state", "checked")

    await user.click(cb)
    expect(cb).toHaveAttribute("aria-checked", "false")
  })

  it("respects defaultChecked (uncontrolled)", () => {
    render(<Checkbox aria-label="cb" defaultChecked />)
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true")
  })

  it("calls onCheckedChange with the new value", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="cb" onCheckedChange={onCheckedChange} />)

    await user.click(screen.getByRole("checkbox"))
    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("stays fixed in controlled mode until prop changes", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    const { rerender } = render(
      <Checkbox aria-label="cb" checked={false} onCheckedChange={onCheckedChange} />
    )
    const cb = screen.getByRole("checkbox")
    expect(cb).toHaveAttribute("aria-checked", "false")

    await user.click(cb)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    // still false because controlled and parent didn't update
    expect(cb).toHaveAttribute("aria-checked", "false")

    rerender(
      <Checkbox aria-label="cb" checked onCheckedChange={onCheckedChange} />
    )
    expect(cb).toHaveAttribute("aria-checked", "true")
  })

  it("renders the check indicator when checked", () => {
    const { container } = render(<Checkbox aria-label="cb" checked />)
    // lucide Check renders an svg inside the indicator
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("supports the indeterminate state", () => {
    render(<Checkbox aria-label="cb" checked="indeterminate" />)
    const cb = screen.getByRole("checkbox")
    expect(cb).toHaveAttribute("data-state", "indeterminate")
    expect(cb).toHaveAttribute("aria-checked", "mixed")
  })

  it("is disabled and does not toggle", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="cb" disabled onCheckedChange={onCheckedChange} />)
    const cb = screen.getByRole("checkbox")

    expect(cb).toBeDisabled()
    await user.click(cb)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it.each([
    ["ink", "data-[state=checked]:bg-primary"],
    ["brand", "data-[state=checked]:bg-brand"],
    ["blue", "data-[state=checked]:bg-info"],
  ] as const)("applies color=%s classes", (color, expectedClass) => {
    render(<Checkbox aria-label="cb" color={color} />)
    expect(screen.getByRole("checkbox")).toHaveClass(expectedClass)
  })

  it("defaults to ink color when unspecified", () => {
    render(<Checkbox aria-label="cb" />)
    expect(screen.getByRole("checkbox")).toHaveClass(
      "data-[state=checked]:bg-primary"
    )
  })

  it("merges a custom className", () => {
    render(<Checkbox aria-label="cb" className="custom-class" />)
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class")
  })

  it("forwards ref to the underlying element", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Checkbox aria-label="cb" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it("toggles via keyboard (space)", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="cb" />)
    const cb = screen.getByRole("checkbox")
    cb.focus()
    await user.keyboard(" ")
    expect(cb).toHaveAttribute("aria-checked", "true")
  })
})
