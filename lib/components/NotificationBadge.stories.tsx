import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell, MessageSquare, Mail, ShoppingBag, AlertTriangle } from "lucide-react";
import {
  NotificationDot,
  CountBadge,
  NotificationAnchor,
} from "./ui/notification-badge";

const meta: Meta<typeof NotificationDot> = {
  title: "Components/NotificationBadge",
  component: NotificationDot,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NotificationDot>;

const Anchor = ({ children }: { children: React.ReactNode }) => (
  <NotificationAnchor className="h-9 w-9 items-center justify-center rounded-md bg-[#f4f4f5] text-[#0b0b0d]">
    {children}
  </NotificationAnchor>
);

export const Dot: Story = {
  render: () => (
    <Anchor>
      <Bell className="h-5 w-5" />
      <NotificationDot />
    </Anchor>
  ),
};

export const Count: Story = {
  render: () => (
    <Anchor>
      <Bell className="h-5 w-5" />
      <CountBadge count={3} />
    </Anchor>
  ),
};

export const DotColors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Anchor>
        <Bell className="h-5 w-5" />
        <NotificationDot color="brand" />
      </Anchor>
      <Anchor>
        <MessageSquare className="h-5 w-5" />
        <NotificationDot color="info" />
      </Anchor>
      <Anchor>
        <Mail className="h-5 w-5" />
        <NotificationDot color="success" />
      </Anchor>
      <Anchor>
        <AlertTriangle className="h-5 w-5" />
        <NotificationDot color="warning" />
      </Anchor>
      <NotificationAnchor className="h-9 w-9 items-center justify-center rounded-pill bg-[#fbe5e8] text-[13px] font-semibold text-[#a81b28]">
        AS
        <NotificationDot color="ink" />
      </NotificationAnchor>
    </div>
  ),
};

export const CountVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Anchor>
        <Bell className="h-5 w-5" />
        <CountBadge count={3} color="brand" />
      </Anchor>
      <Anchor>
        <MessageSquare className="h-5 w-5" />
        <CountBadge count={12} color="info" />
      </Anchor>
      <Anchor>
        <ShoppingBag className="h-5 w-5" />
        <CountBadge count={2} color="ink" />
      </Anchor>
      <Anchor>
        <AlertTriangle className="h-5 w-5" />
        <CountBadge count={150} color="warning" />
      </Anchor>
      <NotificationAnchor className="h-9 w-9 items-center justify-center rounded-pill bg-[#fbe5e8] text-[13px] font-semibold text-[#a81b28]">
        AS
        <CountBadge count={5} color="brand" />
      </NotificationAnchor>
    </div>
  ),
};
