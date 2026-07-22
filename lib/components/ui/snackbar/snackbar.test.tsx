import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { expect, it, vi } from "vitest"

import { Snackbar, SnackbarViewport } from "./snackbar"

it("renders its children inside a status region", () => {
  // arrange
  render(<Snackbar>Changes saved</Snackbar>)

  // assert
  const status = screen.getByRole("status")
  expect(status).toBeInTheDocument()
  expect(status).toHaveTextContent("Changes saved")
})

it("does not render an action or dismiss button by default", () => {
  render(<Snackbar>Saved</Snackbar>)

  expect(screen.queryByRole("button")).not.toBeInTheDocument()
})

it("renders the action button only when actionLabel is provided", () => {
  render(
    <Snackbar actionLabel="Undo" onAction={() => {}}>
      Item deleted
    </Snackbar>
  )

  expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument()
})

it("calls onAction when the action button is clicked", async () => {
  // arrange
  const user = userEvent.setup()
  const onAction = vi.fn()
  render(
    <Snackbar actionLabel="Undo" onAction={onAction}>
      Item deleted
    </Snackbar>
  )

  // action
  await user.click(screen.getByRole("button", { name: "Undo" }))

  // assert
  expect(onAction).toHaveBeenCalledTimes(1)
})

it("does not throw when the action is clicked without an onAction handler", async () => {
  const user = userEvent.setup()
  render(<Snackbar actionLabel="Undo">Item deleted</Snackbar>)

  await user.click(screen.getByRole("button", { name: "Undo" }))
  // no assertion needed — the test fails if the click throws
  expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument()
})

it("renders the dismiss button only when onClose is provided", () => {
  render(<Snackbar onClose={() => {}}>Saved</Snackbar>)

  expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument()
})

it("calls onClose when the dismiss button is clicked", async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  render(<Snackbar onClose={onClose}>Saved</Snackbar>)

  await user.click(screen.getByRole("button", { name: "Dismiss" }))

  expect(onClose).toHaveBeenCalledTimes(1)
})

it("renders both action and dismiss buttons together", () => {
  render(
    <Snackbar actionLabel="Undo" onAction={() => {}} onClose={() => {}}>
      Item deleted
    </Snackbar>
  )

  expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument()
})

it("merges a custom className onto the root", () => {
  render(<Snackbar className="custom-class">Saved</Snackbar>)

  expect(screen.getByRole("status")).toHaveClass("custom-class")
})

it("forwards a ref to the root element", () => {
  const ref = createRef<HTMLDivElement>()
  render(<Snackbar ref={ref}>Saved</Snackbar>)

  expect(ref.current).toBeInstanceOf(HTMLDivElement)
  expect(ref.current).toHaveAttribute("role", "status")
})

it("passes arbitrary HTML attributes through to the root", () => {
  render(
    <Snackbar data-testid="snack" aria-live="assertive">
      Saved
    </Snackbar>
  )

  const status = screen.getByTestId("snack")
  expect(status).toHaveAttribute("aria-live", "assertive")
})

it("action button is type=button so it never submits a surrounding form", () => {
  render(
    <Snackbar actionLabel="Undo" onAction={() => {}}>
      Saved
    </Snackbar>
  )

  expect(screen.getByRole("button", { name: "Undo" })).toHaveAttribute(
    "type",
    "button"
  )
})

/* ─── SnackbarViewport ──────────────────────────────────────────── */

it("SnackbarViewport renders its children", () => {
  render(
    <SnackbarViewport data-testid="viewport">
      <Snackbar>Anchored</Snackbar>
    </SnackbarViewport>
  )

  expect(screen.getByTestId("viewport")).toContainElement(
    screen.getByRole("status")
  )
})

it("SnackbarViewport merges a custom className", () => {
  render(<SnackbarViewport className="vp-custom" data-testid="viewport" />)

  expect(screen.getByTestId("viewport")).toHaveClass("vp-custom")
})

it("SnackbarViewport forwards a ref", () => {
  const ref = createRef<HTMLDivElement>()
  render(<SnackbarViewport ref={ref} />)

  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
