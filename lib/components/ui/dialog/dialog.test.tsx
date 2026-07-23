import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

function BasicDialog(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (o: boolean) => void
  hideClose?: boolean
}) {
  return (
    <Dialog
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
    >
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent hideClose={props.hideClose}>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <div>Body content</div>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe("Dialog", () => {
  it("is closed by default", () => {
    render(<BasicDialog />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(<BasicDialog />)
    await user.click(screen.getByRole("button", { name: "Open dialog" }))
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
  })

  it("renders title and description with correct accessible names", async () => {
    render(<BasicDialog defaultOpen />)
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveAccessibleName("Dialog title")
    expect(dialog).toHaveAccessibleDescription("Dialog description")
    expect(screen.getByText("Body content")).toBeInTheDocument()
  })

  it("renders content when controlled open is true", async () => {
    render(<BasicDialog open />)
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
  })

  it("does not open when controlled open is false", async () => {
    const user = userEvent.setup()
    render(<BasicDialog open={false} />)
    await user.click(screen.getByRole("button", { name: "Open dialog" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("calls onOpenChange when opening via trigger", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<BasicDialog onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole("button", { name: "Open dialog" }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it("closes on Escape", async () => {
    const user = userEvent.setup()
    render(<BasicDialog defaultOpen />)
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes when the built-in close (X) button is clicked", async () => {
    const user = userEvent.setup()
    render(<BasicDialog defaultOpen />)
    await screen.findByRole("dialog")
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes via a DialogClose child", async () => {
    const user = userEvent.setup()
    render(<BasicDialog defaultOpen />)
    await screen.findByRole("dialog")
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("renders the built-in close button by default", async () => {
    render(<BasicDialog defaultOpen />)
    await screen.findByRole("dialog")
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("hides the built-in close button when hideClose is set", async () => {
    render(<BasicDialog defaultOpen hideClose />)
    await screen.findByRole("dialog")
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument()
  })
})

describe("Dialog subcomponents", () => {
  it("DialogTitle merges className and forwards ref", async () => {
    const ref = { current: null as HTMLHeadingElement | null }
    render(
      <Dialog defaultOpen>
        <DialogContent hideClose>
          <DialogTitle ref={ref} className="title-x">
            T
          </DialogTitle>
          <DialogDescription>D</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    await screen.findByRole("dialog")
    expect(screen.getByText("T")).toHaveClass("title-x", "font-semibold")
    expect(ref.current).not.toBeNull()
  })

  it("DialogHeader and DialogFooter render as divs with their classes", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent hideClose>
          <DialogTitle>T</DialogTitle>
          <DialogDescription>D</DialogDescription>
          <DialogHeader data-testid="hdr">H</DialogHeader>
          <DialogFooter data-testid="ftr">F</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    await screen.findByRole("dialog")
    expect(screen.getByTestId("hdr")).toHaveClass("flex", "flex-col")
    expect(screen.getByTestId("ftr")).toHaveClass("justify-end", "border-t")
  })

  it("DialogContent merges custom className", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className="content-x" hideClose>
          <DialogTitle>T</DialogTitle>
          <DialogDescription>D</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toHaveClass("content-x", "fixed")
  })
})
