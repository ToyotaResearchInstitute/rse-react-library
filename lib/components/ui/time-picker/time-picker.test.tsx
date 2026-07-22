import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { TimePicker, type TimeValue } from "./time-picker"

const time: TimeValue = { hour: 10, minute: 30, meridiem: "AM" }

describe("TimePicker", () => {
  it("renders the placeholder when there is no value", () => {
    render(<TimePicker />)
    expect(
      screen.getByRole("button", { name: /select time/i })
    ).toBeInTheDocument()
  })

  it("renders a custom placeholder", () => {
    render(<TimePicker placeholder="Pick a time" />)
    expect(
      screen.getByRole("button", { name: /pick a time/i })
    ).toBeInTheDocument()
  })

  it("displays a formatted value (padded minute)", () => {
    render(<TimePicker value={{ hour: 3, minute: 5, meridiem: "PM" }} />)
    expect(
      screen.getByRole("button", { name: /3:05 PM/ })
    ).toBeInTheDocument()
  })

  it("opens hour and minute listboxes on click", async () => {
    const user = userEvent.setup()
    render(<TimePicker value={time} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))

    expect(await screen.findByRole("listbox", { name: "Hour" })).toBeInTheDocument()
    expect(screen.getByRole("listbox", { name: "Minute" })).toBeInTheDocument()
  })

  it("marks the current hour/minute options as selected", async () => {
    const user = userEvent.setup()
    render(<TimePicker value={time} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))

    const hours = await screen.findByRole("listbox", { name: "Hour" })
    expect(within(hours).getByRole("option", { name: "10" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    const minutes = screen.getByRole("listbox", { name: "Minute" })
    expect(within(minutes).getByRole("option", { name: "30" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
  })

  it("selecting an hour fires onValueChange immediately", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<TimePicker value={time} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))
    const hours = await screen.findByRole("listbox", { name: "Hour" })
    await user.click(within(hours).getByRole("option", { name: "8" }))

    expect(onValueChange).toHaveBeenCalledWith({
      hour: 8,
      minute: 30,
      meridiem: "AM",
    })
  })

  it("selecting a minute fires onValueChange immediately", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<TimePicker value={time} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))
    const minutes = await screen.findByRole("listbox", { name: "Minute" })
    await user.click(within(minutes).getByRole("option", { name: "45" }))

    expect(onValueChange).toHaveBeenCalledWith({
      hour: 10,
      minute: 45,
      meridiem: "AM",
    })
  })

  it("toggling the meridiem fires onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<TimePicker value={time} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))
    await user.click(await screen.findByRole("button", { name: "PM" }))

    expect(onValueChange).toHaveBeenCalledWith({
      hour: 10,
      minute: 30,
      meridiem: "PM",
    })
  })

  it("respects a custom minuteStep", async () => {
    const user = userEvent.setup()
    render(<TimePicker value={time} minuteStep={15} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))
    const minutes = await screen.findByRole("listbox", { name: "Minute" })
    const options = within(minutes).getAllByRole("option")
    // 60 / 15 = 4 options: 00, 15, 30, 45
    expect(options).toHaveLength(4)
    expect(options.map((o) => o.textContent)).toEqual(["00", "15", "30", "45"])
  })

  it("defaults to 12 hour options", async () => {
    const user = userEvent.setup()
    render(<TimePicker value={time} />)

    await user.click(screen.getByRole("button", { name: /10:30 AM/ }))
    const hours = await screen.findByRole("listbox", { name: "Hour" })
    expect(within(hours).getAllByRole("option")).toHaveLength(12)
  })

  it("uses the default time when no value is provided", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<TimePicker onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /select time/i }))
    await user.click(await screen.findByRole("button", { name: "PM" }))

    // default is { hour: 12, minute: 0, meridiem: "AM" }
    expect(onValueChange).toHaveBeenCalledWith({
      hour: 12,
      minute: 0,
      meridiem: "PM",
    })
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<TimePicker ref={ref} className="custom-time" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveClass("custom-time")
  })
})
