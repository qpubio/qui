import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@qpub/qui";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
