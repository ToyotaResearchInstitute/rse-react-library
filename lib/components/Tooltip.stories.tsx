import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Save, Clock, PlusCircle, LayoutGrid } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  AnnotationTooltip,
} from "./ui/tooltip";
import { cn } from "./ui/utils";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={400}>
        <div className="tri-p-16">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const TargetButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ children, className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "tri-inline-flex tri-h-11 tri-w-11 tri-items-center tri-justify-center tri-rounded-md tri-border tri-border-[#E5E5E5] tri-bg-white tri-text-[#0B0B0D] [&>svg]:tri-h-[18px] [&>svg]:tri-w-[18px]",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
TargetButton.displayName = "TargetButton";

export const Dark: Story = {
  render: () => (
    <Tooltip >
      <TooltipTrigger  asChild>
        <TargetButton>
          <Save />
        </TargetButton>
      </TooltipTrigger>
      <TooltipContent variant="dark">Save</TooltipContent>
    </Tooltip>
  ),
};

export const Light: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <TargetButton>
          <Clock />
        </TargetButton>
      </TooltipTrigger>
      <TooltipContent variant="light">Last edited 2 min ago</TooltipContent>
    </Tooltip>
  ),
};

export const Blue: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <TargetButton>
          <PlusCircle />
        </TargetButton>
      </TooltipTrigger>
      <TooltipContent variant="blue">Add a new node</TooltipContent>
    </Tooltip>
  ),
};

export const AnnotationPill: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <TargetButton>
          <LayoutGrid />
        </TargetButton>
      </TooltipTrigger>
      <TooltipContent variant="annotation">Toggle grid</TooltipContent>
    </Tooltip>
  ),
};

export const AllStyles: Story = {
  render: () => (
    <div className="tri-flex tri-flex-wrap tri-items-center tri-gap-9">
      <Tooltip>
        <TooltipTrigger asChild>
          <TargetButton>
            <Save />
          </TargetButton>
        </TooltipTrigger>
        <TooltipContent variant="dark">Save</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <TargetButton>
            <Clock />
          </TargetButton>
        </TooltipTrigger>
        <TooltipContent variant="light">Last edited 2 min ago</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <TargetButton>
            <PlusCircle />
          </TargetButton>
        </TooltipTrigger>
        <TooltipContent variant="blue">Add a new node</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <TargetButton>
            <LayoutGrid />
          </TargetButton>
        </TooltipTrigger>
        <TooltipContent variant="annotation">Toggle grid</TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Placement on each side of the trigger via the Radix `side` prop
 * (`top` | `right` | `bottom` | `left`). Shown with `defaultOpen` so all four
 * are visible at once; `sideOffset` controls the gap from the trigger.
 */
export const Sides: Story = {
  render: () => (
    <div className="tri-grid tri-min-h-[360px] tri-place-items-center tri-gap-24 tri-p-24">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <TargetButton>
            <Save />
          </TargetButton>
        </TooltipTrigger>
        <TooltipContent variant="dark" side="top" avoidCollisions={false}>
          Top
        </TooltipContent>
      </Tooltip>

      <div className="tri-flex tri-items-center tri-gap-24">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <TargetButton>
              <Clock />
            </TargetButton>
          </TooltipTrigger>
          <TooltipContent variant="light" side="left" avoidCollisions={false}>
            Left
          </TooltipContent>
        </Tooltip>

        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <TargetButton>
              <PlusCircle />
            </TargetButton>
          </TooltipTrigger>
          <TooltipContent variant="blue" side="right" avoidCollisions={false}>
            Right
          </TooltipContent>
        </Tooltip>
      </div>

      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <TargetButton>
           <LayoutGrid />
          </TargetButton>
        </TooltipTrigger>
        <TooltipContent variant="annotation" side="bottom" avoidCollisions={false}>
          Bottom
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
