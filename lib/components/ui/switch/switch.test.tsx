import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Switch } from "./switch"

describe("Switch", () => {
  it("renders with role switch", () => {
    render(<Switch aria-label="wifi" />)
    expect(screen.getByRole("switch", { name: "wifi" })).toBeInTheDocument()
  })

  it("defaults to unchecked", () => {
    render(<Switch aria-label="s" />)
    const sw = screen.getByRole("switch")
    expect(sw).toHaveAttribute("aria-checked", "false")
    expect(sw).toHaveAttribute("data-state", "unchecked")
  })

  it("toggles when clicked (uncontrolled)", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="s" />)
    const sw = screen.getByRole("switch")

    await user.click(sw)
    expect(sw).toHaveAttribute("aria-checked", "true")
    expect(sw).toHaveAttribute("data-state", "checked")

    await user.click(sw)
    expect(sw).toHaveAttribute("aria-checked", "false")
  })

  it("respects defaultChecked", () => {
    render(<Switch aria-label="s" defaultChecked />)
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
  })

  it("calls onCheckedChange with the new value", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="s" onCheckedChange={onCheckedChange} />)

    await user.click(screen.getByRole("switch"))
    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("stays fixed in controlled mode until prop changes", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    const { rerender } = render(
      <Switch aria-label="s" checked={false} onCheckedChange={onCheckedChange} />
    )
    const sw = screen.getByRole("switch")
    await user.click(sw)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(sw).toHaveAttribute("aria-checked", "false")

    rerender(<Switch aria-label="s" checked onCheckedChange={onCheckedChange} />)
    expect(sw).toHaveAttribute("aria-checked", "true")
  })

  it("is disabled and does not toggle", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="s" disabled onCheckedChange={onCheckedChange} />)
    const sw = screen.getByRole("switch")

    expect(sw).toBeDisabled()
    await user.click(sw)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it.each([
    ["ink", "data-[state=checked]:bg-primary"],
    ["brand", "data-[state=checked]:bg-brand"],
    ["blue", "data-[state=checked]:bg-info"],
  ] as const)("applies color=%s classes", (color, expectedClass) => {
    render(<Switch aria-label="s" color={color} />)
    expect(screen.getByRole("switch")).toHaveClass(expectedClass)
  })

  it("defaults to ink color when unspecified", () => {
    render(<Switch aria-label="s" />)
    expect(screen.getByRole("switch")).toHaveClass(
      "data-[state=checked]:bg-primary"
    )
  })

  it("merges a custom className", () => {
    render(<Switch aria-label="s" className="custom-class" />)
    expect(screen.getByRole("switch")).toHaveClass("custom-class")
  })

  it("forwards ref to the underlying element", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Switch aria-label="s" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it("toggles via keyboard (space)", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="s" />)
    const sw = screen.getByRole("switch")
    sw.focus()
    await user.keyboard(" ")
    expect(sw).toHaveAttribute("aria-checked", "true")
  })
})
