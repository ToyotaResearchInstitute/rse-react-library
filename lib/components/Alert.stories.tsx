import type { Meta, StoryObj } from "@storybook/react";
import { Info, CircleCheckBig, AlertTriangle, AlertCircle, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
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
    <Alert variant="info" className="tri-max-w-2xl">
      <Info />
      <AlertDescription>
        <AlertTitle>Maintenance window scheduled</AlertTitle>
        API access will be paused Tuesday, May 12 from 02:00–03:00 UTC for a
        routine database upgrade.
      </AlertDescription>
      <X className="tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-cursor-pointer tri-opacity-75 hover:tri-opacity-100" />
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="tri-max-w-2xl">
      <CircleCheckBig />
      <AlertDescription>
        <AlertTitle>Payment received</AlertTitle>
        Invoice INV-2086 has been marked as paid. Receipt sent to
        ana@tri.global.
      </AlertDescription>
      <X className="tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-cursor-pointer tri-opacity-75 hover:tri-opacity-100" />
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="tri-max-w-2xl">
      <AlertTriangle />
      <AlertDescription>
        <AlertTitle>Storage at 87%</AlertTitle>
        Consider archiving older datasets — uploads will be rate-limited above
        90% capacity.
        <div className="tri-mt-2 tri-flex tri-gap-2">
          <button className="tri-rounded-sm tri-border tri-border-current tri-px-2.5 tri-py-1 tri-text-xs tri-font-semibold tri-uppercase tri-tracking-wide">
            Manage storage
          </button>
        </div>
      </AlertDescription>
      <X className="tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-cursor-pointer tri-opacity-75 hover:tri-opacity-100" />
    </Alert>
  ),
};

export const Error_: Story = {
  render: () => (
    <Alert variant="error" className="tri-max-w-2xl">
      <AlertCircle />
      <AlertDescription>
        <AlertTitle>Two webhooks failed</AlertTitle>
        Endpoint <code className="tri-font-mono tri-text-[13px]">orders.paid</code>{" "}
        returned 503. Last attempt: 12 min ago.
        <div className="tri-mt-2 tri-flex tri-gap-2">
          <button className="tri-rounded-sm tri-border tri-border-current tri-px-2.5 tri-py-1 tri-text-xs tri-font-semibold tri-uppercase tri-tracking-wide">
            Retry now
          </button>
          <button className="tri-rounded-sm tri-border tri-border-current tri-px-2.5 tri-py-1 tri-text-xs tri-font-semibold tri-uppercase tri-tracking-wide">
            View logs
          </button>
        </div>
      </AlertDescription>
      <X className="tri-h-[18px] tri-w-[18px] tri-shrink-0 tri-cursor-pointer tri-opacity-75 hover:tri-opacity-100" />
    </Alert>
  ),
};

export const Default: Story = {
  render: () => (
    <Alert variant="default" className="tri-max-w-2xl">
      <Info />
      <AlertDescription>
        <AlertTitle>Heads up</AlertTitle>
        This is a neutral alert on a plain surface.
      </AlertDescription>
    </Alert>
  ),
};

export const Info_Filled: Story = {
  render: () => (
    <Alert variant="info-filled" className="tri-max-w-2xl">
      <Info />
      <AlertDescription>
        New Version available -- refresh to update.
      </AlertDescription>
    </Alert>
  ),
};

export const Success_Filled: Story = {
  render: () => (
    <Alert variant="success-filled" className="tri-max-w-2xl">
      <CircleCheckBig />
      <AlertDescription>
        Profile updated successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning_Filled: Story = {
  render: () => (
    <Alert variant="warning-filled" className="tri-max-w-2xl">
      <AlertTriangle />
      <AlertDescription>
        Session expires in 5 minutes.
      </AlertDescription>
    </Alert>
  ),
};

export const Error_Filled: Story = {
  render: () => (
    <Alert variant="error-filled" className="tri-max-w-2xl">
      <AlertCircle />
      <AlertDescription>
        Unable to connect -- check your network.
      </AlertDescription>
    </Alert>
  ),
};

export const Info_Outlined: Story = {
  render: () => (
    <Alert variant="info-outline" className="tri-max-w-2xl">
      <Info />
      <AlertDescription>
        2 invitations pending approval.
      </AlertDescription>
    </Alert>
  ),
};

export const Success_Outlined: Story = {
  render: () => (
    <Alert variant="success-outline" className="tri-max-w-2xl">
      <CircleCheckBig />
      <AlertDescription>
        Backup completed at 03:00 UTC.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning_Outlined: Story = {
  render: () => (
    <Alert variant="warning-outline" className="tri-max-w-2xl">
      <AlertTriangle />
      <AlertDescription>
        Your trial expires in 3 days.
      </AlertDescription>
    </Alert>
  ),
};

export const Error_Outlined: Story = {
  render: () => (
    <Alert variant="error-outline" className="tri-max-w-2xl">
      <AlertCircle />
      <AlertDescription>
        3 Fields need attention before you can publish.
      </AlertDescription>
    </Alert>
  ),
};

export const AllSeverities: Story = {
  render: () => (
    <div className="tri-flex tri-max-w-2xl tri-flex-col tri-gap-3.5">
      <Alert variant="info">
        <Info />
        <AlertDescription>
          <AlertTitle>Information</AlertTitle>2 invitations pending approval.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckBig />
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
