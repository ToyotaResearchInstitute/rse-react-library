import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Button, buttonVariants } from "./button"

describe("Button", () => {
  it("renders a button with children", () => {
    render(<Button>Click Me!</Button>)

    expect(
      screen.getByRole("button", { name: "Click Me!" })
    ).toBeInTheDocument()
  })

  it("applies the default variant and size classes", () => {
    render(<Button>Default</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-brand", "text-brand-foreground", "h-9")
  })

  it.each([
    ["default", "bg-brand"],
    ["secondary", "bg-background"],
    ["ghost", "bg-transparent"],
    ["outline", "border-input"],
    ["destructive", "bg-destructive"],
    ["link", "text-link"],
    ["ink", "bg-primary"],
    ["blue", "bg-info"],
  ] as const)("renders variant=%s", (variant, expectedClass) => {
    render(<Button variant={variant}>Btn</Button>)
    expect(screen.getByRole("button")).toHaveClass(expectedClass)
  })

  it.each([
    ["default", "h-9"],
    ["sm", "h-8"],
    ["lg", "h-10"],
    ["icon", "w-9"],
  ] as const)("renders size=%s", (size, expectedClass) => {
    render(<Button size={size}>Btn</Button>)
    expect(screen.getByRole("button")).toHaveClass(expectedClass)
  })

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole("button"))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled and does not fire onClick when disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  describe("loading state", () => {
    it("disables the button and sets aria-busy", () => {
      render(<Button loading>Save</Button>)

      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute("aria-busy", "true")
      expect(button).toHaveClass("cursor-wait")
    })

    it("renders an aria-hidden spinner", () => {
      const { container } = render(<Button loading>Save</Button>)

      const spinner = container.querySelector(".animate-spin")
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveAttribute("aria-hidden")
    })

    it("does not set aria-busy when not loading", () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy")
    })

    it("does not fire onClick while loading", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>
      )
      await user.click(screen.getByRole("button"))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  // NOTE (bug): With asChild, the component still renders the
  // `{!asChild && loading && ...}` expression, which evaluates to the literal
  // `false`. That leaves the Slot with two children ([false, <a>]) so Radix
  // Slot throws "Expected a single React element child". asChild is therefore
  // currently unusable. These tests pin the ACTUAL (broken) behavior.
  it("throws when asChild is set (Slot receives the leftover `false` sibling)", () => {
    expect(() =>
      render(
        <Button asChild>
          <a href="/home">Home</a>
        </Button>
      )
    ).toThrow(/Slot/)
  })

  it("throws when asChild + loading (also leaves a false sibling)", () => {
    expect(() =>
      render(
        <Button asChild loading>
          <a href="/home">Home</a>
        </Button>
      )
    ).toThrow(/Slot/)
  })

  it("forwards ref to the underlying button", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("merges custom className", () => {
    render(<Button className="custom-class">Btn</Button>)
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })

  it("passes through arbitrary props (type)", () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
  })

  it("renders empty children without crashing", () => {
    render(<Button aria-label="empty" />)
    expect(screen.getByRole("button", { name: "empty" })).toBeInTheDocument()
  })

  it("exports buttonVariants that generate class strings", () => {
    expect(buttonVariants({ variant: "ghost", size: "sm" })).toContain(
      "bg-transparent"
    )
  })
})
