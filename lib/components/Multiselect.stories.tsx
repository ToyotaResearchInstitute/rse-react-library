import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Multiselect } from "./multiselect";

const meta: Meta<typeof Multiselect> = {
  title: "Components/Multiselect",
  component: Multiselect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Multiselect>;

const DefaultDemo = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className="w-[300px]">
      <Multiselect
        label="Select options"
        options={["Apple", "Banana", "Cherry", "Date"]}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultDemo />,
};

const PreselectedDemo = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
  ]);

  return (
    <div className="w-[280px]">
      <Multiselect
        label="Select options"
        options={["Apple", "Banana", "Cherry", "Date"]}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
};

export const Preselected: Story = {
  render: () => <PreselectedDemo />,
};
