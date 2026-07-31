import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";

import { Button, Progress } from "@qpub/qui";

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

export const Task: Story = {
  name: "Task (auto fill)",
  render: function TaskStory() {
    const [value, setValue] = useState(0);
    const [running, setRunning] = useState(false);
    const [direction, setDirection] = useState<1 | -1>(1);
    const directionRef = useRef(direction);
    directionRef.current = direction;

    useEffect(() => {
      if (!running) return;
      const id = window.setInterval(() => {
        setValue((prev) => {
          const next = prev + directionRef.current * 2;
          if (next >= 100) {
            setDirection(-1);
            return 100;
          }
          if (next <= 0) {
            setDirection(1);
            return 0;
          }
          return next;
        });
      }, 80);
      return () => window.clearInterval(id);
    }, [running]);

    return (
      <div className="flex max-w-md flex-col gap-3">
        <Progress
          value={value}
          color={value >= 100 ? "success" : "primary"}
        />
        <p className="text-sm text-muted">
          {value}% · {direction > 0 ? "incrementing" : "decrementing"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            color="primary"
            onClick={() => setRunning((r) => !r)}
          >
            {running ? "Pause" : "Start"}
          </Button>
          <Button
            size="sm"
            variant="bordered"
            onClick={() => {
              setRunning(false);
              setValue(0);
              setDirection(1);
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDirection((d) => (d === 1 ? -1 : 1))}
          >
            Reverse
          </Button>
        </div>
      </div>
    );
  },
};
