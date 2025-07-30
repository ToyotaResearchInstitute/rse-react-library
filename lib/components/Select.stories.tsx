import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select, { OptionType } from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

const options: OptionType[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const Template = () => {
  const [value, setValue] = useState('banana');

  return (
    <div className="w-72">
      <Select
        id="fruit-select"
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
};
