import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "secondary", "ghost", "outline", "destructive", "link", "ink", "blue"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Recommended: Story = {
  args: { children: "Create", variant: "default" },
};

export const Secondary: Story = {
  args: { children: "Cancel", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "More", variant: "ghost" },
};

export const Hierarchy: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="default">Create</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">More</Button>
    </div>
  ),
};

export const Accents: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Button variant="default">Brand red</Button>
        <Button variant="ink">Black</Button>
        <Button variant="blue">Blue</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Learn more</Button>
        <Button variant="default" disabled>Disabled</Button>
      </div>
    </div>
  ),
};
