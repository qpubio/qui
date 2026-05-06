import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code } from "@qpub/qui";

const meta = {
  title: "Components/Code",
  component: Code,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
