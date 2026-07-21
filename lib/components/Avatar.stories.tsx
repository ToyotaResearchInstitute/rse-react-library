import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarWrap,
  AvatarPresence,
  AvatarGroup,
} from './ui/avatar';
import { MessageSquare, Settings, User } from 'lucide-react';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://i.pravatar.cc/120?img=14"
        alt="Ana Silva"
      />
      <AvatarFallback>AS</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="bg-[#fbe5e8] text-[#a81b28]">AS</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(['xs', 's', 'm', 'l', 'xl'] as const).map((s) => (
        <Avatar
          key={s}
          size={s}
        >
          <AvatarFallback color="blue">AS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const ColorTokens: Story = {
  render: () => (
    <div className="flex gap-2">
      {(['red', 'blue', 'green', 'amber', 'purple', 'steel', 'dark'] as const).map((c) => (
        <Avatar key={c}>
          <AvatarFallback color={c}>{c[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-3">
      {(['circle', 'rounded', 'square'] as const).map((sh) => (
        <Avatar
          key={sh}
          shape={sh}
        >
          <AvatarFallback color="steel">AS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Presence: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['online', 'away', 'offline'] as const).map((st) => (
        <AvatarWrap key={st}>
          <Avatar size="l">
            <AvatarFallback color="blue">AS</AvatarFallback>
          </Avatar>
          <AvatarPresence status={st} />
        </AvatarWrap>
      ))}
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback color="red">
          <MessageSquare />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback color="blue">
          <Settings />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex gap-4">
      <AvatarGroup>
        <Avatar>
          <AvatarImage
            src="https://i.pravatar.cc/120?img=14"
            alt="Ana Silva"
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://i.pravatar.cc/120?img=15"
            alt="Ricardo Pereira"
          />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://i.pravatar.cc/120?img=16"
            alt="Maria Costa"
          />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback color="amber">MC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback color="steel">+12</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback color="red">AS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback color="green">RP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback color="amber">MC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback color="steel">+4</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
};
