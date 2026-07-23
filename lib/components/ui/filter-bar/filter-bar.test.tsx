import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FilterBar, FilterChip, FilterCount } from "./filter-bar"

describe("FilterBar", () => {
  it("renders its children", () => {
    render(
      <FilterBar>
        <span>child content</span>
      </FilterBar>
    )
    expect(screen.getByText("child content")).toBeInTheDocument()
  })

  it("forwards a ref to the underlying div", () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FilterBar ref={ref} data-testid="bar" />)
    expect(ref.current).toBe(screen.getByTestId("bar"))
    expect(ref.current?.tagName).toBe("DIV")
  })

  it("merges custom className with the base styles", () => {
    render(<FilterBar className="my-custom" data-testid="bar" />)
    const bar = screen.getByTestId("bar")
    expect(bar).toHaveClass("my-custom")
    expect(bar).toHaveClass("flex")
  })

  it("spreads arbitrary props", () => {
    render(<FilterBar data-testid="bar" aria-label="filters" />)
    expect(screen.getByTestId("bar")).toHaveAttribute("aria-label", "filters")
  })
})

describe("FilterChip", () => {
  it("renders a solid chip with its label", () => {
    render(<FilterChip>Status: Active</FilterChip>)
    expect(screen.getByText("Status: Active")).toBeInTheDocument()
  })

  it("renders a remove button when onRemove is provided (solid chip)", () => {
    render(<FilterChip onRemove={() => {}}>Env</FilterChip>)
    expect(
      screen.getByRole("button", { name: "Remove filter" })
    ).toBeInTheDocument()
  })

  it("fires onRemove when the remove button is clicked", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<FilterChip onRemove={onRemove}>Env</FilterChip>)
    await user.click(screen.getByRole("button", { name: "Remove filter" }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it("does not render a remove button when onRemove is omitted", () => {
    render(<FilterChip>No remove</FilterChip>)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("does not render a remove button on a dashed chip even with onRemove", () => {
    render(
      <FilterChip dashed onRemove={() => {}}>
        Add filter
      </FilterChip>
    )
    expect(
      screen.queryByRole("button", { name: "Remove filter" })
    ).not.toBeInTheDocument()
  })

  it("renders the dashed add-filter affordance with dashed styles", () => {
    render(
      <FilterChip dashed data-testid="chip">
        Add filter
      </FilterChip>
    )
    const chip = screen.getByTestId("chip")
    expect(chip).toHaveClass("border-dashed")
    expect(screen.getByText("Add filter")).toBeInTheDocument()
  })

  it("forwards a ref", () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <FilterChip ref={ref} data-testid="chip">
        Chip
      </FilterChip>
    )
    expect(ref.current).toBe(screen.getByTestId("chip"))
  })
})

describe("FilterCount", () => {
  it("renders the count text", () => {
    render(<FilterCount>128 results</FilterCount>)
    expect(screen.getByText("128 results")).toBeInTheDocument()
  })

  it("forwards a ref to the span", () => {
    const ref = { current: null as HTMLSpanElement | null }
    render(
      <FilterCount ref={ref} data-testid="count">
        3
      </FilterCount>
    )
    expect(ref.current).toBe(screen.getByTestId("count"))
    expect(ref.current?.tagName).toBe("SPAN")
  })

  it("merges className", () => {
    render(
      <FilterCount className="extra" data-testid="count">
        1
      </FilterCount>
    )
    expect(screen.getByTestId("count")).toHaveClass("extra", "ml-auto")
  })
})

describe("FilterBar composition", () => {
  it("composes a search, chips, add-filter chip and count together", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <FilterBar>
        <input aria-label="search" />
        <FilterChip onRemove={onRemove}>Region: US</FilterChip>
        <FilterChip dashed>Add filter</FilterChip>
        <FilterCount>42 results</FilterCount>
      </FilterBar>
    )
    expect(screen.getByLabelText("search")).toBeInTheDocument()
    expect(screen.getByText("Region: US")).toBeInTheDocument()
    expect(screen.getByText("Add filter")).toBeInTheDocument()
    expect(screen.getByText("42 results")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Remove filter" }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
