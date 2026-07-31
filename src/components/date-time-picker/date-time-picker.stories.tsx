import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { DateTimePicker } from "@qpub/qui";

const meta = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DateTimePicker />,
};

export const Controlled: Story = {
  render: function ControlledStory() {
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

export const DisablePastDates: Story = {
  name: "Disable past dates",
  render: () => <DateTimePicker disablePastDates />,
};

export const UndefinedValue: Story = {
  name: "Undefined value",
  render: function UndefinedStory() {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <div className="space-y-3">
        <DateTimePicker value={value} onChange={setValue} />
        <p className="text-xs text-muted">No date selected</p>
      </div>
    );
  },
};
