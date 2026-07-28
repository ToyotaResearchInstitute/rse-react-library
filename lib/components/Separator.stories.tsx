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
    <div className="tri-w-80">
      <p className="tri-text-[13px] tri-text-muted-foreground">Content above.</p>
      <Separator className="tri-my-4" />
      <p className="tri-text-[13px] tri-text-muted-foreground">Content below.</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="tri-flex tri-h-5 tri-items-center tri-gap-4 tri-text-sm tri-text-foreground">
      <span>1,284 customers</span>
      <Separator orientation="vertical" />
      <span className="tri-text-muted-foreground">Updated 2 min ago</span>
      <Separator orientation="vertical" />
      <span className="tri-text-link tri-underline tri-underline-offset-2">Refresh</span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="tri-w-80 tri-rounded-lg tri-border tri-border-border tri-bg-card tri-p-5">
      <div className="tri-text-sm tri-font-semibold">Default · 1px #e5e5e5</div>
      <p className="tri-mt-1 tri-text-[13px] tri-text-muted-foreground">
        Hairline rule for separating sibling rows.
      </p>
      <Separator className="tri-my-3.5" />
      <p className="tri-text-[13px] tri-text-muted-foreground">
        Content below the divider.
      </p>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="tri-flex tri-w-[320px] tri-flex-col tri-gap-4 tri-p-6">
      <Separator />
      <Separator variant="strong" />
      <Separator variant="dashed" />
      <Separator variant="gradient" />
      <LabeledSeparator>or continue with</LabeledSeparator>
    </div>
  ),
};
