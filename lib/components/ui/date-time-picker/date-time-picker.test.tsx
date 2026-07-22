import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { DateTimePicker, type DateTimeValue } from "./date-time-picker"

const value: DateTimeValue = {
  date: new Date(2024, 0, 15),
  hour: 9,
  minute: 30,
  meridiem: "AM",
}

describe("DateTimePicker", () => {
  it("renders the placeholder when there is no date", () => {
    render(<DateTimePicker />)
    expect(
      screen.getByRole("button", { name: /select date & time/i })
    ).toBeInTheDocument()
  })

  it("renders a custom placeholder", () => {
    render(<DateTimePicker placeholder="When?" />)
    expect(screen.getByRole("button", { name: /when\?/i })).toBeInTheDocument()
  })

  it("displays a formatted date + time label", () => {
    render(<DateTimePicker value={value} />)
    expect(
      screen.getByRole("button", { name: /Jan 15, 2024.*9:30 AM/ })
    ).toBeInTheDocument()
  })

  it("opens a popover with the calendar and time fields", async () => {
    const user = userEvent.setup()
    render(<DateTimePicker value={value} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))

    expect(await screen.findByRole("grid")).toBeInTheDocument()
    expect(screen.getByLabelText("hour")).toBeInTheDocument()
    expect(screen.getByLabelText("minute")).toBeInTheDocument()
  })

  it("shows the current hour/minute in the number fields", async () => {
    const user = userEvent.setup()
    render(<DateTimePicker value={value} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))

    expect(await screen.findByLabelText("hour")).toHaveValue("9")
    expect(screen.getByLabelText("minute")).toHaveValue("30")
  })

  it("selecting a day and pressing Apply commits the new date", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("gridcell", { name: "20" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    expect(onValueChange).toHaveBeenCalledTimes(1)
    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.date?.getDate()).toBe(20)
    expect(arg.hour).toBe(9)
  })

  it("editing the hour field updates the committed value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    const hour = await screen.findByLabelText("hour")
    // NOTE: clearing is ignored by the field (empty input is a no-op in the
    // onChange handler), so we select-all then type over the selection.
    await user.tripleClick(hour)
    await user.keyboard("8")
    await user.click(screen.getByRole("button", { name: "Apply" }))

    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.hour).toBe(8)
  })

  it("ignores an empty hour field (retains prior value)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    const hour = await screen.findByLabelText("hour")
    await user.clear(hour)
    // Field snaps back to the prior value because empty input is a no-op.
    expect(hour).toHaveValue("9")
    await user.click(screen.getByRole("button", { name: "Apply" }))

    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.hour).toBe(9)
  })

  it("clamps an out-of-range hour to the max (12)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    const hour = await screen.findByLabelText("hour")
    await user.clear(hour)
    await user.type(hour, "99")
    await user.click(screen.getByRole("button", { name: "Apply" }))

    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.hour).toBe(12)
  })

  it("toggling PM updates the committed value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("button", { name: "PM" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.meridiem).toBe("PM")
  })

  it("applies a quick-time preset", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("button", { name: "5:00 PM" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.hour).toBe(5)
    expect(arg.minute).toBe(0)
    expect(arg.meridiem).toBe("PM")
  })

  it("Clear resets the value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateTimePicker value={value} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /Jan 15, 2024/ }))
    await user.click(await screen.findByRole("button", { name: "Clear" }))

    const arg = onValueChange.mock.calls[0][0] as DateTimeValue
    expect(arg.date).toBeUndefined()
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<DateTimePicker ref={ref} className="custom-dt" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveClass("custom-dt")
  })
})
