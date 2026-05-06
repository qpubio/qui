import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "@qpub/qui";

const meta = {
  title: "UI/Radio Group",
  component: RadioGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
