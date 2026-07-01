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
} from "./ui/table";

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
