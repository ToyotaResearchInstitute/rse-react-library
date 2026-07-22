import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { DatePicker } from "./date-picker"

describe("DatePicker", () => {
  it("renders the placeholder when there is no value", () => {
    render(<DatePicker />)
    expect(
      screen.getByRole("button", { name: /select date/i })
    ).toBeInTheDocument()
  })

  it("renders a custom placeholder", () => {
    render(<DatePicker placeholder="Pick a day" />)
    expect(
      screen.getByRole("button", { name: /pick a day/i })
    ).toBeInTheDocument()
  })

  it("displays a formatted value", () => {
    render(<DatePicker value={new Date(2024, 0, 15)} />)
    expect(
      screen.getByRole("button", { name: /Jan 15, 2024/ })
    ).toBeInTheDocument()
  })

  it("opens the calendar popover on click", async () => {
    const user = userEvent.setup()
    render(<DatePicker value={new Date(2024, 0, 15)} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))

    expect(await screen.findByRole("grid")).toBeInTheDocument()
  })

  it("selecting a day and pressing Apply commits the new date", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker value={new Date(2024, 0, 15)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("gridcell", { name: "20" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    expect(onValueChange).toHaveBeenCalledTimes(1)
    const arg = onValueChange.mock.calls[0][0] as Date
    expect(arg.getDate()).toBe(20)
    expect(arg.getMonth()).toBe(0)
  })

  it("Clear resets the value to undefined", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker value={new Date(2024, 0, 15)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("button", { name: "Clear" }))

    expect(onValueChange).toHaveBeenCalledWith(undefined)
  })

  it("Apply without a change commits the existing value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker value={new Date(2024, 0, 15)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("button", { name: "Apply" }))

    const arg = onValueChange.mock.calls[0][0] as Date
    expect(arg.getDate()).toBe(15)
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<DatePicker ref={ref} className="custom-trigger" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveClass("custom-trigger")
  })
})
