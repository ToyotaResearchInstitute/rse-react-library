import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Label } from "./label"

describe("Label", () => {
  it("renders its children text", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("applies base typography classes", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toHaveClass(
      "text-[13px]",
      "font-medium",
      "text-foreground"
    )
  })

  it("associates with a control via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" />
      </>
    )
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input")
    // labeled control resolvable by accessible name
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("forwards ref to the label element", () => {
    const ref = createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Email</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it("merges custom className", () => {
    render(<Label className="custom">Email</Label>)
    expect(screen.getByText("Email")).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    render(<Label data-testid="lbl">Email</Label>)
    expect(screen.getByTestId("lbl")).toBeInTheDocument()
  })
})
