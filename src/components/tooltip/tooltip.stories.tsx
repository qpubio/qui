import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@qpub/qui";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
