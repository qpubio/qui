import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup } from "@qpub/qui";

const meta = {
  title: "UI/Toggle Group",
  component: ToggleGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
