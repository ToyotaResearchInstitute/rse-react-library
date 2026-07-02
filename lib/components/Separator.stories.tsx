import type { Meta, StoryObj } from "@storybook/react";
import { Separator, LabeledSeparator } from "./ui/separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-[13px] text-muted-foreground">Content above.</p>
      <Separator className="my-4" />
      <p className="text-[13px] text-muted-foreground">Content below.</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-4 text-sm text-foreground">
      <span>1,284 customers</span>
      <Separator orientation="vertical" />
      <span className="text-muted-foreground">Updated 2 min ago</span>
      <Separator orientation="vertical" />
      <span className="text-link underline underline-offset-2">Refresh</span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-card p-5">
      <div className="text-sm font-semibold">Default · 1px #e5e5e5</div>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Hairline rule for separating sibling rows.
      </p>
      <Separator className="my-3.5" />
      <p className="text-[13px] text-muted-foreground">
        Content below the divider.
      </p>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-4 p-6">
      <Separator />
      <Separator variant="strong" />
      <Separator variant="dashed" />
      <Separator variant="gradient" />
      <LabeledSeparator>or continue with</LabeledSeparator>
    </div>
  ),
};
