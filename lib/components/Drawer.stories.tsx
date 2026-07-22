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
  <div className="flex flex-col gap-1.5">
    <span className="text-xs font-medium text-[#404040]">{label}</span>
    <div className="rounded-sm border border-[#d4d4d4] px-2.5 py-2 text-[13px]">
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
        <div className="flex flex-1 flex-col gap-2.5 overflow-auto px-4 py-3.5">
          <Field label="Name" value="atlas-drives-q2" />
          <Field label="Owner" value="Ana Silva" />
          <Field label="License" value="CC BY-NC 4.0" />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[#404040]">Notes</span>
            <div className="min-h-12 rounded-sm border border-[#d4d4d4] px-2.5 py-2 text-[13px]">
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
      <DrawerContent side="left" hideClose className="max-w-xs">
        <DrawerHeader className="border-none bg-[#0b0b0d]">
          <DrawerTitle className="text-white">TRI</DrawerTitle>
          <DrawerClose className="text-[#a1a1aa] transition-colors hover:text-white">
            ✕
          </DrawerClose>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 p-2">
          <a className="flex items-center gap-2.5 rounded-sm bg-[#ECF6FF] px-2.5 py-2.5 text-[13px] font-medium text-[#1D73BF]">
            Dashboard
          </a>
          <a className="flex items-center justify-between rounded-sm px-2.5 py-2.5 text-[13px] font-medium text-foreground hover:bg-muted">
            <span>Datasets</span>
            <span className="font-mono text-[11px] text-[#737373]">24</span>
          </a>
          <a className="flex items-center gap-2.5 rounded-sm px-2.5 py-2.5 text-[13px] font-medium text-foreground hover:bg-muted">
            Team
          </a>
          <a className="flex items-center gap-2.5 rounded-sm px-2.5 py-2.5 text-[13px] font-medium text-foreground hover:bg-muted">
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
        <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-[#d4d4d4]" />
        <DrawerHeader className="border-none pb-3 pt-2">
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerClose className="text-muted-foreground hover:text-foreground">
            ✕
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-3 border-t border-[#f0f0f0] px-4 py-3.5">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[#404040]">Status</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#0b0b0d] px-2.5 py-1 text-xs font-medium text-white">
                All
              </span>
              <span className="rounded-full bg-[#eeeeee] px-2.5 py-1 text-xs font-medium text-[#404040]">
                Ready
              </span>
              <span className="rounded-full bg-[#eeeeee] px-2.5 py-1 text-xs font-medium text-[#404040]">
                Draft
              </span>
            </div>
          </div>
          <Field label="Owner" value="Anyone" />
        </div>
        <DrawerFooter className="flex-col-reverse gap-2">
          <DrawerClose asChild>
            <Button variant="ghost" className="h-10 w-full">
              Reset
            </Button>
          </DrawerClose>
          <Button variant="ink" className="h-10 w-full">
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
        className="border-none bg-[#1D73BF] p-3.5 text-white"
      >
        <div className="flex items-start gap-3 pr-6">
          <div className="flex-1">
            <DrawerTitle className="text-white">
              Maintenance window scheduled
            </DrawerTitle>
            <DrawerDescription className="mt-0.5 font-medium text-white">
              API access will pause Tuesday, May 12 from 02:00–03:00 UTC for a
              routine database upgrade.
            </DrawerDescription>
          </div>
          <DrawerClose className="text-white/75 transition-opacity hover:text-white">
            ✕
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
