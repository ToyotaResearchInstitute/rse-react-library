import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar } from "./ui/snackbar";

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Plain: Story = {
  render: () => <Snackbar>Changes saved.</Snackbar>,
};

export const WithAction: Story = {
  render: () => (
    <Snackbar actionLabel="Undo" onAction={() => {}}>
      Dataset moved to archive.
    </Snackbar>
  ),
};

export const WithDismiss: Story = {
  render: () => (
    <Snackbar onClose={() => {}}>Reconnecting to webhook…</Snackbar>
  ),
};

export const BottomAnchored: Story = {
  render: () => (
    <div className="tri-relative tri-flex tri-h-64 tri-items-end tri-justify-center tri-rounded-lg tri-border tri-border-border tri-bg-muted tri-p-4">
      <Snackbar actionLabel="View" onAction={() => {}} className="tri-min-w-[340px]">
        Export ready.
      </Snackbar>
    </div>
  ),
};
