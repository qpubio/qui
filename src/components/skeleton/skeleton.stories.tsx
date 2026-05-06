import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@qpub/qui";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
