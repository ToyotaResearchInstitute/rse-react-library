import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { FilterBar, FilterChip, FilterCount } from "./ui/filter-bar";
import { Search } from "./ui/search";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const Demo = () => {
  const [filters, setFilters] = useState(["Status: Active", "Region: US"]);
  return (
    <div className="w-[640px] p-6">
      <FilterBar>
        <Search className="min-w-[160px]" pill placeholder="Filter…" wrapperClassName="flex-1" />
        {filters.map((f) => (
          <FilterChip
            key={f}
            onRemove={() => setFilters((prev) => prev.filter((x) => x !== f))}
          >
            {f}
          </FilterChip>
        ))}
        <FilterChip dashed onClick={() => setFilters((p) => [...p, `Tag ${p.length + 1}`])}>
          Add filter
        </FilterChip>
        <FilterCount>238 results</FilterCount>
      </FilterBar>
    </div>
  );
};

export const Default: Story = {
  render: () => <Demo />,
};
