import type { Meta, StoryObj } from "@storybook/react";

import { Badge, NotificationBadge } from "./ui/Badge/badge";
import { Bell, Mail, MessageSquare, TriangleAlert } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "red",
        "info",
        "success",
        "warning",
        "activity",
      ],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;


// Notification dot in every color
export const NotificationDots: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-6">
      <NotificationBadge dot variant="red">
        <Bell color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge dot variant="info">
        <MessageSquare color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge dot variant="success">
        <Mail color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge dot variant="warning">
        <TriangleAlert color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge dot variant="activity">
        <Avatar>
        <AvatarFallback color="red">AS</AvatarFallback>
      </Avatar>
      </NotificationBadge>
    </div>
  ),
};

// Notification count in every color
export const NotificationCounts: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-6">
      <NotificationBadge count={5} variant="red">
        <Bell color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}}  className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge count={5} variant="info">
        <MessageSquare color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge count={5} variant="success">
        <Mail color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge count={5} variant="warning">
        <TriangleAlert color="black" style={{background:"#f6f6f7",padding:"8px",borderRadius:6}} className="size-[32px] text-muted-foreground" />
      </NotificationBadge>
      <NotificationBadge count={128} variant="activity">
       <Avatar >
        <AvatarFallback color="red">AS</AvatarFallback>
      </Avatar>
      </NotificationBadge>
    </div>
  ),
};
