import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "@qpub/qui";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
