import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("renders a textbox", () => {
    render(<Textarea aria-label="bio" />)
    expect(screen.getByRole("textbox", { name: "bio" })).toBeInTheDocument()
  })

  it("accepts typed input via onChange", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea aria-label="bio" onChange={onChange} />)

    await user.type(screen.getByRole("textbox"), "abc")

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(screen.getByRole("textbox")).toHaveValue("abc")
  })

  describe("error state", () => {
    it("sets data-error and error class when error", () => {
      render(<Textarea aria-label="bio" error />)
      const textarea = screen.getByRole("textbox")
      expect(textarea).toHaveAttribute("data-error", "")
      expect(textarea).toHaveClass("border-error")
    })

    it("omits data-error when not error", () => {
      render(<Textarea aria-label="bio" />)
      expect(screen.getByRole("textbox")).not.toHaveAttribute("data-error")
    })
  })

  describe("disabled state", () => {
    it("disables the textarea", () => {
      render(<Textarea aria-label="bio" disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
    })

    it("does not accept typing when disabled", async () => {
      const user = userEvent.setup()
      render(<Textarea aria-label="bio" disabled />)
      await user.type(screen.getByRole("textbox"), "x")
      expect(screen.getByRole("textbox")).toHaveValue("")
    })
  })

  it("forwards ref to the textarea element", () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea aria-label="bio" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it("merges custom className", () => {
    render(<Textarea aria-label="bio" className="custom" />)
    expect(screen.getByRole("textbox")).toHaveClass("custom")
  })

  it("passes through placeholder and rows", () => {
    render(<Textarea aria-label="bio" placeholder="Write..." rows={5} />)
    const textarea = screen.getByPlaceholderText("Write...")
    expect(textarea).toHaveAttribute("rows", "5")
  })
})
