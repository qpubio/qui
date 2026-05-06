import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@qpub/qui";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
