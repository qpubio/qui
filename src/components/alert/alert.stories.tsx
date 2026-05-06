import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@qpub/qui";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
