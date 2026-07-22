import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

function renderSingle(
  props: Partial<React.ComponentProps<typeof Accordion>> = {}
) {
  return render(
    // @ts-expect-error type prop provided via spread
    <Accordion type="single" {...props}>
      <AccordionItem value="a">
        <AccordionTrigger>Trigger A</AccordionTrigger>
        <AccordionContent>Content A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Trigger B</AccordionTrigger>
        <AccordionContent>Content B</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe("Accordion", () => {
  it("renders triggers as buttons", () => {
    renderSingle()
    expect(screen.getByRole("button", { name: "Trigger A" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Trigger B" })).toBeInTheDocument()
  })

  it("is collapsed by default (content hidden)", () => {
    renderSingle()
    expect(screen.queryByText("Content A")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveAttribute(
      "aria-expanded",
      "false"
    )
  })

  it("expands an item on click", async () => {
    const user = userEvent.setup()
    renderSingle()
    await user.click(screen.getByRole("button", { name: "Trigger A" }))
    expect(screen.getByText("Content A")).toBeVisible()
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveAttribute(
      "aria-expanded",
      "true"
    )
  })

  it("collapses again when collapsible and clicked twice", async () => {
    const user = userEvent.setup()
    renderSingle({ collapsible: true })
    const trigger = screen.getByRole("button", { name: "Trigger A" })
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("keeps the open item open in single mode when not collapsible", async () => {
    const user = userEvent.setup()
    renderSingle()
    const trigger = screen.getByRole("button", { name: "Trigger A" })
    await user.click(trigger)
    await user.click(trigger)
    // single, non-collapsible: cannot close the only open item
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("only one item open at a time in single mode", async () => {
    const user = userEvent.setup()
    renderSingle()
    await user.click(screen.getByRole("button", { name: "Trigger A" }))
    await user.click(screen.getByRole("button", { name: "Trigger B" }))
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveAttribute(
      "aria-expanded",
      "false"
    )
    expect(screen.getByRole("button", { name: "Trigger B" })).toHaveAttribute(
      "aria-expanded",
      "true"
    )
  })

  it("honors defaultValue (single)", () => {
    renderSingle({ defaultValue: "a" })
    expect(screen.getByText("Content A")).toBeVisible()
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveAttribute(
      "aria-expanded",
      "true"
    )
  })

  it("allows multiple open items in multiple mode", async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger>Trigger A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Trigger B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    await user.click(screen.getByRole("button", { name: "Trigger A" }))
    await user.click(screen.getByRole("button", { name: "Trigger B" }))
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveAttribute(
      "aria-expanded",
      "true"
    )
    expect(screen.getByRole("button", { name: "Trigger B" })).toHaveAttribute(
      "aria-expanded",
      "true"
    )
  })

  it("honors defaultValue array (multiple)", () => {
    render(
      <Accordion type="multiple" defaultValue={["a", "b"]}>
        <AccordionItem value="a">
          <AccordionTrigger>Trigger A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Trigger B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByText("Content A")).toBeVisible()
    expect(screen.getByText("Content B")).toBeVisible()
  })

  it("calls onValueChange when toggled (single)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderSingle({ collapsible: true, onValueChange })
    await user.click(screen.getByRole("button", { name: "Trigger A" }))
    expect(onValueChange).toHaveBeenCalledWith("a")
  })

  it("does not toggle a disabled item", async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a" disabled>
          <AccordionTrigger>Trigger A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole("button", { name: "Trigger A" })
    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("sets data-state open on the item and trigger when expanded", async () => {
    const user = userEvent.setup()
    renderSingle({ collapsible: true })
    await user.click(screen.getByRole("button", { name: "Trigger A" }))
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveAttribute(
      "data-state",
      "open"
    )
  })

  it("renders a chevron icon in each trigger", () => {
    const { container } = renderSingle()
    // lucide ChevronDown renders an svg per trigger
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(2)
  })

  it("merges custom classNames", () => {
    render(
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a" className="item-class">
          <AccordionTrigger className="trigger-class">Trigger A</AccordionTrigger>
          <AccordionContent className="content-class">Content A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole("button", { name: "Trigger A" })).toHaveClass(
      "trigger-class"
    )
  })

  it("forwards refs", () => {
    const itemRef = createRef<HTMLDivElement>()
    const triggerRef = createRef<HTMLButtonElement>()
    const contentRef = createRef<HTMLDivElement>()
    render(
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a" ref={itemRef}>
          <AccordionTrigger ref={triggerRef}>Trigger A</AccordionTrigger>
          <AccordionContent ref={contentRef}>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(itemRef.current).not.toBeNull()
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(contentRef.current).not.toBeNull()
  })
})
