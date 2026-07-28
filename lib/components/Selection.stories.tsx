import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Switch } from "./ui/switch"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const meta: Meta = {
  title: "Components/Selection",
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj

const Label = ({
  children,
  muted,
}: {
  children: React.ReactNode
  muted?: boolean
}) => (
  <span className={muted ? "tri-text-sm tri-text-neutral-500" : "tri-text-sm tri-text-foreground"}>
    {children}
  </span>
)

export const Switches: Story = {
  render: () => (
    <div className="tri-flex tri-flex-col tri-gap-4">
      <label className="tri-flex tri-items-center tri-gap-3">
        <Switch defaultChecked />
        <Label>Enabled · on</Label>
      </label>
      <label className="tri-flex tri-items-center tri-gap-3">
        <Switch />
        <Label>Enabled · off</Label>
      </label>
      <label className="tri-flex tri-items-center tri-gap-3">
        <Switch defaultChecked disabled />
        <Label muted>Disabled · on</Label>
      </label>
      <label className="tri-flex tri-items-center tri-gap-3">
        <Switch disabled />
        <Label muted>Disabled · off</Label>
      </label>
    </div>
  ),
}

export const Radios: Story = {
  render: () => (
    <RadioGroup defaultValue="apple" className="tri-gap-3">
      <label className="tri-flex tri-items-center tri-gap-3">
        <RadioGroupItem value="apple" id="r-apple" />
        <Label>Apple</Label>
      </label>
      <label className="tri-flex tri-items-center tri-gap-3">
        <RadioGroupItem value="banana" id="r-banana" />
        <Label>Banana</Label>
      </label>
      <label className="tri-flex tri-items-center tri-gap-3">
        <RadioGroupItem value="cherry" id="r-cherry" />
        <Label>Cherry</Label>
      </label>
    </RadioGroup>
  ),
}

export const RadiosDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="selected" className="tri-gap-3">
      <label className="tri-flex tri-items-center tri-gap-3">
        <RadioGroupItem value="selected" id="rd-selected" disabled />
        <Label muted>Disabled · selected</Label>
      </label>
      <label className="tri-flex tri-items-center tri-gap-3">
        <RadioGroupItem value="unselected" id="rd-unselected" disabled />
        <Label muted>Disabled · unselected</Label>
      </label>
    </RadioGroup>
  ),
}
