import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "@qpub/qui";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
