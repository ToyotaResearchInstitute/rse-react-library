import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Popover, PopoverContent, PopoverTrigger } from "./popover"

describe("Popover", () => {
  it("does not render content when closed", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    )
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument()
  })

  it("opens content when the trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(await screen.findByText("Popover body")).toBeInTheDocument()
  })

  it("renders content immediately when defaultOpen (uncontrolled)", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Popover body")).toBeInTheDocument()
  })

  it("respects the controlled open prop", () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Controlled body</PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Controlled body")).toBeInTheDocument()
  })

  it("stays closed when controlled open is false even after clicking", async () => {
    const user = userEvent.setup()
    render(
      <Popover open={false}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(screen.queryByText("Body")).not.toBeInTheDocument()
  })

  it("fires onOpenChange when the trigger is clicked", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it("closes on Escape", async () => {
    const user = userEvent.setup()
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Body")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByText("Body")).not.toBeInTheDocument()
  })

  it("applies base content classes and merges custom className", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-pop">Body</PopoverContent>
      </Popover>
    )
    const content = screen.getByText("Body")
    expect(content).toHaveClass("custom-pop", "rounded-md", "bg-popover")
  })

  it("forwards ref to the content element", () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent ref={ref}>Body</PopoverContent>
      </Popover>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it("forwards arbitrary props to the content", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent data-testid="pop-content">Body</PopoverContent>
      </Popover>
    )
    expect(screen.getByTestId("pop-content")).toBeInTheDocument()
  })
})
