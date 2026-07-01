import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const meta: Meta = {
  title: "Components/Toast",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

function Demo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="ink"
        onClick={() =>
          toast({
            title: "Changes saved",
            description: "Your edits to atlas-drives-q2 were saved.",
          })
        }
      >
        Default
      </Button>
      <Button
        onClick={() =>
          toast({
            variant: "success",
            title: "Dataset published",
            description: "atlas-drives-q2 is live.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="blue"
        onClick={() =>
          toast({
            variant: "info",
            title: "New version available",
            description: "Refresh to pick up v2.4.1.",
            action: <ToastAction altText="Refresh">Refresh</ToastAction>,
          })
        }
      >
        Info
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: "error",
            title: "Webhook failed",
            description: "orders.paid returned 503.",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        }
      >
        Error
      </Button>
      <Toaster />
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
