import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  drawerVariants,
} from "./drawer"

function BasicDrawer(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (o: boolean) => void
  side?: "right" | "left" | "top" | "bottom"
  hideClose?: boolean
}) {
  return (
    <Drawer
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
    >
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent side={props.side} hideClose={props.hideClose}>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Drawer description</DrawerDescription>
        </DrawerHeader>
        <div>Panel content</div>
        <DrawerFooter>
          <DrawerClose>Dismiss</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe("Drawer", () => {
  it("is closed by default", () => {
    render(<BasicDrawer />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(<BasicDrawer />)
    await user.click(screen.getByRole("button", { name: "Open drawer" }))
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
  })

  it("renders title, description and body", async () => {
    render(<BasicDrawer defaultOpen />)
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveAccessibleName("Drawer title")
    expect(dialog).toHaveAccessibleDescription("Drawer description")
    expect(screen.getByText("Panel content")).toBeInTheDocument()
  })

  it("opens with controlled open true", async () => {
    render(<BasicDrawer open />)
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
  })

  it("does not open when controlled open is false", async () => {
    const user = userEvent.setup()
    render(<BasicDrawer open={false} />)
    await user.click(screen.getByRole("button", { name: "Open drawer" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("fires onOpenChange on trigger click", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<BasicDrawer onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole("button", { name: "Open drawer" }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it("closes on Escape", async () => {
    const user = userEvent.setup()
    render(<BasicDrawer defaultOpen />)
    await screen.findByRole("dialog")
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes via the built-in close (X) button", async () => {
    const user = userEvent.setup()
    render(<BasicDrawer defaultOpen />)
    await screen.findByRole("dialog")
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes via a DrawerClose child", async () => {
    const user = userEvent.setup()
    render(<BasicDrawer defaultOpen />)
    await screen.findByRole("dialog")
    await user.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("hides the close button when hideClose is set", async () => {
    render(<BasicDrawer defaultOpen hideClose />)
    await screen.findByRole("dialog")
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument()
  })

  it("defaults to the right side variant", async () => {
    render(<BasicDrawer defaultOpen hideClose />)
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveClass("right-0", "border-l")
  })

  it.each([
    ["left", "left-0", "border-r"],
    ["top", "top-0", "border-b"],
    ["bottom", "bottom-0", "border-t"],
    ["right", "right-0", "border-l"],
  ] as const)("applies the %s side variant classes", async (side, pos, border) => {
    render(<BasicDrawer defaultOpen hideClose side={side} />)
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveClass(pos, border)
  })
})

describe("drawerVariants", () => {
  it("defaults to the right side when called with no args", () => {
    const out = drawerVariants()
    expect(out).toContain("right-0")
    expect(out).toContain("border-l")
  })

  it("returns requested side classes", () => {
    expect(drawerVariants({ side: "left" })).toContain("left-0")
    expect(drawerVariants({ side: "top" })).toContain("rounded-b-[14px]")
    expect(drawerVariants({ side: "bottom" })).toContain("rounded-t-[14px]")
  })

  it("always includes base classes", () => {
    expect(drawerVariants({ side: "right" })).toContain("fixed")
    expect(drawerVariants({ side: "right" })).toContain("z-50")
  })
})

describe("Drawer subcomponents", () => {
  it("DrawerHeader and DrawerFooter render with their classes", async () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent hideClose>
          <DrawerTitle>T</DrawerTitle>
          <DrawerDescription>D</DrawerDescription>
          <DrawerHeader data-testid="hdr">H</DrawerHeader>
          <DrawerFooter data-testid="ftr">F</DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
    await screen.findByRole("dialog")
    expect(screen.getByTestId("hdr")).toHaveClass("border-b")
    expect(screen.getByTestId("ftr")).toHaveClass("border-t", "justify-end")
  })

  it("DrawerContent merges custom className", async () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent className="panel-x" hideClose>
          <DrawerTitle>T</DrawerTitle>
          <DrawerDescription>D</DrawerDescription>
        </DrawerContent>
      </Drawer>
    )
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveClass("panel-x")
  })
})
