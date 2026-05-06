import type { Meta, StoryObj } from "@storybook/react-vite";
import { Command } from "@qpub/qui";

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
