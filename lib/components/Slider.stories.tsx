import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./ui/slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Single: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[42]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[24, 66]} max={100} step={1} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[42]} max={100} step={1} disabled />
    </div>
  ),
};

export const Steps: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[60]} max={100} step={10} />
    </div>
  ),
};
