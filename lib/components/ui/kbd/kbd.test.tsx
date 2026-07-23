import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Kbd } from "./kbd"

describe("Kbd", () => {
  it("renders children inside a <kbd> element", () => {
    render(<Kbd>⌘K</Kbd>)
    const kbd = screen.getByText("⌘K")
    expect(kbd).toBeInTheDocument()
    expect(kbd.tagName).toBe("KBD")
  })

  it("applies base styling classes", () => {
    render(<Kbd>esc</Kbd>)
    expect(screen.getByText("esc")).toHaveClass(
      "inline-flex",
      "font-mono",
      "bg-muted"
    )
  })

  it("forwards ref to the kbd element", () => {
    const ref = createRef<HTMLElement>()
    render(<Kbd ref={ref}>K</Kbd>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current?.tagName).toBe("KBD")
  })

  it("merges custom className", () => {
    render(<Kbd className="custom">K</Kbd>)
    expect(screen.getByText("K")).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    render(<Kbd data-testid="key">K</Kbd>)
    expect(screen.getByTestId("key")).toBeInTheDocument()
  })
})
