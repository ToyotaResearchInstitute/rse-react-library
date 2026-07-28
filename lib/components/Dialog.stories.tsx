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
          <div className="tri-flex tri-items-start tri-gap-3.5 tri-pr-6">
            <span className="tri-flex tri-h-10 tri-w-10 tri-shrink-0 tri-items-center tri-justify-center tri-rounded-full tri-bg-[#FFECEC] tri-text-[#c93030]">
              <Trash2 className="tri-h-5 tri-w-5" />
            </span>
            <div className="tri-space-y-1">
              <DialogTitle>Delete this dataset?</DialogTitle>
              <DialogDescription>
                This permanently removes{" "}
                <strong className="tri-text-foreground">atlas-drives-q2</strong> and
                all its 1,284,920 rows.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="tri-px-5 tri-pb-4 tri-text-sm tri-leading-relaxed tri-text-[#404040]">
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
        <div className="tri-space-y-3 tri-px-5 tri-pb-4">
          <div className="tri-space-y-1.5">
            <label className="tri-block tri-text-xs tri-font-medium tri-text-[#404040]">
              Email
            </label>
            <input
              defaultValue="ravi@tri.global"
              className="tri-block tri-w-full tri-rounded-sm tri-border tri-border-[#d4d4d4] tri-px-2.5 tri-py-2 tri-text-[13px] tri-outline-none focus:tri-border-brand"
            />
          </div>
          <div className="tri-space-y-1.5">
            <label className="tri-block tri-text-xs tri-font-medium tri-text-[#404040]">
              Role
            </label>
            <div className="tri-flex tri-items-center tri-justify-between tri-rounded-sm tri-border tri-border-[#d4d4d4] tri-px-2.5 tri-py-2 tri-text-[13px]">
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
      <DialogContent hideClose className="tri-max-w-[380px] tri-text-center">
        <div className="tri-flex tri-flex-col tri-items-center tri-gap-3.5 tri-px-6 tri-pb-2 tri-pt-7">
          <span className="tri-flex tri-h-14 tri-w-14 tri-items-center tri-justify-center tri-rounded-full tri-bg-[#EAF4EA] tri-text-[#256628]">
            <Check className="tri-h-7 tri-w-7" strokeWidth={2.5} />
          </span>
          <div className="tri-space-y-1">
            <DialogTitle className="tri-text-lg">Dataset published</DialogTitle>
            <DialogDescription>
              atlas-drives-q2 is now visible to your workspace. Anyone with the
              link can request access.
            </DialogDescription>
          </div>
        </div>
        <div className="tri-flex tri-justify-center tri-gap-2 tri-px-5 tri-pb-5 tri-pt-2">
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
      <DialogContent hideClose className="tri-max-w-[340px]">
        <DialogHeader className="tri-pb-2">
          <DialogTitle>Save changes before leaving?</DialogTitle>
        </DialogHeader>
        <div className="tri-px-5 tri-pb-4 tri-text-sm tri-leading-relaxed tri-text-[#404040]">
          You have unsaved edits in{" "}
          <strong className="tri-text-foreground">Annotation Settings</strong>.
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
