import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@qpub/qui";

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
