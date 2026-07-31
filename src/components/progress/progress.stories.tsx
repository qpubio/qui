import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Progress } from "@qpub/qui";

const colors = [
  "default",
  "primary",
  "secondary",
  "info",
  "debug",
  "warning",
  "success",
  "error",
  "fatal",
] as const;

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  argTypes: {
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    color: "primary",
    className: "max-w-md",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="space-y-1">
          <p className="text-xs capitalize text-muted">{color}</p>
          <Progress value={65} color={color} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Progress value={40} size="sm" color="primary" />
      <Progress value={40} size="md" color="primary" />
      <Progress value={40} size="lg" color="primary" />
    </div>
  ),
};

export const Bounds: Story = {
  name: "0% and 100%",
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Progress value={0} color="primary" />
      <Progress value={100} color="success" />
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [value, setValue] = useState(35);
    return (
      <div className="flex max-w-md flex-col gap-3">
        <Progress value={value} color="info" />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-muted">{value}%</p>
      </div>
    );
  },
};
