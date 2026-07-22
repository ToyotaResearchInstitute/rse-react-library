import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileText, Download, UserPlus, LayoutDashboard, Settings } from "lucide-react";

import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandEmpty,
} from "./ui/command";

const meta: Meta<typeof CommandDialog> = {
  title: "Components/Command",
  component: CommandDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommandDialog>;

const Palette = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center p-10">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette (⌘K)
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        onValueSelect={() => setOpen(false)}
      >
        <CommandInput />
        <CommandList>
          <CommandGroup heading="Quick actions">
            <CommandItem value="New invoice">
              <FileText />
              New invoice
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem value="Export data">
              <Download />
              Export data
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
            <CommandItem value="Invite teammate">
              <UserPlus />
              Invite teammate
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Navigation">
            <CommandItem value="Go to Dashboard">
              <LayoutDashboard />
              Go to Dashboard
              <CommandShortcut>G D</CommandShortcut>
            </CommandItem>
            <CommandItem value="Open Settings">
              <Settings />
              Open Settings
              <CommandShortcut>G S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandEmpty />
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export const Default: Story = {
  render: () => <Palette />,
};
