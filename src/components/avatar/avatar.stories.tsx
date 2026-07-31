import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback, AvatarImage } from "@qpub/qui";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.png" alt="Broken" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar className="size-6">
        <AvatarFallback className="text-[10px]">XS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarFallback className="text-lg">LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const GroupStack: Story = {
  name: "Group stack",
  render: () => (
    <div className="flex -space-x-2">
      {["AL", "GH", "AT", "BJ"].map((initials) => (
        <Avatar key={initials} className="size-9 border-2 border-background">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
