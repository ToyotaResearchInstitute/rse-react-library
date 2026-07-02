import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Search } from "./ui/search";

/**
 * TRI Input family — single-line Input, Textarea, Label and Search.
 * Pair each field with a Label above and helper or error text below,
 * matching the design-system Inputs preview.
 */
const meta: Meta<typeof Input> = {
  title: "Components/Inputs",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

const Field = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full max-w-80 flex-col gap-1.5">{children}</div>
);

const Help = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs text-muted-foreground">{children}</span>
);

const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs text-error">{children}</span>
);

export const Default: Story = {
  render: () => (
    <Field>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        icon={<Mail aria-hidden="true" />}
        placeholder="you@tri.global"
      />
      <Help>We&apos;ll never share this.</Help>
    </Field>
  ),
};

/** The icon is optional — omit it for a plain full-width text field. */
export const NoIcon: Story = {
  name: "Plain (no icon)",
  render: () => (
    <Field>
      <Label htmlFor="plain">Full name</Label>
      <Input id="plain" placeholder="Jane Doe" />
      <Help>No leading icon — just text.</Help>
    </Field>
  ),
};

export const Focus: Story = {
  render: () => (
    <Field>
      <Label htmlFor="focus">Search</Label>
      <Search id="focus" autoFocus defaultValue="Button" placeholder="Search components..." />
      <Help>Click in — the field shows its focus ring.</Help>
    </Field>
  ),
};

export const Error: Story = {
  render: () => (
    <Field>
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" error defaultValue="wrong" placeholder="••••••••" />
      <ErrorText>Incorrect password.</ErrorText>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <Label htmlFor="project">Project name</Label>
      <Input id="project" disabled defaultValue="Read only" placeholder="Acme" />
    </Field>
  ),
};

export const TextareaExample: Story = {
  name: "Textarea",
  render: () => (
    <div className="flex w-full max-w-[28rem] flex-col gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Tell us what you're thinking..." />
      <Help>Markdown is supported.</Help>
    </div>
  ),
};

export const SearchExample: Story = {
  name: "Search",
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <Field>
        <Label htmlFor="search-default">Search</Label>
        <Search id="search-default" placeholder="Search customers, invoices, docs…" />
      </Field>
      <Field>
        <Label htmlFor="search-value">With value</Label>
        <Search id="search-value" defaultValue="ana" />
      </Field>
    </div>
  ),
};

/** All states side by side, mirroring the Inputs preview grid. */
export const AllStates: Story = {
  render: () => (
    <div className="grid w-full max-w-[40rem] grid-cols-2 gap-4">
      <Field>
        <Label htmlFor="all-email">Email</Label>
        <Input id="all-email" icon={<Mail aria-hidden="true" />} placeholder="you@tri.global" />
        <Help>We&apos;ll never share this.</Help>
      </Field>
      <Field>
        <Label htmlFor="all-search">Search</Label>
        <Search id="all-search" defaultValue="Button" placeholder="Search components..." />
      </Field>
      <Field>
        <Label htmlFor="all-password">Password</Label>
        <Input id="all-password" type="password" error defaultValue="wrong" placeholder="••••••••" />
        <ErrorText>Incorrect password.</ErrorText>
      </Field>
      <Field>
        <Label htmlFor="all-project">Project name</Label>
        <Input id="all-project" disabled defaultValue="Read only" placeholder="Acme" />
      </Field>
    </div>
  ),
};
