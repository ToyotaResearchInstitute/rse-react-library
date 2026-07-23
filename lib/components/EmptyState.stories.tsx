import type { Meta, StoryObj } from "@storybook/react";
import { SearchX } from "lucide-react";

import { Button } from "./ui/button";
import { EmptyState } from "./ui/empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoResults: Story = {
  render: () => (
    <div className="flex justify-center p-8">
      <EmptyState
        icon={<SearchX />}
        title="No customers match “acme”"
        description="Try a different search term or clear your filters."
        className="max-w-[420px]"
      >
        <Button variant="outline" size="sm">
          Clear filters
        </Button>
      </EmptyState>
    </div>
  ),
};
