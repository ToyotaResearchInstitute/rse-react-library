import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete, type AutocompleteOption } from "./ui/autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const avatar = (initials: string, bg: string, fg: string) => (
  <span
    className="flex size-6 items-center justify-center rounded-full text-[11px] font-semibold"
    style={{ background: bg, color: fg }}
  >
    {initials}
  </span>
);

const PEOPLE: AutocompleteOption[] = [
  { value: "ana", label: "Ana Silva", description: "ana@tri.global", leading: avatar("AS", "#ECF6FF", "#155a96") },
  { value: "ravi", label: "Ravi Patel", description: "ravi@tri.global", leading: avatar("RP", "#EAF4EA", "#256628") },
  { value: "mei", label: "Mei Chen", description: "mei@tri.global", leading: avatar("MC", "#FDF0E2", "#c45800") },
  { value: "tom", label: "Tom Reed", description: "tom@tri.global", leading: avatar("TR", "#fbe5e8", "#a81b28") },
];

const Demo = () => {
  const [value, setValue] = useState<string[]>(["ana"]);
  return (
    <div className="w-[360px] p-6">
      <Autocomplete
        options={PEOPLE}
        value={value}
        onValueChange={setValue}
        placeholder="Add people…"
      />
    </div>
  );
};

export const People: Story = {
  render: () => <Demo />,
};
