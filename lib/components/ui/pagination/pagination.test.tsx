import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination"

describe("Pagination", () => {
  it("renders a navigation landmark labelled pagination", () => {
    render(<Pagination>content</Pagination>)
    const nav = screen.getByRole("navigation", { name: "pagination" })
    expect(nav).toBeInTheDocument()
    expect(nav.tagName).toBe("NAV")
  })

  it("merges className", () => {
    render(<Pagination className="custom">x</Pagination>)
    expect(screen.getByRole("navigation")).toHaveClass("custom")
  })
})

describe("PaginationContent", () => {
  it("renders a ul and forwards ref", () => {
    const ref = createRef<HTMLUListElement>()
    render(
      <PaginationContent ref={ref} data-testid="content">
        <li>1</li>
      </PaginationContent>
    )
    expect(screen.getByTestId("content").tagName).toBe("UL")
    expect(ref.current).toBeInstanceOf(HTMLUListElement)
  })
})

describe("PaginationItem", () => {
  it("renders an li and forwards ref", () => {
    const ref = createRef<HTMLLIElement>()
    render(
      <ul>
        <PaginationItem ref={ref} data-testid="item">
          x
        </PaginationItem>
      </ul>
    )
    expect(screen.getByTestId("item").tagName).toBe("LI")
    expect(ref.current).toBeInstanceOf(HTMLLIElement)
  })
})

describe("PaginationLink", () => {
  it("renders a button when no href is supplied", () => {
    render(<PaginationLink>1</PaginationLink>)
    const btn = screen.getByRole("button", { name: "1" })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute("type", "button")
  })

  it("renders an anchor when href is supplied", () => {
    render(<PaginationLink href="/page/2">2</PaginationLink>)
    const link = screen.getByRole("link", { name: "2" })
    expect(link).toHaveAttribute("href", "/page/2")
  })

  it("marks active link with aria-current=page and data-active", () => {
    render(
      <PaginationLink href="/page/3" isActive>
        3
      </PaginationLink>
    )
    const link = screen.getByRole("link", { name: "3" })
    expect(link).toHaveAttribute("aria-current", "page")
    expect(link).toHaveAttribute("data-active", "")
    expect(link).toHaveClass("bg-primary")
  })

  it("inactive link has no aria-current or data-active", () => {
    render(<PaginationLink href="/page/4">4</PaginationLink>)
    const link = screen.getByRole("link", { name: "4" })
    expect(link).not.toHaveAttribute("aria-current")
    expect(link).not.toHaveAttribute("data-active")
  })

  it("fires onClick on the button variant", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PaginationLink onClick={onClick}>5</PaginationLink>)
    await user.click(screen.getByRole("button", { name: "5" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("merges className", () => {
    render(<PaginationLink className="custom">6</PaginationLink>)
    expect(screen.getByRole("button", { name: "6" })).toHaveClass("custom")
  })
})

describe("PaginationPrevious / PaginationNext", () => {
  it("PaginationPrevious has correct aria-label and chevron", () => {
    const { container } = render(<PaginationPrevious />)
    const btn = screen.getByRole("button", { name: "Go to previous page" })
    expect(btn).toBeInTheDocument()
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("PaginationNext has correct aria-label and chevron", () => {
    const { container } = render(<PaginationNext />)
    const btn = screen.getByRole("button", { name: "Go to next page" })
    expect(btn).toBeInTheDocument()
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("PaginationPrevious renders as anchor when href given", () => {
    render(<PaginationPrevious href="/prev" />)
    expect(
      screen.getByRole("link", { name: "Go to previous page" })
    ).toHaveAttribute("href", "/prev")
  })

  it("fires onClick on Next", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PaginationNext onClick={onClick} />)
    await user.click(screen.getByRole("button", { name: "Go to next page" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe("PaginationEllipsis", () => {
  it("renders an aria-hidden ellipsis with sr-only text", () => {
    render(<PaginationEllipsis />)
    expect(screen.getByText("More pages")).toBeInTheDocument()
  })

  it("merges className", () => {
    render(<PaginationEllipsis className="custom" data-testid="ell" />)
    expect(screen.getByTestId("ell")).toHaveClass("custom")
  })
})
