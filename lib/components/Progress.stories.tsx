import type { Meta, StoryObj } from "@storybook/react";

import { Progress, CircularProgress } from "./ui/progress";
import { DotsLoader } from "./ui/dots-loader";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const LinearDeterminate: Story = {
  render: () => (
    <div className="tri-flex tri-w-[280px] tri-flex-col tri-gap-4 tri-p-6">
      <Progress value={72} />
      <Progress value={40} color="brand" />
      <Progress value={90} color="info" />
    </div>
  ),
};

export const LinearIndeterminate: Story = {
  render: () => (
    <div className="tri-w-[280px] tri-p-6">
      <Progress indeterminate />
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div className="tri-flex tri-items-center tri-gap-6 tri-p-6">
      <CircularProgress value={60} />
      <CircularProgress value={80} color="brand" />
      <CircularProgress value={35} color="info" />
    </div>
  ),
};

export const ThreeDotBounce: Story = {
  render: () => (
    <div className="tri-flex tri-items-center tri-gap-6 tri-p-6">
      <DotsLoader />
      <DotsLoader color="brand" size={8} />
      <div className="tri-rounded-md tri-bg-primary tri-p-3">
        <DotsLoader color="white" />
      </div>
    </div>
  ),
};
