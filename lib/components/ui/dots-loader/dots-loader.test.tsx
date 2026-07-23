import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { DotsLoader } from "./dots-loader"

describe("DotsLoader", () => {
  it("renders with role status and default label", () => {
    render(<DotsLoader />)
    const status = screen.getByRole("status")
    expect(status).toHaveAttribute("aria-label", "Loading")
  })

  it("renders an sr-only label", () => {
    render(<DotsLoader />)
    expect(screen.getByText("Loading")).toHaveClass("sr-only")
  })

  it("uses a custom label", () => {
    render(<DotsLoader label="Thinking" />)
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Thinking")
    expect(screen.getByText("Thinking")).toBeInTheDocument()
  })

  it("renders three animated dots", () => {
    const { container } = render(<DotsLoader />)
    expect(container.querySelectorAll(".animate-dot-bounce")).toHaveLength(3)
  })

  it("applies staggered animation delays", () => {
    const { container } = render(<DotsLoader />)
    const dots = container.querySelectorAll<HTMLElement>(".animate-dot-bounce")
    expect(dots[0]!.style.animationDelay).toBe("0s")
    expect(dots[1]!.style.animationDelay).toBe("0.15s")
    expect(dots[2]!.style.animationDelay).toBe("0.3s")
  })

  it("applies default size of 6px to each dot", () => {
    const { container } = render(<DotsLoader />)
    const dot = container.querySelector<HTMLElement>(".animate-dot-bounce")!
    expect(dot.style.width).toBe("6px")
    expect(dot.style.height).toBe("6px")
  })

  it("applies a custom size", () => {
    const { container } = render(<DotsLoader size={10} />)
    const dot = container.querySelector<HTMLElement>(".animate-dot-bounce")!
    expect(dot.style.width).toBe("10px")
    expect(dot.style.height).toBe("10px")
  })

  it.each([
    ["ink", "bg-primary"],
    ["brand", "bg-brand"],
    ["info", "bg-info"],
    ["white", "bg-white"],
  ] as const)("renders color=%s", (color, expectedClass) => {
    const { container } = render(<DotsLoader color={color} />)
    expect(container.querySelector(".animate-dot-bounce")).toHaveClass(
      expectedClass
    )
  })

  it("defaults to ink color", () => {
    const { container } = render(<DotsLoader />)
    expect(container.querySelector(".animate-dot-bounce")).toHaveClass(
      "bg-primary"
    )
  })

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<DotsLoader ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<DotsLoader className="custom" />)
    expect(screen.getByRole("status")).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    render(<DotsLoader data-testid="dots" />)
    expect(screen.getByTestId("dots")).toBeInTheDocument()
  })
})
