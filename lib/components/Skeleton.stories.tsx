import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./ui/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Shapes: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-3">
      <div className="flex items-end gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-[60px] w-[60px] rounded-lg" />
        <Skeleton className="h-6 w-[120px]" />
      </div>
      <Skeleton className="h-2.5 w-full rounded-full" />
      <Skeleton className="h-2.5 w-[88%] rounded-full" />
      <Skeleton className="h-2.5 w-3/5 rounded-full" />
    </div>
  ),
};

export const ContentCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="mb-3.5 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-2.5 w-[55%] rounded-full" />
          <Skeleton className="h-2 w-[30%] rounded-full" />
        </div>
      </div>
      <Skeleton className="mb-2 h-2.5 w-full rounded-full" />
      <Skeleton className="mb-2 h-2.5 w-[88%] rounded-full" />
      <Skeleton className="h-2.5 w-3/5 rounded-full" />
    </div>
  ),
};

export const MediaCard: Story = {
  render: () => (
    <div className="w-[300px] overflow-hidden rounded-lg border">
      <Skeleton className="h-[140px] w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="mb-2.5 h-3.5 w-[70%]" />
        <Skeleton className="mb-1.5 h-2.5 w-full rounded-full" />
        <Skeleton className="mb-1.5 h-2.5 w-[88%] rounded-full" />
        <Skeleton className="h-2.5 w-1/2 rounded-full" />
      </div>
    </div>
  ),
};
