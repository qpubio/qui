import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@qpub/qui";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="bordered">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  name: "With form",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Update dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <Input label="Width" defaultValue="100%" size="sm" />
          <Input label="Max width" defaultValue="300px" size="sm" />
          <Input label="Height" defaultValue="25px" size="sm" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Placement: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button size="sm" variant="bordered">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-40">
            <p className="text-sm">Aligned to {side}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>{open ? "Close" : "Open"} controlled</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm">Controlled open state: {String(open)}</p>
        </PopoverContent>
      </Popover>
    );
  },
};
