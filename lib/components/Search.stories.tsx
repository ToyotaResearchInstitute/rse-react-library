import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Search } from "./ui/search";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-3 p-6">
      <Search size="sm" placeholder="Small (30px)" />
      <Search size="md" placeholder="Medium (36px)" />
      <Search size="lg" placeholder="Large / hero (48px)" />
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div className="w-[360px] p-6">
      <Search pill placeholder="Toolbar search" />
    </div>
  ),
};

export const WithKbdHint: Story = {
  render: () => (
    <div className="w-[360px] p-6">
      <Search kbdHint="⌘K" placeholder="Search…" />
    </div>
  ),
};

const ClearDemo = () => {
  const [v, setV] = useState("nuscenes");
  return (
    <div className="w-[360px] p-6">
      <Search
        value={v}
        onChange={(e) => setV(e.target.value)}
        onClear={v ? () => setV("") : undefined}
      />
    </div>
  );
};

export const WithClear: Story = {
  render: () => <ClearDemo />,
};
