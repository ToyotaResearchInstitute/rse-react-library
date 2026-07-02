import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./ui/chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["filled", "outlined"],
      control: { type: "select" },
    },
    color: {
      options: ["brand", "ink", "info"],
      control: { type: "select" },
    },
    selected: { control: { type: "boolean" } },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: "Published", variant: "filled", color: "brand" },
};

export const Selected: Story = {
  args: {
    children: "Published",
    variant: "filled",
    color: "brand",
    selected: true,
  },
};

export const Removable: Story = {
  args: {
    children: "Filter: Active",
    variant: "filled",
    color: "brand",
    selected: true,
    onRemove: () => alert("removed"),
  },
};

export const Recommended: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Chip color="brand">All</Chip>
        <Chip color="brand">Active</Chip>
        <Chip color="brand" selected>
          Published
        </Chip>
        <Chip color="brand">Archived</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip variant="outlined" color="brand">
          All
        </Chip>
        <Chip variant="outlined" color="brand">
          Active
        </Chip>
        <Chip variant="outlined" color="brand" selected>
          Published
        </Chip>
        <Chip variant="outlined" color="brand">
          Archived
        </Chip>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["brand", "ink", "info"] as const).map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-2">
          <Chip color={color}>Default</Chip>
          <Chip color={color} selected>
            Filled selected
          </Chip>
          <Chip variant="outlined" color={color}>
            Outlined
          </Chip>
          <Chip variant="outlined" color={color} selected>
            Outlined selected
          </Chip>
        </div>
      ))}
    </div>
  ),
};

export const RemovableSet: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip color="brand" selected onRemove={() => {}}>
        Active
      </Chip>
      <Chip color="info" selected onRemove={() => {}}>
        Beta
      </Chip>
      <Chip onRemove={() => {}}>q2-drives</Chip>
    </div>
  ),
};
