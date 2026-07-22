import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { reducer } from "./use-toast"

// TOAST_LIMIT and TOAST_REMOVE_DELAY are module-private; mirror them here.
const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000

const mk = (id: string, extra = {}) => ({ id, open: true, ...extra })

describe("use-toast reducer", () => {
  it("ADD_TOAST prepends the toast", () => {
    const state = reducer(
      { toasts: [mk("1")] },
      { type: "ADD_TOAST", toast: mk("2") }
    )
    expect(state.toasts.map((t) => t.id)).toEqual(["2", "1"])
  })

  it("ADD_TOAST caps the list at TOAST_LIMIT", () => {
    let state: ReturnType<typeof reducer> = { toasts: [] }
    for (let i = 1; i <= TOAST_LIMIT + 2; i++) {
      state = reducer(state, { type: "ADD_TOAST", toast: mk(String(i)) })
    }
    expect(state.toasts).toHaveLength(TOAST_LIMIT)
    // newest first, oldest dropped
    expect(state.toasts.map((t) => t.id)).toEqual(["5", "4", "3"])
  })

  it("UPDATE_TOAST merges into the matching toast only", () => {
    const state = reducer(
      { toasts: [mk("1", { title: "a" }), mk("2", { title: "b" })] },
      { type: "UPDATE_TOAST", toast: { id: "1", title: "updated" } }
    )
    expect(state.toasts.find((t) => t.id === "1")?.title).toBe("updated")
    expect(state.toasts.find((t) => t.id === "2")?.title).toBe("b")
  })

  it("DISMISS_TOAST sets a single toast open=false", () => {
    const state = reducer(
      { toasts: [mk("1"), mk("2")] },
      { type: "DISMISS_TOAST", toastId: "1" }
    )
    expect(state.toasts.find((t) => t.id === "1")?.open).toBe(false)
    expect(state.toasts.find((t) => t.id === "2")?.open).toBe(true)
  })

  it("DISMISS_TOAST without id closes all toasts", () => {
    const state = reducer(
      { toasts: [mk("1"), mk("2")] },
      { type: "DISMISS_TOAST" }
    )
    expect(state.toasts.every((t) => t.open === false)).toBe(true)
  })

  it("REMOVE_TOAST removes a single toast", () => {
    const state = reducer(
      { toasts: [mk("1"), mk("2")] },
      { type: "REMOVE_TOAST", toastId: "1" }
    )
    expect(state.toasts.map((t) => t.id)).toEqual(["2"])
  })

  it("REMOVE_TOAST without id clears all toasts", () => {
    const state = reducer(
      { toasts: [mk("1"), mk("2")] },
      { type: "REMOVE_TOAST" }
    )
    expect(state.toasts).toHaveLength(0)
  })
})

describe("useToast hook + toast()", () => {
  // The toast store is a module-level singleton (memoryState + the
  // toastTimeouts Map + the id counter), so state and stale timers leak
  // across tests. Reset the module registry and re-import a fresh copy
  // before each test so every test starts from a truly empty store.
  let toast: typeof import("./use-toast").toast
  let useToast: typeof import("./use-toast").useToast

  beforeEach(async () => {
    vi.resetModules()
    vi.useFakeTimers()
    ;({ toast, useToast } = await import("./use-toast"))
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it("adds a toast that the hook exposes", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "Saved" })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]!.title).toBe("Saved")
    expect(result.current.toasts[0]!.open).toBe(true)
  })

  it("returns id / dismiss / update handles from toast()", () => {
    const { result } = renderHook(() => useToast())
    let handle: ReturnType<typeof toast>

    act(() => {
      handle = toast({ title: "one" })
    })

    expect(handle!.id).toBeTruthy()
    expect(typeof handle!.dismiss).toBe("function")
    expect(typeof handle!.update).toBe("function")
  })

  it("update() changes an existing toast", () => {
    const { result } = renderHook(() => useToast())
    let handle: ReturnType<typeof toast>

    act(() => {
      handle = toast({ title: "before" })
    })
    act(() => {
      handle!.update({ id: handle!.id, title: "after" })
    })

    expect(result.current.toasts[0]!.title).toBe("after")
  })

  it("dismiss() marks the toast closed and removes it after the delay", () => {
    const { result } = renderHook(() => useToast())
    let handle: ReturnType<typeof toast>

    act(() => {
      handle = toast({ title: "bye" })
    })
    act(() => {
      handle!.dismiss()
    })

    expect(result.current.toasts[0]!.open).toBe(false)

    act(() => {
      vi.advanceTimersByTime(TOAST_REMOVE_DELAY)
    })
    expect(result.current.toasts).toHaveLength(0)
  })

  it("hook dismiss() with no id closes every toast", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "a" })
      toast({ title: "b" })
    })
    act(() => {
      result.current.dismiss()
    })

    expect(result.current.toasts.every((t) => t.open === false)).toBe(true)
  })

  it("enforces the toast limit", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "1" })
      toast({ title: "2" })
      toast({ title: "3" })
      toast({ title: "4" })
    })

    expect(result.current.toasts).toHaveLength(TOAST_LIMIT)
  })

  it("invokes onOpenChange(false) which dismisses the toast", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "closable" })
    })
    act(() => {
      result.current.toasts[0]!.onOpenChange?.(false)
    })

    expect(result.current.toasts[0]!.open).toBe(false)
  })
})
