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
