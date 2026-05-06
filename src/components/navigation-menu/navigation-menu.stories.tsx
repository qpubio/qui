import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationMenu } from "@qpub/qui";

const meta = {
  title: "UI/Navigation Menu",
  component: NavigationMenu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
