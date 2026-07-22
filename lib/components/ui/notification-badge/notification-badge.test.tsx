import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import {
  NotificationDot,
  CountBadge,
  NotificationAnchor,
  dotVariants,
  countVariants,
} from "./notification-badge"

describe("NotificationDot", () => {
  it("renders with default brand color", () => {
    render(<NotificationDot data-testid="dot" />)
    const dot = screen.getByTestId("dot")
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass("bg-brand")
  })

  it.each([
    ["brand", "bg-brand"],
    ["info", "bg-info"],
    ["success", "bg-success"],
    ["warning", "bg-warning"],
    ["ink", "bg-primary"],
  ] as const)("applies color=%s", (color, expected) => {
    render(<NotificationDot data-testid="dot" color={color} />)
    expect(screen.getByTestId("dot")).toHaveClass(expected)
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<NotificationDot ref={ref} data-testid="dot" className="custom" />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(screen.getByTestId("dot")).toHaveClass("custom")
  })

  it("dotVariants helper returns color class", () => {
    expect(dotVariants({ color: "info" })).toContain("bg-info")
  })
})

describe("CountBadge", () => {
  it("displays the numeric count", () => {
    render(<CountBadge count={5} />)
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("displays exactly the max value without plus", () => {
    render(<CountBadge count={99} />)
    expect(screen.getByText("99")).toBeInTheDocument()
  })

  it("displays max+ when count exceeds default max of 99", () => {
    render(<CountBadge count={150} />)
    expect(screen.getByText("99+")).toBeInTheDocument()
  })

  it("respects a custom max prop", () => {
    render(<CountBadge count={12} max={9} />)
    expect(screen.getByText("9+")).toBeInTheDocument()
  })

  it("shows count equal to custom max without plus", () => {
    render(<CountBadge count={9} max={9} />)
    expect(screen.getByText("9")).toBeInTheDocument()
  })

  it("renders zero", () => {
    render(<CountBadge count={0} />)
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("applies default brand color", () => {
    render(<CountBadge count={3} data-testid="badge" />)
    expect(screen.getByTestId("badge")).toHaveClass("bg-brand")
  })

  it.each([
    ["info", "bg-info"],
    ["success", "bg-success"],
    ["warning", "bg-warning"],
    ["ink", "bg-primary"],
  ] as const)("applies color=%s", (color, expected) => {
    render(<CountBadge count={3} color={color} data-testid="badge" />)
    expect(screen.getByTestId("badge")).toHaveClass(expected)
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<CountBadge ref={ref} count={1} className="custom" data-testid="badge" />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(screen.getByTestId("badge")).toHaveClass("custom")
  })

  it("countVariants helper returns color class", () => {
    expect(countVariants({ color: "success" })).toContain("bg-success")
  })
})

describe("NotificationAnchor", () => {
  it("renders children and relative positioning", () => {
    render(
      <NotificationAnchor data-testid="anchor">
        <span>child</span>
      </NotificationAnchor>
    )
    const anchor = screen.getByTestId("anchor")
    expect(anchor).toHaveClass("relative", "inline-flex")
    expect(screen.getByText("child")).toBeInTheDocument()
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<NotificationAnchor ref={ref} className="custom" data-testid="anchor" />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(screen.getByTestId("anchor")).toHaveClass("custom")
  })
})
