import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableToolbar,
  TableSortButton,
} from "./table"

const renderTable = (props?: React.ComponentProps<typeof Table>) =>
  render(
    <Table {...props}>
      <TableCaption>Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
          <TableCell>ada@example.com</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>Grace</TableCell>
          <TableCell>grace@example.com</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>2</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )

describe("Table", () => {
  it("renders a semantic table with caption", () => {
    renderTable()
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()
    expect(screen.getByText("Users")).toBeInTheDocument()
  })

  it("renders column headers", () => {
    renderTable()
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Email" })).toBeInTheDocument()
  })

  it("renders body rows and cells", () => {
    renderTable()
    expect(screen.getByRole("cell", { name: "Ada" })).toBeInTheDocument()
    expect(
      screen.getByRole("cell", { name: "grace@example.com" })
    ).toBeInTheDocument()
    // 2 body rows + 1 header row + 1 footer row = 4 rows
    expect(screen.getAllByRole("row")).toHaveLength(4)
  })

  it("marks a selected row via data-state", () => {
    renderTable()
    const graceRow = screen.getByRole("cell", { name: "Grace" }).closest("tr")
    expect(graceRow).toHaveAttribute("data-state", "selected")
  })

  it("applies the bordered wrapper", () => {
    const { container } = renderTable({ bordered: true })
    expect(container.firstChild).toHaveClass("rounded-md", "border")
  })

  it("applies striped data attribute", () => {
    renderTable({ striped: true })
    expect(screen.getByRole("table")).toHaveAttribute("data-striped", "")
  })

  it("applies dense data attribute", () => {
    renderTable({ dense: true })
    expect(screen.getByRole("table")).toHaveAttribute("data-dense", "")
  })

  it("does not set striped/dense attributes by default", () => {
    renderTable()
    const table = screen.getByRole("table")
    expect(table).not.toHaveAttribute("data-striped")
    expect(table).not.toHaveAttribute("data-dense")
  })

  it("renders an empty body without crashing", () => {
    render(
      <Table>
        <TableBody />
      </Table>
    )
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.queryAllByRole("row")).toHaveLength(0)
  })

  it("forwards ref to the underlying table element", () => {
    const ref = createRef<HTMLTableElement>()
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(ref.current).toBeInstanceOf(HTMLTableElement)
  })
})

describe("TableCell", () => {
  const wrap = (cell: React.ReactNode) =>
    render(
      <Table>
        <TableBody>
          <TableRow>{cell}</TableRow>
        </TableBody>
      </Table>
    )

  it("right-aligns when align=right", () => {
    wrap(<TableCell align="right">9</TableCell>)
    expect(screen.getByRole("cell")).toHaveClass("text-right")
  })

  it("applies mono treatment when mono is set", () => {
    wrap(<TableCell mono>ID-1</TableCell>)
    expect(screen.getByRole("cell")).toHaveClass("font-mono")
  })

  it("merges custom className", () => {
    wrap(<TableCell className="custom-cell">c</TableCell>)
    expect(screen.getByRole("cell")).toHaveClass("custom-cell")
  })
})

describe("TableToolbar", () => {
  it("renders children", () => {
    render(<TableToolbar>Toolbar</TableToolbar>)
    expect(screen.getByText("Toolbar")).toBeInTheDocument()
  })

  it("renders the bulk-action (selected) surface", () => {
    render(<TableToolbar selected>Selected</TableToolbar>)
    expect(screen.getByText("Selected").closest("div")).toHaveClass(
      "bg-[#fbe5e8]"
    )
  })

  it("renders the default surface when not selected", () => {
    render(<TableToolbar>Default</TableToolbar>)
    expect(screen.getByText("Default").closest("div")).toHaveClass("bg-background")
  })
})

describe("TableSortButton", () => {
  it("renders its label and fires onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TableSortButton onClick={onClick}>Name</TableSortButton>)

    const btn = screen.getByRole("button", { name: /name/i })
    await user.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("shows the neutral (unsorted) icon by default", () => {
    const { container } = render(<TableSortButton>Name</TableSortButton>)
    // ChevronsUpDown carries the muted neutral color when unsorted.
    expect(container.querySelector(".text-\\[var\\(--neutral-300\\)\\]")).toBeInTheDocument()
  })

  it("renders an up arrow when sorted ascending", () => {
    const { container } = render(
      <TableSortButton direction="asc">Name</TableSortButton>
    )
    expect(container.querySelector("svg")).toBeInTheDocument()
    expect(
      container.querySelector(".text-\\[var\\(--neutral-300\\)\\]")
    ).not.toBeInTheDocument()
  })

  it("renders a down arrow when sorted descending", () => {
    const { container } = render(
      <TableSortButton direction="desc">Name</TableSortButton>
    )
    expect(
      container.querySelector(".text-\\[var\\(--neutral-300\\)\\]")
    ).not.toBeInTheDocument()
  })

  it("can be used inside a column header", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <TableSortButton direction="asc">Name</TableSortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    const header = screen.getByRole("columnheader")
    expect(
      within(header).getByRole("button", { name: /name/i })
    ).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<TableSortButton ref={ref}>Name</TableSortButton>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
