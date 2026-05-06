import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "@qpub/qui";

const meta = {
  title: "UI/Date Range Picker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
