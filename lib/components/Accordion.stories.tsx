import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[560px]">
      <Accordion type="single" collapsible defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Getting started</AccordionTrigger>
          <AccordionContent>
            Install the SDK and create your first project from the dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>API authentication</AccordionTrigger>
          <AccordionContent>
            Generate a key from <strong>Settings &rarr; API</strong>. Pass it in
            the{' '}
            <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono">
              Authorization: Bearer &hellip;
            </code>{' '}
            header.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Rate limits</AccordionTrigger>
          <AccordionContent>
            Requests are limited per key. See the docs for current quotas.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-[560px]">
      <Accordion type="single" collapsible defaultValue="blue">
        <AccordionItem value="default">
          <AccordionTrigger>Getting started</AccordionTrigger>
          <AccordionContent>
            Generate a key from <b>Settings → API</b>. Pass it in the <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono">Authorization: Bearer &hellip;</code> header.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="red" variant="error">
          <AccordionTrigger>Api authentication</AccordionTrigger>
          <AccordionContent>
            Generate a key from <b>Settings → API</b>. Pass it in the <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono">Authorization: Bearer &hellip;</code> header.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="blue" variant="info">
          <AccordionTrigger>Rate limits</AccordionTrigger>
          <AccordionContent>
            Generate a key from <b>Settings → API</b>. Pass it in the <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono">Authorization: Bearer &hellip;</code> header.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="w-full max-w-[560px]">
      <Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>First section</AccordionTrigger>
          <AccordionContent>Content for the first section.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second section</AccordionTrigger>
          <AccordionContent>Content for the second section.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Third section</AccordionTrigger>
          <AccordionContent>Content for the third section.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
