import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./ui/date-picker";
import { DateRangePicker, type DateRange } from "./ui/date-range-picker";
import { TimePicker, type TimeValue } from "./ui/time-picker";
import { DateTimePicker, type DateTimeValue } from "./ui/date-time-picker";

const meta: Meta = {
  title: "Components/DateTimePickers",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const SingleDate = () => {
  const [d, setD] = useState<Date | undefined>();
  return <DatePicker value={d} onValueChange={setD} />;
};

export const SingleDatePicker: Story = {
  render: () => (
    <div className="p-6">
      <SingleDate />
    </div>
  ),
};

const Range = () => {
  const [r, setR] = useState<DateRange>({});
  return <DateRangePicker value={r} onValueChange={setR} />;
};

export const RangePicker: Story = {
  render: () => (
    <div className="p-6">
      <Range />
    </div>
  ),
};

const Time = () => {
  const [t, setT] = useState<TimeValue>({ hour: 10, minute: 30, meridiem: "AM" });
  return <TimePicker value={t} onValueChange={setT} />;
};

export const TimeOfDay: Story = {
  render: () => (
    <div className="p-6">
      <Time />
    </div>
  ),
};

const DateTime = () => {
  const [v, setV] = useState<DateTimeValue>({ date: undefined, hour: 9, minute: 0, meridiem: "AM" });
  return <DateTimePicker value={v} onValueChange={setV} />;
};

export const DateAndTime: Story = {
  render: () => (
    <div className="p-6">
      <DateTime />
    </div>
  ),
};
