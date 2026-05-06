import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "@qpub/qui";

const meta = {
  title: "UI/Scroll Area",
  component: ScrollArea,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
