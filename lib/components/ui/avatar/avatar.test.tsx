import { createRef } from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarWrap,
  AvatarPresence,
  AvatarGroup,
  avatarVariants,
} from "./avatar"

describe("Avatar", () => {
  it("renders the root with default size and shape classes", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )

    const root = screen.getByTestId("avatar")
    expect(root).toBeInTheDocument()
    // default size m -> h-10 w-10, default shape circle -> rounded-pill
    expect(root).toHaveClass("tri-h-10", "tri-w-10", "tri-rounded-pill")
  })

  it.each([
    ["xs", "tri-h-6"],
    ["s", "tri-h-8"],
    ["m", "tri-h-10"],
    ["l", "tri-h-14"],
    ["xl", "tri-h-20"],
  ] as const)("applies size=%s class", (size, expected) => {
    render(
      <Avatar data-testid="avatar" size={size}>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId("avatar")).toHaveClass(expected)
  })

  it.each([
    ["circle", "tri-rounded-pill"],
    ["rounded", "tri-rounded-lg"],
    ["square", "tri-rounded-sm"],
  ] as const)("applies shape=%s class", (shape, expected) => {
    render(
      <Avatar data-testid="avatar" shape={shape}>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId("avatar")).toHaveClass(expected)
  })

  it("merges a custom className", () => {
    render(
      <Avatar data-testid="avatar" className="custom-class">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId("avatar")).toHaveClass("custom-class")
  })

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <Avatar ref={ref}>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it("avatarVariants helper returns classes for given variants", () => {
    const result = avatarVariants({ size: "xl", shape: "square" })
    expect(result).toContain("tri-h-20")
    expect(result).toContain("tri-rounded-sm")
  })
})

describe("AvatarFallback", () => {
  it("renders the fallback content (image does not load in jsdom)", async () => {
    render(
      <Avatar>
        <AvatarImage src="/does-not-exist.png" alt="user" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(await screen.findByText("JD")).toBeInTheDocument()
  })

  it("applies the default neutral color tint", async () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    const fb = await screen.findByText("JD")
    expect(fb).toHaveClass("tri-bg-[#eeeeee]", "tri-text-[#404040]")
  })

  it.each([
    ["red", "tri-bg-[#fbe5e8]"],
    ["blue", "tri-bg-[#ECF6FF]"],
    ["green", "tri-bg-[#EAF4EA]"],
    ["amber", "tri-bg-[#FDF0E2]"],
    ["purple", "tri-bg-[#efe6f8]"],
    ["steel", "tri-bg-[#e6e7e8]"],
    ["dark", "tri-bg-[#0b0b0d]"],
  ] as const)("applies color=%s tint", async (color, expected) => {
    render(
      <Avatar>
        <AvatarFallback color={color}>JD</AvatarFallback>
      </Avatar>
    )
    const fb = await screen.findByText("JD")
    expect(fb).toHaveClass(expected)
  })

  it("forwards ref", async () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <Avatar>
        <AvatarFallback ref={ref}>JD</AvatarFallback>
      </Avatar>
    )
    await screen.findByText("JD")
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})

describe("AvatarWrap", () => {
  it("renders children and merges className", () => {
    render(
      <AvatarWrap data-testid="wrap" className="extra">
        <span>child</span>
      </AvatarWrap>
    )
    const wrap = screen.getByTestId("wrap")
    expect(wrap).toHaveClass("tri-relative", "tri-inline-flex", "extra")
    expect(screen.getByText("child")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<AvatarWrap ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("AvatarPresence", () => {
  it("defaults to online status with aria-label and color", () => {
    render(<AvatarPresence data-testid="dot" />)
    const dot = screen.getByTestId("dot")
    expect(dot).toHaveAttribute("aria-label", "online")
    expect(dot).toHaveClass("tri-bg-[#2E7D32]")
  })

  it.each([
    ["online", "tri-bg-[#2E7D32]"],
    ["away", "tri-bg-[#D14900]"],
    ["offline", "tri-bg-[#a1a1aa]"],
  ] as const)("renders status=%s", (status, expected) => {
    render(<AvatarPresence status={status} />)
    const dot = screen.getByLabelText(status)
    expect(dot).toHaveClass(expected)
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<AvatarPresence ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("AvatarGroup", () => {
  it("renders children and merges className", () => {
    render(
      <AvatarGroup data-testid="group" className="extra">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    )
    const group = screen.getByTestId("group")
    expect(group).toHaveClass("tri-inline-flex", "extra")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<AvatarGroup ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
