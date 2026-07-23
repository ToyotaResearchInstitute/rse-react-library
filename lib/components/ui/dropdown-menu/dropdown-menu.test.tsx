import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu"

describe("DropdownMenu", () => {
  it("is closed by default", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("opens on trigger click and shows items", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole("button", { name: "Menu" }))
    expect(await screen.findByRole("menu")).toBeInTheDocument()
    expect(screen.getAllByRole("menuitem")).toHaveLength(2)
  })

  it("renders open when defaultOpen is set", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    expect(await screen.findByRole("menuitem", { name: "Edit" })).toBeInTheDocument()
  })

  it("fires onOpenChange when opened", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole("button", { name: "Menu" }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it("calls onSelect and closes when an item is clicked", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(await screen.findByRole("menuitem", { name: "Edit" }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("closes on Escape", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await screen.findByRole("menu")
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("does not fire onSelect for a disabled item", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={onSelect}>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const item = await screen.findByRole("menuitem", { name: "Edit" })
    await user.click(item)
    expect(onSelect).not.toHaveBeenCalled()
  })
})

describe("DropdownMenuItem variants", () => {
  it("applies default variant classes", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const item = await screen.findByRole("menuitem", { name: "Edit" })
    expect(item).toHaveClass("text-foreground")
    expect(item).not.toHaveClass("text-[#c93030]")
  })

  it("applies danger variant classes", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const item = await screen.findByRole("menuitem", { name: "Delete" })
    expect(item).toHaveClass("text-[#c93030]")
  })

  it("applies inset padding", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Indented</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const item = await screen.findByRole("menuitem", { name: "Indented" })
    expect(item).toHaveClass("pl-8")
  })
})

describe("DropdownMenuCheckboxItem", () => {
  it("renders a menuitemcheckbox reflecting the checked state", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const item = await screen.findByRole("menuitemcheckbox", { name: "Show grid" })
    expect(item).toHaveAttribute("aria-checked", "true")
  })

  it("fires onCheckedChange when toggled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Show grid
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(
      await screen.findByRole("menuitemcheckbox", { name: "Show grid" })
    )
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("works as a controlled checkbox item across re-render", async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [checked, setChecked] = React.useState(false)
      return (
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
              onSelect={(e) => e.preventDefault()}
            >
              Show grid
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    render(<Controlled />)
    const item = await screen.findByRole("menuitemcheckbox", { name: "Show grid" })
    expect(item).toHaveAttribute("aria-checked", "false")
    await user.click(item)
    expect(
      await screen.findByRole("menuitemcheckbox", { name: "Show grid" })
    ).toHaveAttribute("aria-checked", "true")
  })
})

describe("DropdownMenuRadioGroup / RadioItem", () => {
  it("renders radio items reflecting the selected value", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="b">
            <DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const a = await screen.findByRole("menuitemradio", { name: "Option A" })
    const b = await screen.findByRole("menuitemradio", { name: "Option B" })
    expect(a).toHaveAttribute("aria-checked", "false")
    expect(b).toHaveAttribute("aria-checked", "true")
  })

  it("fires onValueChange when a radio item is selected", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="a" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(await screen.findByRole("menuitemradio", { name: "Option B" }))
    expect(onValueChange).toHaveBeenCalledWith("b")
  })
})

describe("DropdownMenu structural subcomponents", () => {
  it("renders label, separator, group and shortcut", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator data-testid="sep" />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Copy
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await screen.findByRole("menu")
    expect(screen.getByText("Actions")).toBeInTheDocument()
    expect(screen.getByTestId("sep")).toHaveClass("h-px")
    expect(screen.getByText("⌘C")).toHaveClass("ml-auto")
  })

  it("applies inset padding on DropdownMenuLabel", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Actions</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await screen.findByRole("menu")
    expect(screen.getByText("Actions")).toHaveClass("pl-8")
  })

  it("DropdownMenuContent merges custom className", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent className="menu-x">
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    const menu = await screen.findByRole("menu")
    expect(menu).toHaveClass("menu-x")
  })
})
