import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemCount,
} from "./list"

describe("List", () => {
  it("renders a ul with base classes", () => {
    render(<List data-testid="list" />)
    const list = screen.getByTestId("list")
    expect(list.tagName).toBe("UL")
    expect(list).toHaveClass("rounded-md", "border", "bg-background")
  })

  it("renders children", () => {
    render(
      <List>
        <ListItem>Row</ListItem>
      </List>
    )
    expect(screen.getByRole("listitem")).toHaveTextContent("Row")
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLUListElement>()
    render(<List ref={ref} className="custom" data-testid="list" />)
    expect(ref.current).toBeInstanceOf(HTMLUListElement)
    expect(screen.getByTestId("list")).toHaveClass("custom")
  })
})

describe("ListSubheader", () => {
  it("renders an li with subheader styling", () => {
    render(
      <ul>
        <ListSubheader>General</ListSubheader>
      </ul>
    )
    const sub = screen.getByRole("listitem")
    expect(sub.tagName).toBe("LI")
    expect(sub).toHaveTextContent("General")
    expect(sub).toHaveClass("uppercase")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLLIElement>()
    render(
      <ul>
        <ListSubheader ref={ref}>x</ListSubheader>
      </ul>
    )
    expect(ref.current).toBeInstanceOf(HTMLLIElement)
  })
})

describe("ListItem", () => {
  it("renders interactive by default (cursor-pointer, divider)", () => {
    render(<ListItem data-testid="item">Row</ListItem>)
    const item = screen.getByTestId("item")
    expect(item).toHaveClass("cursor-pointer", "border-b")
    expect(item).not.toHaveAttribute("data-active")
  })

  it("applies active state with data-active and brand-sky bg", () => {
    render(
      <ListItem data-testid="item" active>
        Row
      </ListItem>
    )
    const item = screen.getByTestId("item")
    expect(item).toHaveAttribute("data-active")
    expect(item).toHaveClass("bg-brand-sky")
  })

  it("omits interactive classes when interactive is false", () => {
    render(
      <ListItem data-testid="item" interactive={false}>
        Row
      </ListItem>
    )
    expect(screen.getByTestId("item")).not.toHaveClass("cursor-pointer")
  })

  it("hides divider when disableDivider is true", () => {
    render(
      <ListItem data-testid="item" disableDivider>
        Row
      </ListItem>
    )
    expect(screen.getByTestId("item")).not.toHaveClass("border-b")
  })

  it("fires onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <ListItem data-testid="item" onClick={onClick}>
        Row
      </ListItem>
    )
    await user.click(screen.getByTestId("item"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLLIElement>()
    render(
      <ListItem ref={ref} className="custom" data-testid="item">
        Row
      </ListItem>
    )
    expect(ref.current).toBeInstanceOf(HTMLLIElement)
    expect(screen.getByTestId("item")).toHaveClass("custom")
  })
})

describe("ListItemIcon", () => {
  it("renders chip style by default", () => {
    render(
      <ListItemIcon data-testid="icon">
        <svg />
      </ListItemIcon>
    )
    const icon = screen.getByTestId("icon")
    expect(icon).toHaveClass("size-8", "rounded-md", "bg-muted")
  })

  it("renders plain style (bare icon)", () => {
    render(<ListItemIcon data-testid="icon" plain />)
    const icon = screen.getByTestId("icon")
    expect(icon).toHaveClass("size-4", "text-current")
    expect(icon).not.toHaveClass("bg-muted")
  })

  it("renders no chip/plain styling when unstyled", () => {
    render(<ListItemIcon data-testid="icon" unstyled />)
    const icon = screen.getByTestId("icon")
    expect(icon).not.toHaveClass("bg-muted")
    expect(icon).not.toHaveClass("size-8")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<ListItemIcon ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("ListItemText", () => {
  it("renders primary and secondary text", () => {
    render(<ListItemText primary="Title" secondary="Subtitle" />)
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Subtitle")).toBeInTheDocument()
  })

  it("renders only primary when secondary is omitted", () => {
    render(<ListItemText primary="Title" />)
    expect(screen.getByText("Title")).toBeInTheDocument()
  })

  it("renders children alongside primary/secondary", () => {
    render(
      <ListItemText primary="Title">
        <span>extra</span>
      </ListItemText>
    )
    expect(screen.getByText("extra")).toBeInTheDocument()
  })

  it("renders nothing for primary/secondary when both are null", () => {
    render(<ListItemText data-testid="text" />)
    const text = screen.getByTestId("text")
    expect(text).toBeEmptyDOMElement()
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ListItemText ref={ref} className="custom" data-testid="text" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("text")).toHaveClass("custom")
  })
})

describe("ListItemCount", () => {
  it("renders neutral count by default", () => {
    render(<ListItemCount data-testid="count">5</ListItemCount>)
    const count = screen.getByTestId("count")
    expect(count).toHaveTextContent("5")
    expect(count).toHaveClass("bg-neutral-200")
  })

  it("renders active (inverted) treatment", () => {
    render(
      <ListItemCount data-testid="count" active>
        5
      </ListItemCount>
    )
    const count = screen.getByTestId("count")
    expect(count).toHaveClass("bg-background", "text-info")
    expect(count).not.toHaveClass("bg-neutral-200")
  })

  it("forwards ref and merges className", () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <ListItemCount ref={ref} className="custom" data-testid="count">
        1
      </ListItemCount>
    )
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(screen.getByTestId("count")).toHaveClass("custom")
  })
})
