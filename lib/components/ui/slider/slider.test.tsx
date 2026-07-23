import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Slider } from "./slider"

describe("Slider", () => {
  it("renders a thumb with role slider", () => {
    render(<Slider aria-label="volume" defaultValue={[50]} />)
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })

  it("exposes aria-valuenow/min/max", () => {
    render(<Slider aria-label="volume" defaultValue={[30]} min={0} max={100} />)
    const slider = screen.getByRole("slider")
    expect(slider).toHaveAttribute("aria-valuenow", "30")
    expect(slider).toHaveAttribute("aria-valuemin", "0")
    expect(slider).toHaveAttribute("aria-valuemax", "100")
  })

  it("renders a single thumb by default (value [0])", () => {
    render(<Slider aria-label="volume" />)
    expect(screen.getAllByRole("slider")).toHaveLength(1)
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "0")
  })

  it("renders multiple thumbs for a range value", () => {
    render(<Slider aria-label="range" defaultValue={[20, 80]} />)
    const thumbs = screen.getAllByRole("slider")
    expect(thumbs).toHaveLength(2)
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "20")
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "80")
  })

  it("increments with ArrowRight and calls onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Slider
        aria-label="volume"
        defaultValue={[50]}
        min={0}
        max={100}
        onValueChange={onValueChange}
      />
    )
    const slider = screen.getByRole("slider")
    slider.focus()
    await user.keyboard("{ArrowRight}")

    expect(onValueChange).toHaveBeenCalledWith([51])
    expect(slider).toHaveAttribute("aria-valuenow", "51")
  })

  it("decrements with ArrowLeft", async () => {
    const user = userEvent.setup()
    render(<Slider aria-label="volume" defaultValue={[50]} min={0} max={100} />)
    const slider = screen.getByRole("slider")
    slider.focus()
    await user.keyboard("{ArrowLeft}")
    expect(slider).toHaveAttribute("aria-valuenow", "49")
  })

  it("honors the step prop", async () => {
    const user = userEvent.setup()
    render(
      <Slider aria-label="volume" defaultValue={[50]} min={0} max={100} step={10} />
    )
    const slider = screen.getByRole("slider")
    slider.focus()
    await user.keyboard("{ArrowRight}")
    expect(slider).toHaveAttribute("aria-valuenow", "60")
  })

  it("clamps at the max bound", async () => {
    const user = userEvent.setup()
    render(<Slider aria-label="volume" defaultValue={[100]} min={0} max={100} />)
    const slider = screen.getByRole("slider")
    slider.focus()
    await user.keyboard("{ArrowRight}")
    expect(slider).toHaveAttribute("aria-valuenow", "100")
  })

  it("respects controlled value (does not move itself)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Slider
        aria-label="volume"
        value={[40]}
        min={0}
        max={100}
        onValueChange={onValueChange}
      />
    )
    const slider = screen.getByRole("slider")
    slider.focus()
    await user.keyboard("{ArrowRight}")
    expect(onValueChange).toHaveBeenCalledWith([41])
    // controlled, so displayed value stays at 40
    expect(slider).toHaveAttribute("aria-valuenow", "40")
  })

  it("is disabled and ignores keyboard input", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Slider
        aria-label="volume"
        defaultValue={[50]}
        disabled
        onValueChange={onValueChange}
      />
    )
    const slider = screen.getByRole("slider")
    slider.focus()
    await user.keyboard("{ArrowRight}")
    expect(onValueChange).not.toHaveBeenCalled()
    expect(slider).toHaveAttribute("aria-valuenow", "50")
  })

  it.each([
    ["ink", "bg-primary"],
    ["brand", "bg-brand"],
    ["info", "bg-info"],
  ] as const)("applies color=%s range accent", (color, expectedClass) => {
    const { container } = render(
      <Slider aria-label="volume" defaultValue={[50]} color={color} />
    )
    const range = container.querySelector(`.${CSS.escape(expectedClass)}`)
    expect(range).toBeInTheDocument()
  })

  it("shows a value bubble when showValue is set", () => {
    render(<Slider aria-label="volume" defaultValue={[42]} showValue />)
    expect(screen.getByText("42")).toBeInTheDocument()
  })

  it("does not show a value bubble by default", () => {
    render(<Slider aria-label="volume" defaultValue={[42]} />)
    expect(screen.queryByText("42")).not.toBeInTheDocument()
  })

  it("merges a custom className on the root", () => {
    const { container } = render(
      <Slider aria-label="volume" defaultValue={[50]} className="custom-class" />
    )
    expect(container.querySelector(".custom-class")).toBeInTheDocument()
  })

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Slider aria-label="volume" defaultValue={[50]} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
