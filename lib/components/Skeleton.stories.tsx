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
    <div className="tri-flex tri-w-[320px] tri-flex-col tri-gap-3">
      <div className="tri-flex tri-items-end tri-gap-4">
        <Skeleton className="tri-h-10 tri-w-10 tri-rounded-full" />
        <Skeleton className="tri-h-[60px] tri-w-[60px] tri-rounded-lg" />
        <Skeleton className="tri-h-6 tri-w-[120px]" />
      </div>
      <Skeleton className="tri-h-2.5 tri-w-full tri-rounded-full" />
      <Skeleton className="tri-h-2.5 tri-w-[88%] tri-rounded-full" />
      <Skeleton className="tri-h-2.5 tri-w-3/5 tri-rounded-full" />
    </div>
  ),
};

export const ContentCard: Story = {
  render: () => (
    <div className="tri-w-[300px] tri-rounded-lg tri-border tri-p-4">
      <div className="tri-mb-3.5 tri-flex tri-items-center tri-gap-3">
        <Skeleton className="tri-h-10 tri-w-10 tri-rounded-full" />
        <div className="tri-flex tri-flex-1 tri-flex-col tri-gap-1.5">
          <Skeleton className="tri-h-2.5 tri-w-[55%] tri-rounded-full" />
          <Skeleton className="tri-h-2 tri-w-[30%] tri-rounded-full" />
        </div>
      </div>
      <Skeleton className="tri-mb-2 tri-h-2.5 tri-w-full tri-rounded-full" />
      <Skeleton className="tri-mb-2 tri-h-2.5 tri-w-[88%] tri-rounded-full" />
      <Skeleton className="tri-h-2.5 tri-w-3/5 tri-rounded-full" />
    </div>
  ),
};

export const MediaCard: Story = {
  render: () => (
    <div className="tri-w-[300px] tri-overflow-hidden tri-rounded-lg tri-border">
      <Skeleton className="tri-h-[140px] tri-w-full tri-rounded-none" />
      <div className="tri-p-4">
        <Skeleton className="tri-mb-2.5 tri-h-3.5 tri-w-[70%]" />
        <Skeleton className="tri-mb-1.5 tri-h-2.5 tri-w-full tri-rounded-full" />
        <Skeleton className="tri-mb-1.5 tri-h-2.5 tri-w-[88%] tri-rounded-full" />
        <Skeleton className="tri-h-2.5 tri-w-1/2 tri-rounded-full" />
      </div>
    </div>
  ),
};
