import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Badge, badgeVariants } from "./badge"

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies the default variant classes", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toHaveClass("bg-primary", "rounded-full")
  })

  it.each([
    ["default", "bg-primary"],
    ["secondary", "bg-secondary"],
    ["destructive", "bg-destructive"],
    ["outline", "text-foreground"],
  ] as const)("renders variant=%s", (variant, expectedClass) => {
    render(<Badge variant={variant}>Badge</Badge>)
    expect(screen.getByText("Badge")).toHaveClass(expectedClass)
  })

  it("merges custom className", () => {
    render(<Badge className="custom">New</Badge>)
    expect(screen.getByText("New")).toHaveClass("custom")
  })

  it("passes through arbitrary props (onClick, data-*)", () => {
    render(<Badge data-testid="badge">New</Badge>)
    expect(screen.getByTestId("badge")).toBeInTheDocument()
  })

  it("renders as a div", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New").tagName).toBe("DIV")
  })

  it("exports badgeVariants that generate class strings", () => {
    expect(badgeVariants({ variant: "outline" })).toContain("text-foreground")
  })
})
