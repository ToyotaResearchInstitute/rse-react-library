import type { Meta, StoryObj } from "@storybook/react";
import FeedbackButton from "./FeedbackButton";

declare global {
  interface Window {
    showCollectorDialog: () => void;
  }
}

const meta: Meta<typeof FeedbackButton> = {
  title: "Components/FeedbackButton",
  component: FeedbackButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FeedbackButton>;

export const Default: Story = {
  render: () => {
    window.showCollectorDialog = () => alert("Feedback Dialog Triggered");
    return <FeedbackButton />;
  },
};
