import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@qpub/qui";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
