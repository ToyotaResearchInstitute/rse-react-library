import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./ui/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { options: ["sm", "md", "lg"], control: { type: "inline-radio" } },
    variant: { options: ["ink", "brand", "info"], control: { type: "inline-radio" } },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "md", variant: "ink" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Small · 16</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Medium · 24</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Large · 40</span>
      </div>
    </div>
  ),
};

export const Accents: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Spinner variant="ink" />
      <Spinner variant="brand" />
      <Spinner variant="info" />
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div className="flex h-40 w-80 flex-col items-center justify-center gap-3 rounded-lg border bg-muted/30">
      <Spinner size="lg" />
      <span className="text-[13px] text-muted-foreground">Loading dataset…</span>
    </div>
  ),
};
