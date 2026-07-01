import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/120?img=14" alt="Ana Silva" />
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
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="bg-[#fbe5e8] text-[10px] text-[#a81b28]">
          AS
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-[#fbe5e8] text-xs text-[#a81b28]">
          AS
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-[#fbe5e8] text-sm text-[#a81b28]">
          AS
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarFallback className="bg-[#fbe5e8] text-lg text-[#a81b28]">
          AS
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarFallback className="bg-[#fbe5e8] text-2xl text-[#a81b28]">
          AS
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const ColorTokens: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-[#fbe5e8] text-[#a81b28]">AS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#ECF6FF] text-[#155a96]">RK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#EAF4EA] text-[#256628]">MO</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#FDF0E2] text-[#c45800]">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#efe6f8] text-[#5e3792]">LP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#0b0b0d] text-white">TR</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-14 w-14">
        <AvatarFallback className="bg-[#ECF6FF] text-lg text-[#155a96]">
          RK
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14 rounded-lg">
        <AvatarFallback className="rounded-lg bg-[#ECF6FF] text-lg text-[#155a96]">
          RK
        </AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14 rounded-md">
        <AvatarFallback className="rounded-md bg-[#ECF6FF] text-lg text-[#155a96]">
          RK
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2.5">
      <Avatar className="border-2 border-white">
        <AvatarImage src="https://i.pravatar.cc/80?img=14" alt="" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarFallback className="bg-[#fbe5e8] text-[#a81b28]">AS</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarFallback className="bg-[#f5f5f5] text-[#525252]">+4</AvatarFallback>
      </Avatar>
    </div>
  ),
};
