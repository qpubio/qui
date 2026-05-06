import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@qpub/qui";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
