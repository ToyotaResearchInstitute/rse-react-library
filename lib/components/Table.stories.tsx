import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableSortButton,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { StatusPill } from "./ui/status-pill";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Table>;

const rows = [
  { name: "atlas-drives-q2", owner: "Ana Silva", status: "Ready", rows: "1,284,920", updated: "May 10 · 09:14" },
  { name: "nuscenes-mini", owner: "Ravi K.", status: "Indexing", rows: "88,401", updated: "May 09 · 22:41" },
  { name: "fleet-events-2024", owner: "Mei O.", status: "Review", rows: "2,031,772", updated: "May 09 · 17:08" },
  { name: "synth-edgecases-v3", owner: "Jamie D.", status: "Failed", rows: "—", updated: "May 08 · 11:30" },
  { name: "weather-overlay", owner: "Lin P.", status: "Draft", rows: "12,008", updated: "May 06 · 14:22" },
];

const statusPill: Record<string, string> = {
  Ready: "bg-[#EAF4EA] text-[#256628]",
  Indexing: "bg-[#ECF6FF] text-[#155a96]",
  Review: "bg-[#FDF0E2] text-[#c45800]",
  Failed: "bg-[#FFECEC] text-[#c93030]",
  Draft: "bg-[#eeeeee] text-[#404040]",
};

const Pill = ({ status }: { status: string }) => (
  <span
    className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] ${statusPill[status]}`}
  >
    {status}
  </span>
);

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[760px] overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dataset</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Rows</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={r.name} data-state={i === 0 ? "selected" : undefined}>
              <TableCell className="font-semibold">{r.name}</TableCell>
              <TableCell>{r.owner}</TableCell>
              <TableCell>
                <Pill status={r.status} />
              </TableCell>
              <TableCell className="text-right font-mono">{r.rows}</TableCell>
              <TableCell className="font-mono text-muted-foreground">{r.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithFooterAndCaption: Story = {
  render: () => (
    <div className="w-full max-w-[520px]">
      <Table>
        <TableCaption>Quarterly fleet metrics.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Q1</TableHead>
            <TableHead className="text-right">Q2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Active drives</TableCell>
            <TableCell className="text-right font-mono">2,310</TableCell>
            <TableCell className="text-right font-mono">2,884</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Avg labels / hr</TableCell>
            <TableCell className="text-right font-mono">412</TableCell>
            <TableCell className="text-right font-mono">501</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Storage (TB)</TableCell>
            <TableCell className="text-right font-mono">88.0</TableCell>
            <TableCell className="text-right font-mono">121.4</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right font-mono">2,810.1</TableCell>
            <TableCell className="text-right font-mono">3,506.4</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

const ROWS = [
  { id: "run-01", owner: "Ana Silva", status: "success" as const, size: "2.4 GB" },
  { id: "run-02", owner: "Ravi Patel", status: "warning" as const, size: "812 MB" },
  { id: "run-03", owner: "Mei Chen", status: "error" as const, size: "5.1 GB" },
  { id: "run-04", owner: "Tom Reed", status: "info" as const, size: "1.2 GB" },
];

const DataTableDemo = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const allSelected = selected.length === ROWS.length;
  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="w-[720px] p-6">
      <div className="overflow-hidden rounded-md border border-border">
        <TableToolbar selected={selected.length > 0}>
          <span className="text-sm font-semibold">
            {selected.length > 0 ? `${selected.length} selected` : `Datasets · ${ROWS.length}`}
          </span>
        </TableToolbar>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  checked={allSelected ? true : selected.length ? "indeterminate" : false}
                  onCheckedChange={(c) => setSelected(c ? ROWS.map((r) => r.id) : [])}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead><TableSortButton direction="asc">Dataset</TableSortButton></TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                <TableSortButton>Size</TableSortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.id} data-state={selected.includes(r.id) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(r.id)}
                    onCheckedChange={() => toggle(r.id)}
                    aria-label={`Select ${r.id}`}
                  />
                </TableCell>
                <TableCell mono>{r.id}</TableCell>
                <TableCell>{r.owner}</TableCell>
                <TableCell>
                  <StatusPill tone={r.status}>{r.status}</StatusPill>
                </TableCell>
                <TableCell align="right" mono>{r.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const DataTable: Story = {
  render: () => <DataTableDemo />,
};

export const Striped: Story = {
  render: () => (
    <div className="w-[520px] p-6">
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHead>Dataset</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((r) => (
            <TableRow key={r.id}>
              <TableCell mono>{r.id}</TableCell>
              <TableCell>{r.owner}</TableCell>
              <TableCell align="right" mono>{r.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Dense: Story = {
  render: () => (
    <div className="w-[520px] p-6">
      <Table dense bordered>
        <TableHeader>
          <TableRow>
            <TableHead>Dataset</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((r) => (
            <TableRow key={r.id}>
              <TableCell mono>{r.id}</TableCell>
              <TableCell>{r.owner}</TableCell>
              <TableCell align="right" mono>{r.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
