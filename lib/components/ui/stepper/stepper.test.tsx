import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import { Stepper } from "./stepper"

const steps = ["Account", "Profile", "Review", "Done"]

describe("Stepper", () => {
  it("renders a list landmark labelled progress with one item per step", () => {
    render(<Stepper steps={steps} currentStep={1} />)
    const list = screen.getByRole("list", { name: "progress" })
    expect(list).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(steps.length)
  })

  it("renders all step labels", () => {
    render(<Stepper steps={steps} currentStep={0} />)
    steps.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it("marks the current step with aria-current=step", () => {
    render(<Stepper steps={steps} currentStep={2} />)
    const items = screen.getAllByRole("listitem")
    expect(items[2]).toHaveAttribute("aria-current", "step")
    expect(items[0]).not.toHaveAttribute("aria-current")
    expect(items[1]).not.toHaveAttribute("aria-current")
    expect(items[3]).not.toHaveAttribute("aria-current")
  })

  it("shows check icons for completed steps and numbers for upcoming steps", () => {
    const { container } = render(<Stepper steps={steps} currentStep={2} />)
    // completed steps (index 0,1) render a Check svg instead of a number
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(2)
    // upcoming step number 4 (index 3) shows its index+1
    expect(screen.getByText("4")).toBeInTheDocument()
    // current step (index 2) shows number 3
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("renders step number for the first upcoming step when currentStep is 0", () => {
    render(<Stepper steps={steps} currentStep={0} />)
    // no completed steps -> all show numbers 1..4
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("4")).toBeInTheDocument()
  })

  it("supports object steps with description and error status", () => {
    render(
      <Stepper
        steps={[
          { label: "Start", description: "Completed" },
          { label: "Broken", status: "error" },
          { label: "End" },
        ]}
        currentStep={1}
      />
    )
    expect(screen.getByText("Start")).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()
    expect(screen.getByText("Broken")).toBeInTheDocument()
  })

  it("error step is not treated as current (no aria-current) and shows error label color", () => {
    render(
      <Stepper
        steps={[{ label: "A" }, { label: "Bad", status: "error" }, { label: "C" }]}
        currentStep={1}
      />
    )
    const items = screen.getAllByRole("listitem")
    // index 1 is currentStep but has error status, so isCurrent is false
    expect(items[1]).not.toHaveAttribute("aria-current")
    expect(screen.getByText("Bad")).toHaveClass("text-brand")
  })

  it("renders horizontal orientation by default (items-center)", () => {
    render(<Stepper steps={steps} currentStep={0} data-testid="stepper" />)
    expect(screen.getByTestId("stepper")).toHaveClass("items-center")
  })

  it("renders vertical orientation (flex-col)", () => {
    render(
      <Stepper
        steps={steps}
        currentStep={0}
        orientation="vertical"
        data-testid="stepper"
      />
    )
    expect(screen.getByTestId("stepper")).toHaveClass("flex-col")
  })

  it("vertical orientation still marks current step", () => {
    render(<Stepper steps={steps} currentStep={1} orientation="vertical" />)
    const items = screen.getAllByRole("listitem")
    expect(items[1]).toHaveAttribute("aria-current", "step")
  })

  it("dot variant renders no numbers or check text", () => {
    render(<Stepper steps={steps} currentStep={1} variant="dot" />)
    // dot variant markers have no numeric text content
    expect(screen.queryByText("1")).not.toBeInTheDocument()
    expect(screen.queryByText("4")).not.toBeInTheDocument()
    // labels still present
    expect(screen.getByText("Account")).toBeInTheDocument()
  })

  it("handles a single step (no connector, no crash)", () => {
    render(<Stepper steps={["Only"]} currentStep={0} />)
    expect(screen.getByText("Only")).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(1)
  })

  it("handles empty steps array", () => {
    render(<Stepper steps={[]} currentStep={0} />)
    expect(screen.getByRole("list", { name: "progress" })).toBeInTheDocument()
    expect(screen.queryAllByRole("listitem")).toHaveLength(0)
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Stepper ref={ref} steps={steps} currentStep={0} className="custom" data-testid="stepper" />
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("stepper")).toHaveClass("custom")
  })
})
