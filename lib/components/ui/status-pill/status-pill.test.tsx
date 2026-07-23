import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { StatusPill, statusPillVariants } from "./status-pill"

describe("StatusPill", () => {
  it("renders children", () => {
    render(<StatusPill>Active</StatusPill>)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("applies the default (neutral) tone classes", () => {
    render(<StatusPill>Active</StatusPill>)
    expect(screen.getByText("Active")).toHaveClass("bg-[#eeeeee]")
  })

  it.each([
    ["success", "bg-[#EAF4EA]"],
    ["warning", "bg-[#FDF0E2]"],
    ["error", "bg-[#FFECEC]"],
    ["info", "bg-[#ECF6FF]"],
    ["neutral", "bg-[#eeeeee]"],
  ] as const)("renders tone=%s", (tone, expectedClass) => {
    render(<StatusPill tone={tone}>Status</StatusPill>)
    expect(screen.getByText("Status")).toHaveClass(expectedClass)
  })

  it("renders as a span", () => {
    render(<StatusPill>Active</StatusPill>)
    expect(screen.getByText("Active").tagName).toBe("SPAN")
  })

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<StatusPill ref={ref}>Active</StatusPill>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<StatusPill className="custom">Active</StatusPill>)
    expect(screen.getByText("Active")).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    render(<StatusPill data-testid="pill">Active</StatusPill>)
    expect(screen.getByTestId("pill")).toBeInTheDocument()
  })

  it("exports statusPillVariants that generate class strings", () => {
    expect(statusPillVariants({ tone: "success" })).toContain("bg-[#EAF4EA]")
  })
})
