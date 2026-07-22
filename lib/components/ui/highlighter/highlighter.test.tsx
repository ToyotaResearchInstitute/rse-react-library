import { render, screen, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi, afterEach } from "vitest"

import { Highlighter, Highlight } from "./highlighter"

function renderAt(
  hashPath: string,
  ui: React.ReactNode,
  props?: React.ComponentProps<typeof Highlighter>
) {
  return render(
    <MemoryRouter initialEntries={[hashPath]}>
      <Highlighter {...props}>{ui}</Highlighter>
    </MemoryRouter>
  )
}

describe("Highlight", () => {
  it("renders its single child", () => {
    render(
      <MemoryRouter>
        <Highlighter>
          <Highlight id="a">
            <span>Child content</span>
          </Highlight>
        </Highlighter>
      </MemoryRouter>
    )
    expect(screen.getByText("Child content")).toBeInTheDocument()
  })

  it("returns null when given no child", () => {
    const { container } = render(
      <MemoryRouter>
        <Highlighter>
          <Highlight id="a" />
        </Highlighter>
      </MemoryRouter>
    )
    // Highlighter provider renders nothing visible; no overlay wrapper produced
    expect(container.querySelector(".relative")).not.toBeInTheDocument()
  })

  it("throws when given multiple children", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    expect(() =>
      render(
        <MemoryRouter>
          <Highlighter>
            <Highlight id="a">
              <span>one</span>
              <span>two</span>
            </Highlight>
          </Highlighter>
        </MemoryRouter>
      )
    ).toThrow("Highlight only accepts a single child")
    spy.mockRestore()
  })

  it("applies the highlighted (opacity-1) class when the hash matches the id", () => {
    const { container } = renderAt(
      "/page#section1",
      <Highlight id="section1">
        <span>Target</span>
      </Highlight>
    )
    const overlay = container.querySelector(".opacity-1")
    expect(overlay).toBeInTheDocument()
    expect(container.querySelector(".opacity-0")).not.toBeInTheDocument()
  })

  it("applies the unhighlighted (opacity-0) class when the hash does not match", () => {
    const { container } = renderAt(
      "/page#other",
      <Highlight id="section1">
        <span>Target</span>
      </Highlight>
    )
    expect(container.querySelector(".opacity-0")).toBeInTheDocument()
    expect(container.querySelector(".opacity-1")).not.toBeInTheDocument()
  })

  it("is unhighlighted when there is no hash", () => {
    const { container } = renderAt(
      "/page",
      <Highlight id="section1">
        <span>Target</span>
      </Highlight>
    )
    expect(container.querySelector(".opacity-0")).toBeInTheDocument()
  })

  it("uses the transitionDuration from context in the inline style", () => {
    const { container } = renderAt(
      "/page#section1",
      <Highlight id="section1">
        <span>Target</span>
      </Highlight>,
      { transitionDuration: 500 }
    )
    const overlay = container.querySelector(".opacity-1") as HTMLElement
    expect(overlay.style.transition).toContain("500ms")
  })

  it("uses the default transition duration (1000ms) when not overridden", () => {
    const { container } = renderAt(
      "/page#section1",
      <Highlight id="section1">
        <span>Target</span>
      </Highlight>
    )
    const overlay = container.querySelector(".opacity-1") as HTMLElement
    expect(overlay.style.transition).toContain("1000ms")
  })
})

describe("Highlighter timeout behavior", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("clears the highlight after highlightDuration + transitionDuration elapses", () => {
    vi.useFakeTimers()
    const { container } = render(
      <MemoryRouter initialEntries={["/page#section1"]}>
        <Highlighter highlightDuration={100} transitionDuration={100}>
          <Highlight id="section1">
            <span>Target</span>
          </Highlight>
        </Highlighter>
      </MemoryRouter>
    )
    // initially highlighted
    expect(container.querySelector(".opacity-1")).toBeInTheDocument()

    // advance past the combined timer (200ms)
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(container.querySelector(".opacity-1")).not.toBeInTheDocument()
    expect(container.querySelector(".opacity-0")).toBeInTheDocument()
  })
})
