import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@qpub/qui";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="bordered">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button size="sm" variant="bordered">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Delay: Story = {
  render: () => (
    <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Slow delay (800ms)</Button>
        </TooltipTrigger>
        <TooltipContent>Appears after a longer delay</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const OnIconButton: Story = {
  name: "On icon button",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button isIconOnly size="sm" aria-label="Add" color="primary">
          <PlusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add item</TooltipContent>
    </Tooltip>
  ),
};
