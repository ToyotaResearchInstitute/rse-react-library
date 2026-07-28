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
  <NotificationAnchor className="tri-h-9 tri-w-9 tri-items-center tri-justify-center tri-rounded-md tri-bg-[#f4f4f5] tri-text-[#0b0b0d]">
    {children}
  </NotificationAnchor>
);

export const Dot: Story = {
  render: () => (
    <Anchor>
      <Bell className="tri-h-5 tri-w-5" />
      <NotificationDot />
    </Anchor>
  ),
};

export const Count: Story = {
  render: () => (
    <Anchor>
      <Bell className="tri-h-5 tri-w-5" />
      <CountBadge count={3} />
    </Anchor>
  ),
};

export const DotColors: Story = {
  render: () => (
    <div className="tri-flex tri-items-center tri-gap-6">
      <Anchor>
        <Bell className="tri-h-5 tri-w-5" />
        <NotificationDot color="brand" />
      </Anchor>
      <Anchor>
        <MessageSquare className="tri-h-5 tri-w-5" />
        <NotificationDot color="info" />
      </Anchor>
      <Anchor>
        <Mail className="tri-h-5 tri-w-5" />
        <NotificationDot color="success" />
      </Anchor>
      <Anchor>
        <AlertTriangle className="tri-h-5 tri-w-5" />
        <NotificationDot color="warning" />
      </Anchor>
      <NotificationAnchor className="tri-h-9 tri-w-9 tri-items-center tri-justify-center tri-rounded-pill tri-bg-[#fbe5e8] tri-text-[13px] tri-font-semibold tri-text-[#a81b28]">
        AS
        <NotificationDot color="ink" />
      </NotificationAnchor>
    </div>
  ),
};

export const CountVariants: Story = {
  render: () => (
    <div className="tri-flex tri-items-center tri-gap-6">
      <Anchor>
        <Bell className="tri-h-5 tri-w-5" />
        <CountBadge count={3} color="brand" />
      </Anchor>
      <Anchor>
        <MessageSquare className="tri-h-5 tri-w-5" />
        <CountBadge count={12} color="info" />
      </Anchor>
      <Anchor>
        <ShoppingBag className="tri-h-5 tri-w-5" />
        <CountBadge count={2} color="ink" />
      </Anchor>
      <Anchor>
        <AlertTriangle className="tri-h-5 tri-w-5" />
        <CountBadge count={150} color="warning" />
      </Anchor>
      <NotificationAnchor className="tri-h-9 tri-w-9 tri-items-center tri-justify-center tri-rounded-pill tri-bg-[#fbe5e8] tri-text-[13px] tri-font-semibold tri-text-[#a81b28]">
        AS
        <CountBadge count={5} color="brand" />
      </NotificationAnchor>
    </div>
  ),
};
