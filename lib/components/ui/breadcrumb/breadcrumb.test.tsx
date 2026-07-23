import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"

describe("Breadcrumb", () => {
  it("renders a nav landmark labelled breadcrumb", () => {
    render(<Breadcrumb>content</Breadcrumb>)
    const nav = screen.getByRole("navigation", { name: "breadcrumb" })
    expect(nav).toBeInTheDocument()
    expect(nav.tagName).toBe("NAV")
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLElement>()
    render(
      <Breadcrumb ref={ref} className="custom">
        x
      </Breadcrumb>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(screen.getByRole("navigation")).toHaveClass("custom")
  })

  it("renders full composition", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
    expect(screen.getByRole("list")).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(3)
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
  })
})

describe("BreadcrumbList", () => {
  it("renders an ol, merges className, forwards ref", () => {
    const ref = createRef<HTMLOListElement>()
    render(
      <BreadcrumbList ref={ref} className="custom">
        <li>item</li>
      </BreadcrumbList>
    )
    const list = screen.getByRole("list")
    expect(list.tagName).toBe("OL")
    expect(list).toHaveClass("custom")
    expect(ref.current).toBeInstanceOf(HTMLOListElement)
  })
})

describe("BreadcrumbItem", () => {
  it("renders an li, merges className, forwards ref", () => {
    const ref = createRef<HTMLLIElement>()
    render(
      <ol>
        <BreadcrumbItem ref={ref} className="custom">
          x
        </BreadcrumbItem>
      </ol>
    )
    const item = screen.getByRole("listitem")
    expect(item.tagName).toBe("LI")
    expect(item).toHaveClass("custom")
    expect(ref.current).toBeInstanceOf(HTMLLIElement)
  })
})

describe("BreadcrumbLink", () => {
  it("renders an anchor with info/underline styling", () => {
    render(<BreadcrumbLink href="/x">Link</BreadcrumbLink>)
    const link = screen.getByRole("link", { name: "Link" })
    expect(link).toHaveAttribute("href", "/x")
    expect(link).toHaveClass("text-info", "underline")
  })

  it("fires onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn((e) => e.preventDefault())
    render(
      <BreadcrumbLink href="/x" onClick={onClick}>
        Link
      </BreadcrumbLink>
    )
    await user.click(screen.getByRole("link", { name: "Link" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLAnchorElement>()
    render(<BreadcrumbLink ref={ref}>x</BreadcrumbLink>)
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
  })
})

describe("BreadcrumbPage", () => {
  it("renders current page with aria attributes", () => {
    render(<BreadcrumbPage>Current</BreadcrumbPage>)
    const page = screen.getByText("Current")
    expect(page).toHaveAttribute("role", "link")
    expect(page).toHaveAttribute("aria-current", "page")
    expect(page).toHaveAttribute("aria-disabled", "true")
    expect(page).toHaveClass("font-medium", "text-foreground")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<BreadcrumbPage ref={ref}>x</BreadcrumbPage>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("BreadcrumbSeparator", () => {
  it("renders default chevron icon, presentation role, aria-hidden", () => {
    const { container } = render(<BreadcrumbSeparator />)
    const sep = container.querySelector('[role="presentation"]')
    expect(sep).toBeInTheDocument()
    expect(sep).toHaveAttribute("aria-hidden", "true")
    // default children is a ChevronRight svg
    expect(sep?.querySelector("svg")).toBeInTheDocument()
  })

  it("renders custom children instead of default chevron", () => {
    render(<BreadcrumbSeparator>/</BreadcrumbSeparator>)
    expect(screen.getByText("/")).toBeInTheDocument()
  })

  it("merges className", () => {
    const { container } = render(<BreadcrumbSeparator className="custom" />)
    expect(container.querySelector('[role="presentation"]')).toHaveClass("custom")
  })
})
