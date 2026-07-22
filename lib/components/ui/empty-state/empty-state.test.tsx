import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import { EmptyState } from "./empty-state"

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No results" />)
    expect(screen.getByText("No results")).toBeInTheDocument()
  })

  it("renders the description when provided", () => {
    render(<EmptyState title="No results" description="Try another search" />)
    expect(screen.getByText("Try another search")).toBeInTheDocument()
  })

  it("does not render description container when omitted", () => {
    render(<EmptyState title="No results" />)
    expect(screen.queryByText("Try another search")).not.toBeInTheDocument()
  })

  it("renders the icon when provided", () => {
    render(
      <EmptyState title="No results" icon={<svg data-testid="icon" />} />
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("does not render icon wrapper when omitted", () => {
    const { container } = render(<EmptyState title="No results" />)
    expect(container.querySelector("svg")).not.toBeInTheDocument()
  })

  it("renders action children", () => {
    render(
      <EmptyState title="No results">
        <button>Reset</button>
      </EmptyState>
    )
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument()
  })

  it("fires action click", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <EmptyState title="No results">
        <button onClick={onClick}>Reset</button>
      </EmptyState>
    )
    await user.click(screen.getByRole("button", { name: "Reset" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <EmptyState ref={ref} className="custom" title="No results" data-testid="empty" />
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("empty")).toHaveClass("custom")
  })

  it("renders ReactNode title and description", () => {
    render(
      <EmptyState
        title={<span data-testid="node-title">Node Title</span>}
        description={<span data-testid="node-desc">Node Desc</span>}
      />
    )
    expect(screen.getByTestId("node-title")).toBeInTheDocument()
    expect(screen.getByTestId("node-desc")).toBeInTheDocument()
  })
})
