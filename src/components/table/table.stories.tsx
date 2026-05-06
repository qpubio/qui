import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "@qpub/qui";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
