import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@qpub/qui";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
