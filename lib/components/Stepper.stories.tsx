import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stepper } from './ui/stepper';
import { Button } from './ui/button';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[760px]">
      <Stepper
        currentStep={2}
        steps={[
          { label: 'Upload', description: 'Completed' },
          { label: 'Validate', description: 'Completed' },
          { label: 'Configure', description: 'In progress' },
          { label: 'Review' },
          { label: 'Publish' },
        ]}
      />
    </div>
  ),
};

export const LabelsOnly: Story = {
  render: () => (
    <div className="w-full max-w-[640px]">
      <Stepper
        currentStep={1}
        steps={['Account', 'Profile', 'Billing', 'Confirm']}
      />
    </div>
  ),
};

const InteractiveTemplate = () => {
  const steps = ['Upload', 'Validate', 'Configure', 'Review', 'Publish'];
  const [current, setCurrent] = useState(2);

  return (
    <div className="flex w-full max-w-[760px] flex-col gap-6">
      <Stepper currentStep={current} steps={steps} />
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          Back
        </Button>
        <Button
          variant="ink"
          size="sm"
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          disabled={current === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveTemplate,
};

export const Vertical: Story = {
  render: () => (
    <div className="p-6">
      <Stepper
        orientation="vertical"
        currentStep={1}
        steps={[
          { label: "Account", description: "Completed" },
          { label: "Profile", description: "In progress" },
          { label: "Review", description: "Upcoming" },
        ]}
      />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div className="p-6">
      <Stepper variant="dot" currentStep={2} steps={["One", "Two", "Three", "Four"]} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6">
      <Stepper
        currentStep={2}
        steps={[
          { label: "Upload" },
          { label: "Validate", status: "error", description: "Failed" },
          { label: "Publish" },
        ]}
      />
    </div>
  ),
};
