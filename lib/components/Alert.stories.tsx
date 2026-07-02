import type { Meta, StoryObj } from "@storybook/react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: {
      options: [
        "default",
        "info",
        "success",
        "warning",
        "error",
        "destructive",
      ],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info_: Story = {
  render: () => (
    <Alert variant="info" className="max-w-2xl">
      <Info />
      <AlertDescription>
        <AlertTitle>Maintenance window scheduled</AlertTitle>
        API access will be paused Tuesday, May 12 from 02:00–03:00 UTC for a
        routine database upgrade.
      </AlertDescription>
      <X className="h-[18px] w-[18px] shrink-0 cursor-pointer opacity-75 hover:opacity-100" />
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="max-w-2xl">
      <CheckCircle2 />
      <AlertDescription>
        <AlertTitle>Payment received</AlertTitle>
        Invoice INV-2086 has been marked as paid. Receipt sent to
        ana@tri.global.
      </AlertDescription>
      <X className="h-[18px] w-[18px] shrink-0 cursor-pointer opacity-75 hover:opacity-100" />
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-2xl">
      <AlertTriangle />
      <AlertDescription>
        <AlertTitle>Storage at 87%</AlertTitle>
        Consider archiving older datasets — uploads will be rate-limited above
        90% capacity.
        <div className="mt-2 flex gap-2">
          <button className="rounded-sm border border-current px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
            Manage storage
          </button>
        </div>
      </AlertDescription>
      <X className="h-[18px] w-[18px] shrink-0 cursor-pointer opacity-75 hover:opacity-100" />
    </Alert>
  ),
};

export const Error_: Story = {
  render: () => (
    <Alert variant="error" className="max-w-2xl">
      <AlertCircle />
      <AlertDescription>
        <AlertTitle>Two webhooks failed</AlertTitle>
        Endpoint <code className="font-mono text-[13px]">orders.paid</code>{" "}
        returned 503. Last attempt: 12 min ago.
        <div className="mt-2 flex gap-2">
          <button className="rounded-sm border border-current px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
            Retry now
          </button>
          <button className="rounded-sm border border-current px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
            View logs
          </button>
        </div>
      </AlertDescription>
      <X className="h-[18px] w-[18px] shrink-0 cursor-pointer opacity-75 hover:opacity-100" />
    </Alert>
  ),
};

export const Default: Story = {
  render: () => (
    <Alert variant="default" className="max-w-2xl">
      <Info />
      <AlertDescription>
        <AlertTitle>Heads up</AlertTitle>
        This is a neutral alert on a plain surface.
      </AlertDescription>
    </Alert>
  ),
};

export const AllSeverities: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-3.5">
      <Alert variant="info">
        <Info />
        <AlertDescription>
          <AlertTitle>Information</AlertTitle>2 invitations pending approval.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 />
        <AlertDescription>
          <AlertTitle>Success</AlertTitle>Backup completed at 03:00 UTC.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertDescription>
          <AlertTitle>Warning</AlertTitle>Your trial expires in 3 days.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertCircle />
        <AlertDescription>
          <AlertTitle>Error</AlertTitle>3 fields need attention before you can
          publish.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
