import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Bell,
  ChevronRight,
  KeyRound,
  LayoutGrid,
  ListChecks,
  Mail,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "./ui/list";

import { Checkbox } from "./ui/checkbox";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof List>;

const Avatar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <ListItemIcon unstyled>
    <span
      className={`tri-flex tri-size-9 tri-items-center tri-justify-center tri-rounded-full tri-text-[13px] tri-font-semibold ${
        className ?? "tri-bg-[#fbe5e8] tri-text-[#a81b28]"
      }`}
    >
      {children}
    </span>
  </ListItemIcon>
);

export const Contacts: Story = {
  render: () => (
    <List className="tri-w-80">
      <ListItem active>
        <Avatar>AS</Avatar>
        <ListItemText primary="Ana Silva" secondary="Reviewed your changes · 2h" />
        <ChevronRight className="tri-size-[18px] tri-text-muted-foreground" />
      </ListItem>
      <ListItem>
        <Avatar className="tri-bg-brand-sky tri-text-[#155a96]">RK</Avatar>
        <ListItemText primary="Ravi Krishnan" secondary="Mentioned you in Atlas SDK" />
        <span className="tri-font-mono tri-text-[11px] tri-text-muted-foreground">5m</span>
      </ListItem>
      <ListItem>
        <Avatar className="tri-bg-[#EAF4EA] tri-text-[#256628]">MO</Avatar>
        <ListItemText primary="Mei Otani" secondary={'Shared "fleet-events-2024"'} />
        <span className="tri-font-mono tri-text-[11px] tri-text-muted-foreground">1h</span>
      </ListItem>
      <ListItem>
        <Avatar className="tri-bg-[#FDF0E2] tri-text-[#c45800]">JD</Avatar>
        <ListItemText primary="Jamie D." secondary="Requested access" />
        <span className="tri-font-mono tri-text-[11px] tri-text-muted-foreground">3h</span>
      </ListItem>
    </List>
  ),
};

export const SettingsGrouped: Story = {
  render: () => (
    <List className="tri-w-full tri-max-w-96">
      <ListSubheader>General</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <Mail />
        </ListItemIcon>
        <ListItemText primary="Email notifications" secondary="Daily digest at 8:00 AM" />
        <span className="tri-inline-flex tri-h-[18px] tri-w-8 tri-items-center tri-rounded-full tri-bg-primary tri-px-0.5">
          <span className="tri-size-3.5 tri-translate-x-3.5 tri-rounded-full tri-bg-white tri-transition" />
        </span>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Bell />
        </ListItemIcon>
        <ListItemText primary="Push notifications" secondary="Webhook failures and incidents" />
        <span className="tri-inline-flex tri-h-[18px] tri-w-8 tri-items-center tri-rounded-full tri-bg-neutral-300 tri-px-0.5">
          <span className="tri-size-3.5 tri-rounded-full tri-bg-white tri-transition" />
        </span>
      </ListItem>
      <ListSubheader>Security</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <Shield />
        </ListItemIcon>
        <ListItemText primary="Two-factor authentication" secondary="Authenticator app" />
        <span className="tri-rounded-full tri-bg-[#EAF4EA] tri-px-2 tri-py-0.5 tri-font-mono tri-text-[11px] tri-text-[#256628]">
          Enabled
        </span>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <KeyRound />
        </ListItemIcon>
        <ListItemText primary="API keys" secondary="2 active keys" />
        <ChevronRight className="tri-size-[18px] tri-text-muted-foreground" />
      </ListItem>
    </List>
  ),
};

export const SidebarNav: Story = {
  render: () => {
    const items = [
      { icon: <LayoutGrid />, label: "Dashboard", active: true },
      { icon: <ListChecks />, label: "Datasets", count: 24 },
      { icon: <Users />, label: "Team", count: 12 },
      { icon: <LayoutGrid />, label: "Reports" },
      { icon: <Settings />, label: "Settings" },
    ];
    return (
      <div className="tri-flex tri-w-72 tri-flex-col tri-gap-0.5 tri-rounded-md tri-border tri-bg-background tri-p-2">
        {items.map((it) => (
          <button
            key={it.label}
            className={`tri-flex tri-items-center tri-gap-3 tri-rounded-md tri-px-3 tri-py-2 tri-text-sm tri-transition-colors ${
              it.active
                ? "tri-bg-brand-sky tri-font-medium tri-text-info"
                : "tri-text-neutral-700 hover:tri-bg-muted"
            }`}
          >
            <span className="[&_svg]:tri-size-4">{it.icon}</span>
            {it.label}
            {it.count != null && (
              <span
                className={`tri-ml-auto tri-rounded-full tri-px-1.5 tri-py-px tri-font-mono tri-text-[11px] ${
                  it.active ? "tri-bg-white tri-text-info" : "tri-bg-neutral-200 tri-text-neutral-600"
                }`}
              >
                {it.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  },
};

export const Checklist: Story = {
  render: () => {
    const [tasks, setTasks] = React.useState([
      { id: "workspace", label: "Set up workspace", done: true },
      { id: "invite", label: "Invite first teammate", done: true },
      {
        id: "atlas",
        label: "Connect Atlas SDK",
        secondary: "Stream your first dataset",
        done: false,
      },
      {
        id: "benchmark",
        label: "Run benchmark suite",
        secondary: "Recommended for first-time users",
        done: false,
      },
      { id: "publish", label: "Publish your first model", done: false },
    ]);

    const toggle = (id: string) => (checked: boolean | "indeterminate") =>
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: checked === true } : t))
      );

    return (
      <List className="tri-w-full tri-max-w-96">
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox checked={task.done} onCheckedChange={toggle(task.id)} />
            <ListItemText
              primary={
                task.done ? (
                  <span className="tri-text-muted-foreground tri-line-through">
                    {task.label}
                  </span>
                ) : (
                  task.label
                )
              }
              secondary={task.secondary}
            />
          </ListItem>
        ))}
      </List>
    );
  },
};
