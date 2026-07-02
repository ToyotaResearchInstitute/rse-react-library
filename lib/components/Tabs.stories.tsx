import type { Meta, StoryObj } from '@storybook/react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsTriggerCount,
  TabsContent,
} from './ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[560px]">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">
            Activity <TabsTriggerCount>12</TabsTriggerCount>
          </TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="audit" disabled>
            Audit log
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          The Overview tab summarizes the workspace at a glance.
        </TabsContent>
        <TabsContent value="activity">
          Recent activity across the workspace.
        </TabsContent>
        <TabsContent value="members">Manage workspace members.</TabsContent>
        <TabsContent value="settings">Workspace settings.</TabsContent>
        <TabsContent value="audit">Audit log entries.</TabsContent>
      </Tabs>
    </div>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[420px]">
      <TabsList variant="pills">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="closed">Closed</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">All items.</TabsContent>
      <TabsContent value="open">Open items.</TabsContent>
      <TabsContent value="closed">Closed items.</TabsContent>
      <TabsContent value="archived">Archived items.</TabsContent>
    </Tabs>
  ),
};

export const Segmented: Story = {
  render: () => (
    <Tabs defaultValue="day" className="w-[420px]">
      <TabsList variant="segmented">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
      <TabsContent value="day">Day view.</TabsContent>
      <TabsContent value="week">Week view.</TabsContent>
      <TabsContent value="month">Month view.</TabsContent>
      <TabsContent value="year">Year view.</TabsContent>
    </Tabs>
  ),
};
