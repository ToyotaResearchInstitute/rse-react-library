import type { Meta, StoryObj } from "@storybook/react";
import { Trash2, Check } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const DestructiveConfirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete dataset</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-start gap-3.5 pr-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFECEC] text-[#c93030]">
              <Trash2 className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <DialogTitle>Delete this dataset?</DialogTitle>
              <DialogDescription>
                This permanently removes{" "}
                <strong className="text-foreground">atlas-drives-q2</strong> and
                all its 1,284,920 rows.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="px-5 pb-4 text-sm leading-relaxed text-[#404040]">
          Anyone with access will lose their references. This action cannot be
          undone.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete dataset</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const FormModal: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Invite team member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            They&apos;ll get an email with a link to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 px-5 pb-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#404040]">
              Email
            </label>
            <input
              defaultValue="ravi@tri.global"
              className="block w-full rounded-sm border border-[#d4d4d4] px-2.5 py-2 text-[13px] outline-none focus:border-brand"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#404040]">
              Role
            </label>
            <div className="flex items-center justify-between rounded-sm border border-[#d4d4d4] px-2.5 py-2 text-[13px]">
              <span>Editor</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="ink">Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SuccessNotice: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Publish dataset</Button>
      </DialogTrigger>
      <DialogContent hideClose className="max-w-[380px] text-center">
        <div className="flex flex-col items-center gap-3.5 px-6 pb-2 pt-7">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4EA] text-[#256628]">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <div className="space-y-1">
            <DialogTitle className="text-lg">Dataset published</DialogTitle>
            <DialogDescription>
              atlas-drives-q2 is now visible to your workspace. Anyone with the
              link can request access.
            </DialogDescription>
          </div>
        </div>
        <div className="flex justify-center gap-2 px-5 pb-5 pt-2">
          <DialogClose asChild>
            <Button variant="secondary">Copy link</Button>
          </DialogClose>
          <Button variant="ink">View dataset</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const CompactPrompt: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Leave page</Button>
      </DialogTrigger>
      <DialogContent hideClose className="max-w-[340px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Save changes before leaving?</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-4 text-sm leading-relaxed text-[#404040]">
          You have unsaved edits in{" "}
          <strong className="text-foreground">Annotation Settings</strong>.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Discard</Button>
          </DialogClose>
          <Button variant="ink">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
