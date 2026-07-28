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
    <div className="tri-flex tri-items-end tri-gap-8">
      <div className="tri-flex tri-flex-col tri-items-center tri-gap-2">
        <Spinner size="sm" />
        <span className="tri-font-mono tri-text-[10px] tri-uppercase tri-tracking-wider tri-text-muted-foreground">Small · 16</span>
      </div>
      <div className="tri-flex tri-flex-col tri-items-center tri-gap-2">
        <Spinner size="md" />
        <span className="tri-font-mono tri-text-[10px] tri-uppercase tri-tracking-wider tri-text-muted-foreground">Medium · 24</span>
      </div>
      <div className="tri-flex tri-flex-col tri-items-center tri-gap-2">
        <Spinner size="lg" />
        <span className="tri-font-mono tri-text-[10px] tri-uppercase tri-tracking-wider tri-text-muted-foreground">Large · 40</span>
      </div>
    </div>
  ),
};

export const Accents: Story = {
  render: () => (
    <div className="tri-flex tri-items-center tri-gap-8">
      <Spinner variant="ink" />
      <Spinner variant="brand" />
      <Spinner variant="info" />
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div className="tri-flex tri-h-40 tri-w-80 tri-flex-col tri-items-center tri-justify-center tri-gap-3 tri-rounded-lg tri-border tri-bg-muted/30">
      <Spinner size="lg" />
      <span className="tri-text-[13px] tri-text-muted-foreground">Loading dataset…</span>
    </div>
  ),
};
