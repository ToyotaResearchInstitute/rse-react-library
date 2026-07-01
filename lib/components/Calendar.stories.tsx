import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./ui/calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const ControlledCalendar = (props: React.ComponentProps<typeof Calendar>) => {
  const [date, setDate] = React.useState<Date | undefined>(props.value);
  return (
    <div className="flex flex-col gap-3">
      <Calendar {...props} value={date} onChange={setDate} />
      <span className="font-mono text-xs text-muted-foreground">
        Selected: {date ? date.toDateString() : "none"}
      </span>
    </div>
  );
};

export const Default: Story = {
  render: () => <ControlledCalendar />,
};

export const WithSelectedDate: Story = {
  render: () => <ControlledCalendar value={new Date(2026, 4, 18)} />,
};
