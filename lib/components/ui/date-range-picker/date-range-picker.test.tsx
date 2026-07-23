import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { DateRangePicker } from "./date-range-picker"

describe("DateRangePicker", () => {
  it("renders the placeholder when there is no value", () => {
    render(<DateRangePicker />)
    expect(
      screen.getByRole("button", { name: /select range/i })
    ).toBeInTheDocument()
  })

  it("renders a custom placeholder", () => {
    render(<DateRangePicker placeholder="Choose dates" />)
    expect(
      screen.getByRole("button", { name: /choose dates/i })
    ).toBeInTheDocument()
  })

  it("shows a formatted range label when both endpoints are set", () => {
    render(
      <DateRangePicker
        value={{ from: new Date(2024, 0, 5), to: new Date(2024, 0, 20) }}
      />
    )
    // e.g. "Jan 5 – Jan 20"
    expect(screen.getByRole("button", { name: /Jan 5.*Jan 20/ })).toBeInTheDocument()
  })

  it("shows a single date label when only from is set", () => {
    render(<DateRangePicker value={{ from: new Date(2024, 0, 5) }} />)
    expect(screen.getByRole("button", { name: /Jan 5/ })).toBeInTheDocument()
  })

  it("opens the popover with preset shortcuts", async () => {
    const user = userEvent.setup()
    render(<DateRangePicker value={{ from: new Date(2024, 0, 15) }} />)

    await user.click(screen.getByRole("button", { name: /Jan 15/ }))

    expect(await screen.findByRole("button", { name: "Today" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Last 7 days" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "This month" })).toBeInTheDocument()
  })

  it("selecting start then end and pressing Apply commits the range", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DateRangePicker
        value={{ from: new Date(2024, 0, 15), to: new Date(2024, 0, 15) }}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /Jan 15/ }))
    // 11 and 20 are unique within January's grid.
    await user.click(await screen.findByRole("button", { name: "11" }))
    await user.click(screen.getByRole("button", { name: "20" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    expect(onValueChange).toHaveBeenCalledTimes(1)
    const range = onValueChange.mock.calls[0][0]
    expect(range.from.getDate()).toBe(11)
    expect(range.to.getDate()).toBe(20)
  })

  it("clicking an earlier end date swaps the endpoints", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DateRangePicker
        value={{ from: new Date(2024, 0, 15), to: new Date(2024, 0, 15) }}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /Jan 15/ }))
    await user.click(await screen.findByRole("button", { name: "20" }))
    await user.click(screen.getByRole("button", { name: "11" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    const range = onValueChange.mock.calls[0][0]
    expect(range.from.getDate()).toBe(11)
    expect(range.to.getDate()).toBe(20)
  })

  it("choosing a preset commits a from/to range on Apply", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DateRangePicker onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: /select range/i }))
    await user.click(await screen.findByRole("button", { name: "Last 7 days" }))
    await user.click(screen.getByRole("button", { name: "Apply" }))

    expect(onValueChange).toHaveBeenCalledTimes(1)
    const range = onValueChange.mock.calls[0][0]
    expect(range.from).toBeInstanceOf(Date)
    expect(range.to).toBeInstanceOf(Date)
    expect(range.from.getTime()).toBeLessThanOrEqual(range.to.getTime())
  })

  it("Clear resets the range to an empty object", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DateRangePicker
        value={{ from: new Date(2024, 0, 5), to: new Date(2024, 0, 20) }}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /Jan 5/ }))
    await user.click(await screen.findByRole("button", { name: "Clear" }))

    expect(onValueChange).toHaveBeenCalledWith({})
  })

  it("navigates months inside the popover", async () => {
    const user = userEvent.setup()
    render(<DateRangePicker value={{ from: new Date(2024, 0, 15) }} />)

    await user.click(screen.getByRole("button", { name: /Jan 15/ }))
    const next = await screen.findByRole("button", { name: "Next month" })
    await user.click(next)

    expect(screen.getByText("February 2024")).toBeInTheDocument()
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<DateRangePicker ref={ref} className="custom-range" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveClass("custom-range")
  })
})
