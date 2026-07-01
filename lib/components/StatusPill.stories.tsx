import type { Meta, StoryObj } from "@storybook/react";

import { StatusPill } from "./ui/status-pill";

const meta: Meta<typeof StatusPill> = {
  title: "Components/StatusPill",
  component: StatusPill,
};

export default meta;
type Story = StoryObj<typeof StatusPill>;

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-6">
      <StatusPill tone="success">Active</StatusPill>
      <StatusPill tone="warning">Pending</StatusPill>
      <StatusPill tone="error">Failed</StatusPill>
      <StatusPill tone="info">Running</StatusPill>
      <StatusPill tone="neutral">Draft</StatusPill>
    </div>
  ),
};
