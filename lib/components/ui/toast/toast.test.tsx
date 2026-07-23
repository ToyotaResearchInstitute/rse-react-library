import { act, render, renderHook, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastIconVariants,
  toastVariants,
} from "./toast"

/** Render helper: Radix Toast primitives must live inside a ToastProvider. */
function renderToast(ui: React.ReactNode) {
  return render(
    <ToastProvider>
      {ui}
      <ToastViewport />
    </ToastProvider>
  )
}

describe("toastVariants / toastIconVariants", () => {
  it("toastVariants applies the default variant classes", () => {
    expect(toastVariants()).toContain("bg-background")
  })

  it("toastVariants applies the info variant tint", () => {
    expect(toastVariants({ variant: "info" })).toContain("bg-info-bg")
  })

  it("toastIconVariants colors per status", () => {
    expect(toastIconVariants({ variant: "success" })).toContain("bg-success-bg")
    expect(toastIconVariants({ variant: "error" })).toContain("bg-error-bg")
    expect(toastIconVariants({ variant: "info" })).toContain("bg-[#ECF6FF]")
    expect(toastIconVariants({ variant: "default" })).toContain("bg-muted")
  })
})

describe("ToastIcon", () => {
  it("renders nothing for the default variant", () => {
    const { container } = render(<ToastIcon variant="default" />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders nothing when no variant is given", () => {
    const { container } = render(<ToastIcon />)
    expect(container).toBeEmptyDOMElement()
  })

  it.each(["success", "error", "warning", "info"] as const)(
    "renders an aria-hidden icon chip for the %s variant",
    (variant) => {
      const { container } = render(<ToastIcon variant={variant} />)
      const chip = container.querySelector("span")
      expect(chip).not.toBeNull()
      expect(chip).toHaveAttribute("aria-hidden")
      expect(chip?.querySelector("svg")).not.toBeNull()
    }
  )
})

describe("Toast primitives", () => {
  it("renders a toast with title and description", () => {
    renderToast(
      <Toast>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are stored</ToastDescription>
      </Toast>
    )

    expect(screen.getByText("Saved")).toBeInTheDocument()
    expect(screen.getByText("Your changes are stored")).toBeInTheDocument()
  })

  it("renders the toast as a list item inside the viewport", () => {
    renderToast(
      <Toast>
        <ToastTitle>Heads up</ToastTitle>
      </Toast>
    )

    expect(screen.getByRole("listitem")).toHaveTextContent("Heads up")
  })

  it("applies the info variant class to the root", () => {
    renderToast(
      <Toast variant="info" data-testid="toast">
        <ToastTitle>Info</ToastTitle>
      </Toast>
    )

    expect(screen.getByTestId("toast")).toHaveClass("bg-info-bg")
  })

  it("merges a custom className onto the root", () => {
    renderToast(
      <Toast className="my-toast" data-testid="toast">
        <ToastTitle>Hi</ToastTitle>
      </Toast>
    )

    expect(screen.getByTestId("toast")).toHaveClass("my-toast")
  })

  it("forwards a ref to the root", () => {
    const ref = createRef<HTMLLIElement>()
    renderToast(
      <Toast ref={ref}>
        <ToastTitle>Ref</ToastTitle>
      </Toast>
    )

    expect(ref.current).not.toBeNull()
  })

  it("ToastClose fires onOpenChange(false) when clicked", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    renderToast(
      <Toast onOpenChange={onOpenChange}>
        <ToastTitle>Closable</ToastTitle>
        <ToastClose data-testid="close" />
      </Toast>
    )

    await user.click(screen.getByTestId("close"))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("ToastAction renders and fires onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderToast(
      <Toast>
        <ToastTitle>With action</ToastTitle>
        <ToastAction altText="Undo the change" onClick={onClick}>
          Undo
        </ToastAction>
      </Toast>
    )

    await user.click(screen.getByRole("button", { name: "Undo" }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it.each(["default", "danger", "muted"] as const)(
    "ToastAction supports the %s variant",
    (variant) => {
      renderToast(
        <Toast>
          <ToastTitle>t</ToastTitle>
          <ToastAction altText="do it" variant={variant}>
            Act
          </ToastAction>
        </Toast>
      )

      expect(screen.getByRole("button", { name: "Act" })).toBeInTheDocument()
    }
  )

  it("ToastTitle and ToastDescription merge custom classNames", () => {
    renderToast(
      <Toast>
        <ToastTitle className="t-class">Title</ToastTitle>
        <ToastDescription className="d-class">Desc</ToastDescription>
      </Toast>
    )

    expect(screen.getByText("Title")).toHaveClass("t-class")
    expect(screen.getByText("Desc")).toHaveClass("d-class")
  })
})

describe("Toaster (store-driven)", () => {
  // The toast store is a module-level singleton; reset the module and
  // re-import fresh copies before each test so queued toasts don't leak.
  let Toaster: typeof import("./toast").Toaster
  let toast: typeof import("../use-toast").toast
  let useToast: typeof import("../use-toast").useToast

  beforeEach(async () => {
    vi.resetModules()
    vi.useFakeTimers()
    ;({ Toaster } = await import("./toast"))
    ;({ toast, useToast } = await import("../use-toast"))
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it("renders nothing but the viewport when the store is empty", () => {
    render(<Toaster />)
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument()
  })

  it("renders a queued toast pushed via toast()", () => {
    render(<Toaster />)

    act(() => {
      toast({ title: "Uploaded", description: "3 files" })
    })

    expect(screen.getByText("Uploaded")).toBeInTheDocument()
    expect(screen.getByText("3 files")).toBeInTheDocument()
  })

  it("renders a status-variant icon for a queued toast", () => {
    render(<Toaster />)

    act(() => {
      toast({ title: "Done", variant: "success" })
    })

    // the success icon chip renders an svg
    expect(screen.getByText("Done")).toBeInTheDocument()
    expect(document.querySelector("svg")).not.toBeNull()
  })

  it("reflects a dismissal from the store", () => {
    const { result } = renderHook(() => useToast())
    render(<Toaster />)

    act(() => {
      toast({ title: "Bye" })
    })
    expect(screen.getByText("Bye")).toBeInTheDocument()

    act(() => {
      result.current.dismiss()
    })
    // dismiss flips open=false; after the removal delay it leaves the store
    act(() => {
      vi.runAllTimers()
    })

    expect(screen.queryByText("Bye")).not.toBeInTheDocument()
  })
})
