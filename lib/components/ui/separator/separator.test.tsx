import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { LabeledSeparator, Separator } from "./separator"

describe("Separator", () => {
  it("renders with default horizontal orientation and variant", () => {
    const { container } = render(<Separator />)
    const sep = container.firstChild as HTMLElement
    expect(sep).toBeInTheDocument()
    // decorative separators expose no orientation attribute but carry data-orientation
    expect(sep).toHaveAttribute("data-orientation", "horizontal")
    expect(sep).toHaveClass("bg-border", "h-px", "w-full")
  })

  it("renders vertical orientation classes", () => {
    const { container } = render(<Separator orientation="vertical" />)
    const sep = container.firstChild as HTMLElement
    expect(sep).toHaveAttribute("data-orientation", "vertical")
    expect(sep).toHaveClass("h-full", "w-px")
  })

  it.each([
    ["default", "bg-border"],
    ["strong", "bg-primary"],
    ["dashed", "border-dashed"],
    ["gradient", "bg-gradient-to-r"],
  ] as const)("renders variant=%s (horizontal)", (variant, expectedClass) => {
    const { container } = render(<Separator variant={variant} />)
    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it("renders vertical gradient variant with bg-gradient-to-b", () => {
    const { container } = render(
      <Separator variant="gradient" orientation="vertical" />
    )
    expect(container.firstChild).toHaveClass("bg-gradient-to-b")
  })

  it("renders vertical dashed variant with left border", () => {
    const { container } = render(
      <Separator variant="dashed" orientation="vertical" />
    )
    expect(container.firstChild).toHaveClass("border-l", "border-dashed")
  })

  it("is decorative by default (role presentation / none)", () => {
    const { container } = render(<Separator />)
    const sep = container.firstChild as HTMLElement
    // radix decorative separator uses role="none"
    expect(sep).toHaveAttribute("role", "none")
  })

  it("exposes separator role when decorative is false", () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole("separator")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Separator ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Separator className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })
})

describe("LabeledSeparator", () => {
  it("renders children and has separator role", () => {
    render(<LabeledSeparator>OR</LabeledSeparator>)
    const sep = screen.getByRole("separator")
    expect(sep).toHaveTextContent("OR")
  })

  it("applies base layout classes", () => {
    render(<LabeledSeparator>OR</LabeledSeparator>)
    expect(screen.getByRole("separator")).toHaveClass("flex", "items-center")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<LabeledSeparator ref={ref}>OR</LabeledSeparator>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<LabeledSeparator className="custom">OR</LabeledSeparator>)
    expect(screen.getByRole("separator")).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    render(<LabeledSeparator data-testid="ls">OR</LabeledSeparator>)
    expect(screen.getByTestId("ls")).toBeInTheDocument()
  })
})
