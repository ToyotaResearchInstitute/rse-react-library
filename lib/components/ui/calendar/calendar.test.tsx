import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Calendar } from "./calendar"

describe("Calendar", () => {
  it("renders the given month header and a day grid", () => {
    render(<Calendar defaultMonth={new Date(2024, 0, 1)} />)
    expect(screen.getByText("January 2024")).toBeInTheDocument()
    expect(
      screen.getByRole("grid", { name: "January 2024" })
    ).toBeInTheDocument()
  })

  it("renders weekday column headers", () => {
    render(<Calendar defaultMonth={new Date(2024, 0, 1)} />)
    expect(
      screen.getByRole("columnheader", { name: "Sunday" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("columnheader", { name: "Saturday" })
    ).toBeInTheDocument()
  })

  it("renders 42 day cells (6 weeks)", () => {
    render(<Calendar defaultMonth={new Date(2024, 0, 1)} />)
    expect(screen.getAllByRole("gridcell")).toHaveLength(42)
  })

  it("honours defaultMonth for the initial view", () => {
    render(<Calendar defaultMonth={new Date(2024, 5, 1)} />)
    expect(screen.getByText("June 2024")).toBeInTheDocument()
  })

  it("marks the selected value with aria-selected", () => {
    render(<Calendar value={new Date(2024, 0, 15)} />)
    expect(
      screen.getByRole("gridcell", { name: "15", selected: true })
    ).toBeInTheDocument()
  })

  it("fires onChange with the clicked date (start of day)", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Calendar defaultMonth={new Date(2024, 0, 1)} onChange={onChange} />)

    await user.click(screen.getByRole("gridcell", { name: "20" }))

    expect(onChange).toHaveBeenCalledTimes(1)
    const arg = onChange.mock.calls[0][0] as Date
    expect(arg.getFullYear()).toBe(2024)
    expect(arg.getMonth()).toBe(0)
    expect(arg.getDate()).toBe(20)
    expect(arg.getHours()).toBe(0)
  })

  it("navigates to the next and previous month", async () => {
    const user = userEvent.setup()
    render(<Calendar defaultMonth={new Date(2024, 0, 1)} />)

    await user.click(screen.getByRole("button", { name: "Next month" }))
    expect(screen.getByText("February 2024")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Previous month" }))
    await user.click(screen.getByRole("button", { name: "Previous month" }))
    expect(screen.getByText("December 2023")).toBeInTheDocument()
  })

  it("syncs the visible month when value changes to another month", () => {
    const { rerender } = render(<Calendar value={new Date(2024, 0, 15)} />)
    expect(screen.getByText("January 2024")).toBeInTheDocument()

    rerender(<Calendar value={new Date(2024, 3, 10)} />)
    expect(screen.getByText("April 2024")).toBeInTheDocument()
  })

  it("uses a roving tabindex (only the focus target is tabbable)", () => {
    render(<Calendar value={new Date(2024, 0, 15)} />)
    const selected = screen.getByRole("gridcell", { name: "15", selected: true })
    expect(selected).toHaveAttribute("tabindex", "0")
    // 11 is unique to January's grid (1-10 also appear as trailing Feb days).
    const other = screen.getByRole("gridcell", { name: "11" })
    expect(other).toHaveAttribute("tabindex", "-1")
  })

  it("moves focus with arrow keys", async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2024, 0, 15)} />)

    const start = screen.getByRole("gridcell", { name: "15", selected: true })
    start.focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("gridcell", { name: "16" })).toHaveFocus()

    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("gridcell", { name: "23" })).toHaveFocus()
  })

  it("crosses month boundaries with keyboard navigation", async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2024, 0, 31)} />)

    const start = screen.getByRole("gridcell", { name: "31", selected: true })
    start.focus()
    await user.keyboard("{ArrowRight}")

    expect(screen.getByText("February 2024")).toBeInTheDocument()
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Calendar ref={ref} className="custom-cal" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("custom-cal")
  })

  describe("today marker (deterministic clock)", () => {
    afterEach(() => { vi.useRealTimers() })

    it("marks today with aria-current=date and defaults the view to today", () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date("2024-01-15T12:00:00"))
      render(<Calendar />)
      expect(screen.getByText("January 2024")).toBeInTheDocument()
      const today = screen.getByRole("gridcell", { name: "15" })
      expect(today).toHaveAttribute("aria-current", "date")
    })
  })
})
