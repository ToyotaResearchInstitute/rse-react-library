import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  AnnotationTooltip,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipVariants,
} from "./tooltip"

function renderTooltip(props?: {
  variant?: "dark" | "light" | "blue" | "annotation"
  showArrow?: boolean
  defaultOpen?: boolean
}) {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip defaultOpen={props?.defaultOpen}>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent variant={props?.variant} showArrow={props?.showArrow}>
          Tooltip text
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

describe("Tooltip", () => {
  it("does not show content by default", () => {
    renderTooltip()
    expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument()
  })

  it("shows content on trigger hover", async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.hover(screen.getByText("Trigger"))
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Tooltip text")
  })

  it("shows content on trigger focus", async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.tab()
    expect(await screen.findByRole("tooltip")).toBeInTheDocument()
  })

  it("renders content when defaultOpen (uncontrolled open)", async () => {
    renderTooltip({ defaultOpen: true })
    // Radix renders tooltip content in multiple nodes; assert at least one.
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument()
  })

  it("supports controlled open via the Root open prop", async () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Controlled</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(await screen.findByText("Controlled")).toBeInTheDocument()
  })

  it("fires onOpenChange when hovered", async () => {
    const user = userEvent.setup()
    let opened = false
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip onOpenChange={(o) => (opened = o)}>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    await user.hover(screen.getByText("Trigger"))
    await screen.findByRole("tooltip")
    expect(opened).toBe(true)
  })

  it("applies the default (dark) variant classes", async () => {
    renderTooltip({ defaultOpen: true })
    const content = await screen.findByRole("tooltip")
    expect(content).toHaveClass("bg-[#0B0B0D]", "text-white")
  })

  it.each([
    ["light", "bg-background"],
    ["blue", "bg-[#1D73BF]"],
    ["annotation", "bg-[#A9D6FF]"],
  ] as const)("applies the %s variant classes", async (variant, cls) => {
    renderTooltip({ variant, defaultOpen: true })
    const content = await screen.findByRole("tooltip")
    expect(content).toHaveClass(cls)
  })

  it("renders an arrow by default", async () => {
    const { container } = renderTooltip({ defaultOpen: true })
    await screen.findByRole("tooltip")
    // Radix arrow renders as an svg
    expect(container.ownerDocument.querySelector("svg")).toBeTruthy()
  })

  it("omits the arrow when showArrow is false", async () => {
    renderTooltip({ showArrow: false, defaultOpen: true })
    const content = await screen.findByRole("tooltip")
    expect(content.querySelector("svg")).toBeNull()
  })
})

describe("tooltipVariants", () => {
  it("returns the default dark variant with no args", () => {
    const out = tooltipVariants()
    expect(out).toContain("bg-[#0B0B0D]")
    expect(out).toContain("text-white")
  })

  it("returns requested variants", () => {
    expect(tooltipVariants({ variant: "light" })).toContain("bg-background")
    expect(tooltipVariants({ variant: "blue" })).toContain("bg-[#1D73BF]")
    expect(tooltipVariants({ variant: "annotation" })).toContain("rounded-full")
  })

  it("always includes base classes", () => {
    expect(tooltipVariants({ variant: "dark" })).toContain("z-50")
  })
})

describe("AnnotationTooltip", () => {
  it("renders with role note and children", () => {
    render(<AnnotationTooltip>Step 1 of 3</AnnotationTooltip>)
    const note = screen.getByRole("note")
    expect(note).toBeInTheDocument()
    expect(note).toHaveTextContent("Step 1 of 3")
  })

  it("defaults to the below tail", () => {
    render(<AnnotationTooltip>Note</AnnotationTooltip>)
    expect(screen.getByRole("note")).toHaveClass("after:border-t-[#A9D6FF]")
  })

  it.each([
    ["above", "after:border-b-[#A9D6FF]"],
    ["left", "after:border-r-[#A9D6FF]"],
    ["right", "after:border-l-[#A9D6FF]"],
    ["below", "after:border-t-[#A9D6FF]"],
  ] as const)("applies the %s tail classes", (tail, cls) => {
    render(<AnnotationTooltip tail={tail}>Note</AnnotationTooltip>)
    expect(screen.getByRole("note")).toHaveClass(cls)
  })

  it("merges custom className", () => {
    render(<AnnotationTooltip className="anno-x">Note</AnnotationTooltip>)
    expect(screen.getByRole("note")).toHaveClass("anno-x", "rounded-full")
  })

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<AnnotationTooltip ref={ref}>Note</AnnotationTooltip>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards arbitrary props", () => {
    render(<AnnotationTooltip data-testid="anno">Note</AnnotationTooltip>)
    expect(screen.getByTestId("anno")).toBeInTheDocument()
  })
})
