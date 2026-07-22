import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Input } from "./input"

describe("Input", () => {
  it("renders a textbox with default type text", () => {
    render(<Input aria-label="name" />)
    const input = screen.getByRole("textbox", { name: "name" })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "text")
  })

  it("respects a custom type", () => {
    render(<Input type="password" aria-label="pw" />)
    // password inputs have no accessible role; query by label
    expect(screen.getByLabelText("pw")).toHaveAttribute("type", "password")
  })

  it("accepts typed input via onChange", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input aria-label="field" onChange={onChange} />)

    await user.type(screen.getByRole("textbox"), "hello")

    expect(onChange).toHaveBeenCalledTimes(5)
    expect(screen.getByRole("textbox")).toHaveValue("hello")
  })

  it("renders a leading icon when provided", () => {
    render(<Input aria-label="search" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("does not render icon span when icon is absent", () => {
    const { container } = render(<Input aria-label="plain" />)
    // only the input, no leading/trailing spans
    expect(container.querySelectorAll("span")).toHaveLength(0)
  })

  it("renders a trailing adornment when provided", () => {
    render(
      <Input aria-label="search" trailing={<span data-testid="kbd">K</span>} />
    )
    expect(screen.getByTestId("kbd")).toBeInTheDocument()
  })

  describe("error state", () => {
    it("sets data-error on the wrapper and error classes", () => {
      const { container } = render(<Input aria-label="field" error />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveAttribute("data-error", "")
      expect(wrapper).toHaveClass("border-error")
    })

    it("omits data-error when error is false", () => {
      const { container } = render(<Input aria-label="field" />)
      expect(container.firstChild).not.toHaveAttribute("data-error")
    })
  })

  describe("disabled state", () => {
    it("disables the input and sets data-disabled on wrapper", () => {
      const { container } = render(<Input aria-label="field" disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
      expect(container.firstChild).toHaveAttribute("data-disabled", "")
    })

    it("does not accept typing when disabled", async () => {
      const user = userEvent.setup()
      render(<Input aria-label="field" disabled />)
      await user.type(screen.getByRole("textbox"), "x")
      expect(screen.getByRole("textbox")).toHaveValue("")
    })
  })

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input aria-label="field" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("applies className to the input and wrapperClassName to the wrapper", () => {
    const { container } = render(
      <Input
        aria-label="field"
        className="input-class"
        wrapperClassName="wrapper-class"
      />
    )
    expect(container.firstChild).toHaveClass("wrapper-class")
    expect(screen.getByRole("textbox")).toHaveClass("input-class")
  })

  it("passes through placeholder and other props", () => {
    render(<Input aria-label="field" placeholder="Type here" />)
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument()
  })
})
