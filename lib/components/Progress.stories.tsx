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
    <div className="flex w-[280px] flex-col gap-4 p-6">
      <Progress value={72} />
      <Progress value={40} color="brand" />
      <Progress value={90} color="info" />
    </div>
  ),
};

export const LinearIndeterminate: Story = {
  render: () => (
    <div className="w-[280px] p-6">
      <Progress indeterminate />
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <CircularProgress value={60} />
      <CircularProgress value={80} color="brand" />
      <CircularProgress value={35} color="info" />
    </div>
  ),
};

export const ThreeDotBounce: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <DotsLoader />
      <DotsLoader color="brand" size={8} />
      <div className="rounded-md bg-primary p-3">
        <DotsLoader color="white" />
      </div>
    </div>
  ),
};
