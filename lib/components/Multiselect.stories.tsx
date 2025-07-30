import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Multiselect } from "./multiselect";

const meta: Meta<typeof Multiselect> = {
  title: "Components/Multiselect",
  component: Multiselect,
};

export default meta;

type Story = StoryObj<typeof Multiselect>;

export const Default: Story = {
  render: () => {
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
  },
};
