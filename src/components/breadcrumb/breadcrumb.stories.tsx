import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "@qpub/qui";

const meta = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
