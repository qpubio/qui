import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { DateRangePicker } from "@qpub/qui";

const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DateRangePicker />,
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [selected, setSelected] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
    return (
      <div className="space-y-3">
        <DateRangePicker selected={selected} onSelect={setSelected} />
        <div className="text-xs text-muted font-mono">
          {selected?.from?.toDateString()} → {selected?.to?.toDateString() ?? "…"}
        </div>
      </div>
    );
  },
};

export const DisableFutureDates: Story = {
  name: "Disable future dates",
  render: () => <DateRangePicker disableFutureDates />,
};

export const SingleDayRange: Story = {
  name: "Single day range",
  render: function SingleDayStory() {
    const day = new Date();
    const [selected, setSelected] = useState<DateRange | undefined>({
      from: day,
      to: day,
    });
    return <DateRangePicker selected={selected} onSelect={setSelected} />;
  },
};
