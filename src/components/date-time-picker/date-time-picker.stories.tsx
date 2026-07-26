import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DateTimePicker } from "@qpub/qui";

const meta = {
  title: "Components/Date Time Picker",
  component: DateTimePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date());
    return (
      <div className="space-y-3">
        <DateTimePicker value={value} onChange={setValue} />
        <div className="text-xs text-muted font-mono">
          {value ? value.toISOString() : "undefined"}
        </div>
      </div>
    );
  },
};
