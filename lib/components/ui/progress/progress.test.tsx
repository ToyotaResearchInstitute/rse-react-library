import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { CircularProgress, Progress } from "./progress"

describe("Progress", () => {
  it("renders with role progressbar", () => {
    render(<Progress value={40} />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("reflects the value via aria-valuenow", () => {
    render(<Progress value={40} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "40"
    )
  })

  it("defaults value to 0", () => {
    render(<Progress />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0")
  })

  it("translates the indicator based on value", () => {
    const { container } = render(<Progress value={25} />)
    const indicator = container.querySelector<HTMLElement>(".transition-transform")
    // 100 - 25 = 75%
    expect(indicator?.style.transform).toBe("translateX(-75%)")
  })

  it("clamps the indicator transform at 100 (no over-max shift)", () => {
    const { container } = render(<Progress value={150} />)
    const indicator = container.querySelector<HTMLElement>(".transition-transform")
    expect(indicator?.style.transform).toBe("translateX(-0%)")
  })

  it("clamps the indicator transform for negative values", () => {
    const { container } = render(<Progress value={-20} />)
    const indicator = container.querySelector<HTMLElement>(".transition-transform")
    expect(indicator?.style.transform).toBe("translateX(-100%)")
  })

  it("renders indeterminate mode without a numeric indicator", () => {
    const { container } = render(<Progress indeterminate />)
    const bar = container.querySelector(".animate-progress-indeterminate")
    expect(bar).toBeInTheDocument()
    // no fixed-value indicator in indeterminate mode
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow")
  })

  it.each([
    ["ink", "bg-primary"],
    ["brand", "bg-brand"],
    ["info", "bg-info"],
  ] as const)("applies color=%s accent", (color, expectedClass) => {
    const { container } = render(<Progress value={50} color={color} />)
    expect(container.querySelector(`.${CSS.escape(expectedClass)}`)).toBeInTheDocument()
  })

  it("merges a custom className", () => {
    render(<Progress value={50} className="custom-class" />)
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Progress value={50} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})

describe("CircularProgress", () => {
  it("renders with role progressbar and aria attributes", () => {
    render(<CircularProgress value={60} />)
    const pb = screen.getByRole("progressbar")
    expect(pb).toHaveAttribute("aria-valuenow", "60")
    expect(pb).toHaveAttribute("aria-valuemin", "0")
    expect(pb).toHaveAttribute("aria-valuemax", "100")
  })

  it("defaults value to 0", () => {
    render(<CircularProgress />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0")
  })

  it("clamps values over 100", () => {
    render(<CircularProgress value={150} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100"
    )
  })

  it("clamps negative values to 0", () => {
    render(<CircularProgress value={-30} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0")
  })

  it("shows the rounded percentage by default", () => {
    render(<CircularProgress value={66.6} />)
    expect(screen.getByText("67%")).toBeInTheDocument()
  })

  it("hides the percentage when showValue is false", () => {
    render(<CircularProgress value={50} showValue={false} />)
    expect(screen.queryByText("50%")).not.toBeInTheDocument()
  })

  it("applies the size prop to width/height", () => {
    render(<CircularProgress value={50} size={80} data-testid="ring" />)
    const el = screen.getByTestId("ring")
    expect(el).toHaveStyle({ width: "80px", height: "80px" })
  })

  it.each([
    ["ink", "stroke-primary"],
    ["brand", "stroke-brand"],
    ["info", "stroke-info"],
  ] as const)("applies color=%s stroke", (color, expectedClass) => {
    const { container } = render(<CircularProgress value={50} color={color} />)
    expect(container.querySelector(`.${CSS.escape(expectedClass)}`)).toBeInTheDocument()
  })

  it("merges a custom className", () => {
    render(<CircularProgress value={50} className="custom-class" />)
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<CircularProgress value={50} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
