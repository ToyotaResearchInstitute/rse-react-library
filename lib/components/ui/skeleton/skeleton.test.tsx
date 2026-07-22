import { render } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import {
  Skeleton,
  SkeletonListItem,
  SkeletonStatTiles,
  SkeletonTableRows,
} from "./skeleton"

describe("Skeleton", () => {
  it("renders with base classes and a shimmer overlay", () => {
    const { container } = render(<Skeleton />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass("relative", "overflow-hidden", "bg-muted")
    expect(root.querySelector(".animate-shimmer")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-1/2" />)
    expect(container.firstChild).toHaveClass("h-4", "w-1/2")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Skeleton ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("passes through arbitrary props", () => {
    const { getByTestId } = render(<Skeleton data-testid="sk" />)
    expect(getByTestId("sk")).toBeInTheDocument()
  })
})

describe("SkeletonListItem", () => {
  it("renders an avatar, two lines and a trailing bar (4 skeletons)", () => {
    const { container } = render(<SkeletonListItem />)
    // each Skeleton contains an animate-shimmer child
    expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(4)
  })

  it("merges custom className on the wrapper", () => {
    const { container } = render(<SkeletonListItem className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })

  it("passes through arbitrary props", () => {
    const { getByTestId } = render(<SkeletonListItem data-testid="li" />)
    expect(getByTestId("li")).toBeInTheDocument()
  })
})

describe("SkeletonStatTiles", () => {
  it("renders 3 tiles by default (3 skeletons each = 9)", () => {
    const { container } = render(<SkeletonStatTiles />)
    expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(9)
  })

  it("renders a custom count of tiles", () => {
    const { container } = render(<SkeletonStatTiles count={5} />)
    expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(15)
  })

  it("merges custom className", () => {
    const { container } = render(<SkeletonStatTiles className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })
})

describe("SkeletonTableRows", () => {
  it("renders 3 rows by default (5 skeletons each = 15)", () => {
    const { container } = render(<SkeletonTableRows />)
    expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(15)
  })

  it("renders a custom number of rows", () => {
    const { container } = render(<SkeletonTableRows rows={2} />)
    expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(10)
  })

  it("merges custom className", () => {
    const { container } = render(<SkeletonTableRows className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })
})
