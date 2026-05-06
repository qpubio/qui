import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@qpub/qui";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
