import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "./alert"

describe("Alert", () => {
  it("renders with role alert and children", () => {
    render(<Alert>Something happened</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveTextContent("Something happened")
  })

  it("applies the default variant classes when no variant is given", () => {
    render(<Alert>Default</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("bg-background", "text-foreground")
  })

  it.each([
    ["info", "bg-[#ECF6FF]", "text-[#0F4F87]"],
    ["success", "bg-[#EAF4EA]", "text-[#1F5E22]"],
    ["warning", "bg-[#FDF0E2]", "text-[#D14900]"],
    ["error", "bg-[#FFECEC]", "text-[#A1242C]"],
    ["destructive", "bg-[#FFECEC]", "text-[#A1242C]"],
    ["info-filled", "bg-[#1D73BF]", "text-white"],
    ["success-filled", "bg-[#2E7D32]", "text-white"],
    ["warning-filled", "bg-[#D14900]", "text-white"],
    ["error-filled", "bg-[#EB0000]", "text-white"],
    ["info-outline", "bg-transparent", "text-[#0F4F87]"],
    ["success-outline", "bg-transparent", "text-[#1F5E22]"],
    ["warning-outline", "bg-transparent", "text-[#D14900]"],
    ["error-outline", "bg-transparent", "text-[#A1242C]"],
  ] as const)("renders the %s variant classes", (variant, bg, text) => {
    render(<Alert variant={variant}>Body</Alert>)
    expect(screen.getByRole("alert")).toHaveClass(bg, text)
  })

  it("forwards ref to the underlying div", () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Alert ref={ref}>Body</Alert>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className with variant classes", () => {
    render(<Alert className="custom-class">Body</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("custom-class")
    expect(alert).toHaveClass("bg-background")
  })

  it("forwards arbitrary HTML attributes", () => {
    render(<Alert data-testid="alert-x" aria-live="assertive">Body</Alert>)
    const alert = screen.getByTestId("alert-x")
    expect(alert).toHaveAttribute("aria-live", "assertive")
  })
})

describe("alertVariants", () => {
  it("returns default variant classes when called with no args", () => {
    const out = alertVariants()
    expect(out).toContain("bg-background")
    expect(out).toContain("text-foreground")
  })

  it("returns the requested variant classes", () => {
    expect(alertVariants({ variant: "warning" })).toContain("bg-[#FDF0E2]")
    expect(alertVariants({ variant: "error-filled" })).toContain("text-white")
  })

  it("always includes base layout classes", () => {
    const out = alertVariants({ variant: "info" })
    expect(out).toContain("relative")
    expect(out).toContain("rounded-md")
  })
})

describe("AlertTitle", () => {
  it("renders as an h5 heading with children", () => {
    render(<AlertTitle>Heads up</AlertTitle>)
    const title = screen.getByRole("heading", { level: 5, name: "Heads up" })
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe("H5")
  })

  it("merges custom className", () => {
    render(<AlertTitle className="mt-x">Title</AlertTitle>)
    expect(screen.getByRole("heading")).toHaveClass("mt-x", "font-semibold")
  })

  it("forwards ref", () => {
    const ref = { current: null as HTMLHeadingElement | null }
    render(<AlertTitle ref={ref}>Title</AlertTitle>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe("AlertDescription", () => {
  it("renders a div with children", () => {
    render(<AlertDescription>The details</AlertDescription>)
    const desc = screen.getByText("The details")
    expect(desc).toBeInTheDocument()
    expect(desc.tagName).toBe("DIV")
  })

  it("merges custom className", () => {
    render(<AlertDescription className="desc-x">Body</AlertDescription>)
    expect(screen.getByText("Body")).toHaveClass("desc-x", "flex-1")
  })

  it("forwards ref", () => {
    const ref = { current: null as HTMLParagraphElement | null }
    render(<AlertDescription ref={ref}>Body</AlertDescription>)
    expect(ref.current).not.toBeNull()
  })
})

describe("AlertAction", () => {
  it("renders a button with type button by default", () => {
    render(<AlertAction>Undo</AlertAction>)
    const btn = screen.getByRole("button", { name: "Undo" })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute("type", "button")
  })

  it("respects an explicit type prop", () => {
    render(<AlertAction type="submit">Submit</AlertAction>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
  })

  it("uses currentColor border by default", () => {
    render(<AlertAction>Act</AlertAction>)
    expect(screen.getByRole("button")).toHaveClass("border-current")
  })

  it("softens the border to translucent white when onFilled is set", () => {
    render(<AlertAction onFilled>Act</AlertAction>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveClass("border-white/70")
    expect(btn).not.toHaveClass("border-current")
  })

  it("forwards onClick", async () => {
    const { default: userEvent } = await import("@testing-library/user-event")
    const user = userEvent.setup()
    let clicked = false
    render(<AlertAction onClick={() => (clicked = true)}>Act</AlertAction>)
    await user.click(screen.getByRole("button"))
    expect(clicked).toBe(true)
  })

  it("forwards ref", () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<AlertAction ref={ref}>Act</AlertAction>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

describe("Alert composition", () => {
  it("renders title, description and action together inside the alert", () => {
    render(
      <Alert variant="info">
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>A new version is ready.</AlertDescription>
        <AlertAction>Reload</AlertAction>
      </Alert>
    )
    const alert = screen.getByRole("alert")
    expect(alert).toContainElement(screen.getByRole("heading", { level: 5 }))
    expect(alert).toContainElement(screen.getByText("A new version is ready."))
    expect(alert).toContainElement(screen.getByRole("button", { name: "Reload" }))
  })
})
