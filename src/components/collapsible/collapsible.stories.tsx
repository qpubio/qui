import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible } from "@qpub/qui";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
