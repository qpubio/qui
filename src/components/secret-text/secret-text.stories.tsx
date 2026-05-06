import type { Meta, StoryObj } from "@storybook/react";
import { SecretText } from "@qpub/qui";

const meta = {
  title: "UI/Secret Text",
  component: SecretText,
  parameters: { layout: "centered" },
} satisfies Meta<typeof SecretText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
