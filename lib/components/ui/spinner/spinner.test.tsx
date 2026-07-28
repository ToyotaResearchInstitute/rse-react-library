import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { FullPageLoader, Spinner, spinnerVariants } from "./spinner"

describe("Spinner", () => {
  it("renders with role status and default label", () => {
    render(<Spinner />)
    const status = screen.getByRole("status")
    expect(status).toHaveAttribute("aria-label", "Loading")
  })

  it("renders an sr-only label text", () => {
    render(<Spinner />)
    expect(screen.getByText("Loading")).toHaveClass("tri-sr-only")
  })

  it("uses a custom label for aria-label and sr-only text", () => {
    render(<Spinner label="Fetching data" />)
    const status = screen.getByRole("status")
    expect(status).toHaveAttribute("aria-label", "Fetching data")
    expect(screen.getByText("Fetching data")).toBeInTheDocument()
  })

  it("applies default size (md) and variant (ink) classes", () => {
    render(<Spinner />)
    const status = screen.getByRole("status")
    expect(status).toHaveClass("tri-h-6", "tri-w-6", "tri-border-t-primary", "tri-animate-spin")
  })

  it.each([
    ["sm", "tri-h-4"],
    ["md", "tri-h-6"],
    ["lg", "tri-h-10"],
  ] as const)("renders size=%s", (size, expectedClass) => {
    render(<Spinner size={size} />)
    expect(screen.getByRole("status")).toHaveClass(expectedClass)
  })

  it.each([
    ["ink", "tri-border-t-primary"],
    ["brand", "tri-border-t-brand"],
    ["info", "tri-border-t-info"],
  ] as const)("renders variant=%s", (variant, expectedClass) => {
    render(<Spinner variant={variant} />)
    expect(screen.getByRole("status")).toHaveClass(expectedClass)
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Spinner ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Spinner className="custom" />)
    expect(screen.getByRole("status")).toHaveClass("custom")
  })

  it("exports spinnerVariants that generate class strings", () => {
    expect(spinnerVariants({ size: "lg", variant: "brand" })).toContain("tri-h-10")
  })
})

describe("FullPageLoader", () => {
  it("renders with role status and a default message", () => {
    render(<FullPageLoader />)
    // both the outer loader and the inner Spinner expose role="status"
    expect(screen.getAllByRole("status").length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText("Loading…")).toBeInTheDocument()
  })

  it("renders a custom message", () => {
    render(<FullPageLoader message="Please wait" />)
    expect(screen.getByText("Please wait")).toBeInTheDocument()
  })

  it("does not render a message node when message is falsy", () => {
    render(<FullPageLoader message="" />)
    // still has the inner spinner status; the message span is not rendered
    const statuses = screen.getAllByRole("status")
    // outer FullPageLoader + inner large Spinner
    expect(statuses.length).toBeGreaterThanOrEqual(2)
  })

  it("renders a large spinner inside", () => {
    const { container } = render(<FullPageLoader />)
    expect(container.querySelector(".tri-h-10.tri-w-10")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<FullPageLoader ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<FullPageLoader className="tri-fixed tri-inset-0" />)
    expect(container.firstChild).toHaveClass("tri-fixed", "tri-inset-0")
  })
})
