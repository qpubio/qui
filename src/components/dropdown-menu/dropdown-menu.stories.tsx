import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "@qpub/qui";

const meta = {
  title: "UI/Dropdown Menu",
  component: DropdownMenu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
