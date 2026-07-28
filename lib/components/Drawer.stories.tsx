import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./ui/drawer";
import { Button } from "./ui/button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="tri-flex tri-flex-col tri-gap-1.5">
    <span className="tri-text-xs tri-font-medium tri-text-[#404040]">{label}</span>
    <div className="tri-rounded-sm tri-border tri-border-[#d4d4d4] tri-px-2.5 tri-py-2 tri-text-[13px]">
      {value}
    </div>
  </div>
);

export const RightDetailPanel: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Open details</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Dataset details</DrawerTitle>
        </DrawerHeader>
        <div className="tri-flex tri-flex-1 tri-flex-col tri-gap-2.5 tri-overflow-auto tri-px-4 tri-py-3.5">
          <Field label="Name" value="atlas-drives-q2" />
          <Field label="Owner" value="Ana Silva" />
          <Field label="License" value="CC BY-NC 4.0" />
          <div className="tri-flex tri-flex-col tri-gap-1.5">
            <span className="tri-text-xs tri-font-medium tri-text-[#404040]">Notes</span>
            <div className="tri-min-h-12 tri-rounded-sm tri-border tri-border-[#d4d4d4] tri-px-2.5 tri-py-2 tri-text-[13px]">
              Q2 driving collection, 24 cities.
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
          <Button variant="ink">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const LeftNavigation: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DrawerTrigger>
      <DrawerContent side="left" hideClose className="tri-max-w-xs">
        <DrawerHeader className="tri-border-none tri-bg-[#0b0b0d]">
          <DrawerTitle className="tri-text-white">TRI</DrawerTitle>
          <DrawerClose className="tri-text-[#a1a1aa] tri-transition-colors hover:tri-text-white">
            ✕
          </DrawerClose>
        </DrawerHeader>
        <nav className="tri-flex tri-flex-col tri-gap-1 tri-p-2">
          <a className="tri-flex tri-items-center tri-gap-2.5 tri-rounded-sm tri-bg-[#ECF6FF] tri-px-2.5 tri-py-2.5 tri-text-[13px] tri-font-medium tri-text-[#1D73BF]">
            Dashboard
          </a>
          <a className="tri-flex tri-items-center tri-justify-between tri-rounded-sm tri-px-2.5 tri-py-2.5 tri-text-[13px] tri-font-medium tri-text-foreground hover:tri-bg-muted">
            <span>Datasets</span>
            <span className="tri-font-mono tri-text-[11px] tri-text-[#737373]">24</span>
          </a>
          <a className="tri-flex tri-items-center tri-gap-2.5 tri-rounded-sm tri-px-2.5 tri-py-2.5 tri-text-[13px] tri-font-medium tri-text-foreground hover:tri-bg-muted">
            Team
          </a>
          <a className="tri-flex tri-items-center tri-gap-2.5 tri-rounded-sm tri-px-2.5 tri-py-2.5 tri-text-[13px] tri-font-medium tri-text-foreground hover:tri-bg-muted">
            Reports
          </a>
        </nav>
      </DrawerContent>
    </Drawer>
  ),
};

export const BottomSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Filters</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom" hideClose>
        <div className="tri-mx-auto tri-mt-2 tri-h-1 tri-w-9 tri-rounded-full tri-bg-[#d4d4d4]" />
        <DrawerHeader className="tri-border-none tri-pb-3 tri-pt-2">
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerClose className="tri-text-muted-foreground hover:tri-text-foreground">
            ✕
          </DrawerClose>
        </DrawerHeader>
        <div className="tri-flex tri-flex-col tri-gap-3 tri-border-t tri-border-[#f0f0f0] tri-px-4 tri-py-3.5">
          <div className="tri-flex tri-flex-col tri-gap-1.5">
            <span className="tri-text-xs tri-font-medium tri-text-[#404040]">Status</span>
            <div className="tri-flex tri-flex-wrap tri-gap-1.5">
              <span className="tri-rounded-full tri-bg-[#0b0b0d] tri-px-2.5 tri-py-1 tri-text-xs tri-font-medium tri-text-white">
                All
              </span>
              <span className="tri-rounded-full tri-bg-[#eeeeee] tri-px-2.5 tri-py-1 tri-text-xs tri-font-medium tri-text-[#404040]">
                Ready
              </span>
              <span className="tri-rounded-full tri-bg-[#eeeeee] tri-px-2.5 tri-py-1 tri-text-xs tri-font-medium tri-text-[#404040]">
                Draft
              </span>
            </div>
          </div>
          <Field label="Owner" value="Anyone" />
        </div>
        <DrawerFooter className="tri-flex-col-reverse tri-gap-2">
          <DrawerClose asChild>
            <Button variant="ghost" className="tri-h-10 tri-w-full">
              Reset
            </Button>
          </DrawerClose>
          <Button variant="ink" className="tri-h-10 tri-w-full">
            Apply filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const TopBanner: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="blue">Show banner</Button>
      </DrawerTrigger>
      <DrawerContent
        side="top"
        hideClose
        className="tri-border-none tri-bg-[#1D73BF] tri-p-3.5 tri-text-white"
      >
        <div className="tri-flex tri-items-start tri-gap-3 tri-pr-6">
          <div className="tri-flex-1">
            <DrawerTitle className="tri-text-white">
              Maintenance window scheduled
            </DrawerTitle>
            <DrawerDescription className="tri-mt-0.5 tri-font-medium tri-text-white">
              API access will pause Tuesday, May 12 from 02:00–03:00 UTC for a
              routine database upgrade.
            </DrawerDescription>
          </div>
          <DrawerClose className="tri-text-white/75 tri-transition-opacity hover:tri-text-white">
            ✕
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
