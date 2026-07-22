import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  CardEyebrow,
  StatCard,
  cardVariants,
} from "./card"

describe("Card", () => {
  it("renders with default outlined variant", () => {
    render(<Card data-testid="card">content</Card>)
    const card = screen.getByTestId("card")
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass("border", "bg-card", "shadow-none")
  })

  it.each([
    ["outlined", "bg-card"],
    ["elevated", "border-transparent"],
    ["flat", "bg-muted"],
  ] as const)("applies variant=%s", (variant, expected) => {
    render(
      <Card data-testid="card" variant={variant}>
        x
      </Card>
    )
    expect(screen.getByTestId("card")).toHaveClass(expected)
  })

  it("adds interactive classes when clickable is true", () => {
    render(
      <Card data-testid="card" clickable>
        x
      </Card>
    )
    expect(screen.getByTestId("card")).toHaveClass("cursor-pointer")
  })

  it("does not add cursor-pointer when clickable is false (default)", () => {
    render(<Card data-testid="card">x</Card>)
    expect(screen.getByTestId("card")).not.toHaveClass("cursor-pointer")
  })

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Card data-testid="card" clickable onClick={onClick}>
        x
      </Card>
    )
    await user.click(screen.getByTestId("card"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("merges custom className", () => {
    render(
      <Card data-testid="card" className="custom">
        x
      </Card>
    )
    expect(screen.getByTestId("card")).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Card ref={ref}>x</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("cardVariants helper reflects variant and clickable", () => {
    const result = cardVariants({ variant: "elevated", clickable: true })
    expect(result).toContain("cursor-pointer")
  })
})

describe("Card subcomponents", () => {
  it("renders CardHeader/Title/Description/Content/Footer composition", () => {
    render(
      <Card>
        <CardHeader>
          <CardEyebrow>EYEBROW</CardEyebrow>
          <CardTitle>My Title</CardTitle>
          <CardDescription>My description</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )
    expect(screen.getByText("EYEBROW")).toBeInTheDocument()
    expect(screen.getByText("My Title")).toBeInTheDocument()
    expect(screen.getByText("My description")).toBeInTheDocument()
    expect(screen.getByText("Body content")).toBeInTheDocument()
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })

  it("CardMedia renders children", () => {
    render(<CardMedia data-testid="media">IMAGE</CardMedia>)
    const media = screen.getByTestId("media")
    expect(media).toHaveTextContent("IMAGE")
    expect(media).toHaveClass("h-[140px]")
  })

  it.each([
    ["CardHeader", CardHeader],
    ["CardTitle", CardTitle],
    ["CardDescription", CardDescription],
    ["CardContent", CardContent],
    ["CardFooter", CardFooter],
    ["CardMedia", CardMedia],
    ["CardEyebrow", CardEyebrow],
  ] as const)("%s forwards ref and merges className", (_name, Comp) => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Comp ref={ref} className="custom" data-testid="sub">
        x
      </Comp>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("sub")).toHaveClass("custom")
  })
})

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Revenue" value="$1,234" />)
    expect(screen.getByText("Revenue")).toBeInTheDocument()
    expect(screen.getByText("$1,234")).toBeInTheDocument()
  })

  it("renders icon when provided", () => {
    render(
      <StatCard
        label="Users"
        value="42"
        icon={<svg data-testid="icon" />}
      />
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("does not render delta when not provided", () => {
    render(<StatCard label="Users" value="42" />)
    expect(screen.queryByText("+12%")).not.toBeInTheDocument()
  })

  it("renders delta with up direction (green) by default", () => {
    render(<StatCard label="Users" value="42" delta="+12%" />)
    const delta = screen.getByText("+12%")
    expect(delta).toBeInTheDocument()
    expect(delta).toHaveClass("text-[#256628]")
  })

  it("renders delta with down direction (red)", () => {
    render(
      <StatCard label="Users" value="42" delta="-5%" deltaDirection="down" />
    )
    const delta = screen.getByText("-5%")
    expect(delta).toHaveClass("text-[#c93030]")
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <StatCard ref={ref} className="custom" label="L" value="V" />
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("custom")
  })
})
