import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "@qpub/qui";

const meta = {
  title: "Components/Date Range Picker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
