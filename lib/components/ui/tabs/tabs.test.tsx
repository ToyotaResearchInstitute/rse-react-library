import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsTriggerCount,
} from "./tabs"

function renderTabs(
  props: React.ComponentProps<typeof Tabs> = {},
  listProps: React.ComponentProps<typeof TabsList> = {}
) {
  return render(
    <Tabs {...props}>
      <TabsList {...listProps}>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Panel One</TabsContent>
      <TabsContent value="two">Panel Two</TabsContent>
      <TabsContent value="three">Panel Three</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("renders tabs with role tab", () => {
    renderTabs({ defaultValue: "one" })
    expect(screen.getAllByRole("tab")).toHaveLength(3)
  })

  it("shows the defaultValue panel and marks its tab active", () => {
    renderTabs({ defaultValue: "two" })
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two")
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "data-state",
      "active"
    )
  })

  it("switches panels when a different tab is clicked", async () => {
    const user = userEvent.setup()
    renderTabs({ defaultValue: "one" })
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel One")

    await user.click(screen.getByRole("tab", { name: "Three" }))
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Three")
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "data-state",
      "active"
    )
  })

  it("calls onValueChange when switching tabs", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderTabs({ defaultValue: "one", onValueChange })

    await user.click(screen.getByRole("tab", { name: "Two" }))
    expect(onValueChange).toHaveBeenCalledWith("two")
  })

  it("respects controlled value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Tabs value="one" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel One</TabsContent>
        <TabsContent value="two">Panel Two</TabsContent>
      </Tabs>
    )
    await user.click(screen.getByRole("tab", { name: "Two" }))
    expect(onValueChange).toHaveBeenCalledWith("two")
    // controlled: panel stays on one
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel One")

    rerender(
      <Tabs value="two" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel One</TabsContent>
        <TabsContent value="two">Panel Two</TabsContent>
      </Tabs>
    )
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two")
  })

  it("does not activate a disabled tab", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Tabs defaultValue="one" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two" disabled>
            Two
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel One</TabsContent>
        <TabsContent value="two">Panel Two</TabsContent>
      </Tabs>
    )
    const two = screen.getByRole("tab", { name: "Two" })
    expect(two).toBeDisabled()
    await user.click(two)
    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel One")
  })

  it("supports arrow-key navigation between tabs", async () => {
    const user = userEvent.setup()
    renderTabs({ defaultValue: "one" })

    screen.getByRole("tab", { name: "One" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus()
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel Two")
  })

  it.each(["underline", "pills", "segmented"] as const)(
    "renders list variant=%s",
    (variant) => {
      renderTabs({ defaultValue: "one" }, { variant })
      // all three variants still render three tabs
      expect(screen.getAllByRole("tab")).toHaveLength(3)
    }
  )

  it("applies pills active accent for a given color", () => {
    renderTabs({ defaultValue: "one" }, { variant: "pills", color: "brand" })
    expect(screen.getByRole("tab", { name: "One" })).toHaveClass(
      "data-[state=active]:bg-brand"
    )
  })

  it("applies underline active accent for a given color", () => {
    renderTabs({ defaultValue: "one" }, { variant: "underline", color: "blue" })
    expect(screen.getByRole("tab", { name: "One" })).toHaveClass(
      "data-[state=active]:text-info"
    )
  })

  it("renders TabsTriggerCount as a badge", () => {
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">
            One <TabsTriggerCount>5</TabsTriggerCount>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel One</TabsContent>
      </Tabs>
    )
    const count = screen.getByText("5")
    expect(count).toBeInTheDocument()
    expect(count).toHaveClass("rounded-pill")
  })

  it("merges custom classNames", () => {
    render(
      <Tabs defaultValue="one">
        <TabsList className="list-class">
          <TabsTrigger value="one" className="trigger-class">
            One
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" className="content-class">
          Panel One
        </TabsContent>
      </Tabs>
    )
    expect(screen.getByRole("tablist")).toHaveClass("list-class")
    expect(screen.getByRole("tab")).toHaveClass("trigger-class")
    expect(screen.getByRole("tabpanel")).toHaveClass("content-class")
  })

  it("forwards refs", () => {
    const listRef = createRef<HTMLDivElement>()
    const triggerRef = createRef<HTMLButtonElement>()
    const contentRef = createRef<HTMLDivElement>()
    const countRef = createRef<HTMLSpanElement>()
    render(
      <Tabs defaultValue="one">
        <TabsList ref={listRef}>
          <TabsTrigger value="one" ref={triggerRef}>
            One <TabsTriggerCount ref={countRef}>5</TabsTriggerCount>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" ref={contentRef}>
          Panel One
        </TabsContent>
      </Tabs>
    )
    expect(listRef.current).not.toBeNull()
    expect(triggerRef.current).not.toBeNull()
    expect(contentRef.current).not.toBeNull()
    expect(countRef.current).toBeInstanceOf(HTMLSpanElement)
  })
})
