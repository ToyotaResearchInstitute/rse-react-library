import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Search } from "./search"

describe("Search", () => {
  it("renders a search input with the default placeholder", () => {
    render(<Search />)
    // type="search" gives the input role "searchbox"
    const input = screen.getByRole("searchbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("placeholder", "Search…")
    expect(input).toHaveAttribute("type", "search")
  })

  it("honours a custom placeholder", () => {
    render(<Search placeholder="Find users" />)
    expect(screen.getByPlaceholderText("Find users")).toBeInTheDocument()
  })

  it("reflects a controlled value and fires onChange while typing", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Search value="" onChange={onChange} />)
    const input = screen.getByRole("searchbox")
    await user.type(input, "abc")
    expect(onChange).toHaveBeenCalledTimes(3)
  })

  it("supports uncontrolled typing via defaultValue", async () => {
    const user = userEvent.setup()
    render(<Search defaultValue="" />)
    const input = screen.getByRole<HTMLInputElement>("searchbox")
    await user.type(input, "hello")
    expect(input).toHaveValue("hello")
  })

  it("does not render a clear button when onClear is omitted", () => {
    render(<Search />)
    expect(
      screen.queryByRole("button", { name: "Clear search" })
    ).not.toBeInTheDocument()
  })

  it("renders a clear button when onClear is provided and fires it on click", async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<Search value="something" onChange={() => {}} onClear={onClear} />)
    const clearBtn = screen.getByRole("button", { name: "Clear search" })
    expect(clearBtn).toBeInTheDocument()
    await user.click(clearBtn)
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it("renders a keyboard hint when kbdHint is provided", () => {
    render(<Search kbdHint="⌘K" />)
    expect(screen.getByText("⌘K")).toBeInTheDocument()
  })

  it("renders both the clear button and the kbd hint together", () => {
    render(<Search onClear={() => {}} kbdHint="⌘K" />)
    expect(
      screen.getByRole("button", { name: "Clear search" })
    ).toBeInTheDocument()
    expect(screen.getByText("⌘K")).toBeInTheDocument()
  })

  it("applies the disabled state to the input", () => {
    render(<Search disabled />)
    expect(screen.getByRole("searchbox")).toBeDisabled()
  })

  it("forwards a ref to the input element", () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Search ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe("INPUT")
  })

  it.each(["sm", "md", "lg"] as const)(
    "renders at size %s",
    (size) => {
      render(<Search size={size} />)
      expect(screen.getByRole("searchbox")).toBeInTheDocument()
    }
  )

  it("renders a pill variant", () => {
    render(<Search pill />)
    expect(screen.getByRole("searchbox")).toBeInTheDocument()
  })

  it("passes through arbitrary input props (e.g. name)", () => {
    render(<Search name="q" />)
    expect(screen.getByRole("searchbox")).toHaveAttribute("name", "q")
  })
})
