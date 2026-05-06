import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "@qpub/qui";

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
