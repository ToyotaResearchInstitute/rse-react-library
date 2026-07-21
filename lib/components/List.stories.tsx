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
      className={`flex size-9 items-center justify-center rounded-full text-[13px] font-semibold ${
        className ?? "bg-[#fbe5e8] text-[#a81b28]"
      }`}
    >
      {children}
    </span>
  </ListItemIcon>
);

export const Contacts: Story = {
  render: () => (
    <List className="w-80">
      <ListItem active>
        <Avatar>AS</Avatar>
        <ListItemText primary="Ana Silva" secondary="Reviewed your changes · 2h" />
        <ChevronRight className="size-[18px] text-muted-foreground" />
      </ListItem>
      <ListItem>
        <Avatar className="bg-brand-sky text-[#155a96]">RK</Avatar>
        <ListItemText primary="Ravi Krishnan" secondary="Mentioned you in Atlas SDK" />
        <span className="font-mono text-[11px] text-muted-foreground">5m</span>
      </ListItem>
      <ListItem>
        <Avatar className="bg-[#EAF4EA] text-[#256628]">MO</Avatar>
        <ListItemText primary="Mei Otani" secondary={'Shared "fleet-events-2024"'} />
        <span className="font-mono text-[11px] text-muted-foreground">1h</span>
      </ListItem>
      <ListItem>
        <Avatar className="bg-[#FDF0E2] text-[#c45800]">JD</Avatar>
        <ListItemText primary="Jamie D." secondary="Requested access" />
        <span className="font-mono text-[11px] text-muted-foreground">3h</span>
      </ListItem>
    </List>
  ),
};

export const SettingsGrouped: Story = {
  render: () => (
    <List className="w-full max-w-96">
      <ListSubheader>General</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <Mail />
        </ListItemIcon>
        <ListItemText primary="Email notifications" secondary="Daily digest at 8:00 AM" />
        <span className="inline-flex h-[18px] w-8 items-center rounded-full bg-primary px-0.5">
          <span className="size-3.5 translate-x-3.5 rounded-full bg-white transition" />
        </span>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Bell />
        </ListItemIcon>
        <ListItemText primary="Push notifications" secondary="Webhook failures and incidents" />
        <span className="inline-flex h-[18px] w-8 items-center rounded-full bg-neutral-300 px-0.5">
          <span className="size-3.5 rounded-full bg-white transition" />
        </span>
      </ListItem>
      <ListSubheader>Security</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <Shield />
        </ListItemIcon>
        <ListItemText primary="Two-factor authentication" secondary="Authenticator app" />
        <span className="rounded-full bg-[#EAF4EA] px-2 py-0.5 font-mono text-[11px] text-[#256628]">
          Enabled
        </span>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <KeyRound />
        </ListItemIcon>
        <ListItemText primary="API keys" secondary="2 active keys" />
        <ChevronRight className="size-[18px] text-muted-foreground" />
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
      <div className="flex w-72 flex-col gap-0.5 rounded-md border bg-background p-2">
        {items.map((it) => (
          <button
            key={it.label}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              it.active
                ? "bg-brand-sky font-medium text-info"
                : "text-neutral-700 hover:bg-muted"
            }`}
          >
            <span className="[&_svg]:size-4">{it.icon}</span>
            {it.label}
            {it.count != null && (
              <span
                className={`ml-auto rounded-full px-1.5 py-px font-mono text-[11px] ${
                  it.active ? "bg-white text-info" : "bg-neutral-200 text-neutral-600"
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
      <List className="w-full max-w-96">
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox checked={task.done} onCheckedChange={toggle(task.id)} />
            <ListItemText
              primary={
                task.done ? (
                  <span className="text-muted-foreground line-through">
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
