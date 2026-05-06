import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@qpub/qui";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
