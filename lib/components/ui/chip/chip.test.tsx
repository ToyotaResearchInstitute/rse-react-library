import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Chip, chipVariants } from "./chip"

describe("Chip", () => {
  it("renders children", () => {
    render(<Chip>Tag</Chip>)
    expect(screen.getByText("Tag")).toBeInTheDocument()
  })

  it("applies the default (filled) variant classes", () => {
    render(<Chip>Tag</Chip>)
    expect(screen.getByText("Tag")).toHaveClass("tri-bg-[#eeeeee]")
  })

  it.each([
    ["filled", "tri-bg-[#eeeeee]"],
    ["outlined", "tri-border-[#d4d4d4]"],
    ["dashed", "tri-border-dashed"],
  ] as const)("renders variant=%s", (variant, expectedClass) => {
    render(<Chip variant={variant}>Tag</Chip>)
    expect(screen.getByText("Tag")).toHaveClass(expectedClass)
  })

  describe("selected compound variants", () => {
    it("filled + brand + selected fills with brand accent", () => {
      render(
        <Chip variant="filled" color="brand" selected>
          Tag
        </Chip>
      )
      expect(screen.getByText("Tag")).toHaveClass("tri-bg-brand", "tri-text-white")
    })

    it("filled + ink + selected fills with primary", () => {
      render(
        <Chip variant="filled" color="ink" selected>
          Tag
        </Chip>
      )
      expect(screen.getByText("Tag")).toHaveClass("tri-bg-primary")
    })

    it("filled + info + selected fills with info", () => {
      render(
        <Chip variant="filled" color="info" selected>
          Tag
        </Chip>
      )
      expect(screen.getByText("Tag")).toHaveClass("tri-bg-info")
    })

    it("outlined + brand + selected uses soft tint + brand border", () => {
      render(
        <Chip variant="outlined" color="brand" selected>
          Tag
        </Chip>
      )
      expect(screen.getByText("Tag")).toHaveClass("tri-border-brand")
    })

    it("outlined + info + selected uses info border", () => {
      render(
        <Chip variant="outlined" color="info" selected>
          Tag
        </Chip>
      )
      expect(screen.getByText("Tag")).toHaveClass("tri-border-info")
    })
  })

  describe("remove button", () => {
    it("is not rendered when onRemove is absent", () => {
      render(<Chip>Tag</Chip>)
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("renders a remove button with default label when onRemove is provided", () => {
      render(<Chip onRemove={() => {}}>Tag</Chip>)
      expect(
        screen.getByRole("button", { name: "Remove" })
      ).toBeInTheDocument()
    })

    it("uses a custom removeLabel", () => {
      render(
        <Chip onRemove={() => {}} removeLabel="Delete tag">
          Tag
        </Chip>
      )
      expect(
        screen.getByRole("button", { name: "Delete tag" })
      ).toBeInTheDocument()
    })

    it("calls onRemove when the remove button is clicked", async () => {
      const user = userEvent.setup()
      const onRemove = vi.fn()
      render(<Chip onRemove={onRemove}>Tag</Chip>)

      await user.click(screen.getByRole("button", { name: "Remove" }))

      expect(onRemove).toHaveBeenCalledTimes(1)
    })

    it("adds pr-1 padding class when removable", () => {
      render(<Chip onRemove={() => {}}>Tag</Chip>)
      expect(screen.getByText("Tag").closest("span")).toHaveClass("tri-pr-1")
    })

    it("styles the remove button differently when selected", () => {
      render(
        <Chip color="brand" selected onRemove={() => {}}>
          Tag
        </Chip>
      )
      expect(screen.getByRole("button")).toHaveClass("tri-bg-white/30")
    })

    it("styles the remove button for unselected chip", () => {
      render(<Chip onRemove={() => {}}>Tag</Chip>)
      expect(screen.getByRole("button")).toHaveClass("tri-bg-black/[0.18]")
    })
  })

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Chip ref={ref}>Tag</Chip>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<Chip className="custom">Tag</Chip>)
    expect(screen.getByText("Tag")).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    render(<Chip data-testid="chip">Tag</Chip>)
    expect(screen.getByTestId("chip")).toBeInTheDocument()
  })

  it("exports chipVariants that generate class strings", () => {
    expect(chipVariants({ variant: "outlined" })).toContain("tri-border-[#d4d4d4]")
  })
})
