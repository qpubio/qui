import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyButton } from "@qpub/qui";

const meta = {
  title: "Components/Copy Button",
  component: CopyButton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof CopyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
