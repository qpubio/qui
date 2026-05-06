import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "@qpub/qui";

const meta = {
  title: "UI/Toaster",
  component: Toaster,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
