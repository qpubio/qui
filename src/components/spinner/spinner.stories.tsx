import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Spinner } from "@qpub/qui";

const colors = [
  "default",
  "current",
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
  title: "Components/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  argTypes: {
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "primary",
    size: "md",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2 text-xs text-muted">
          <Spinner color={color} />
          {color}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" color="primary" />
      <Spinner size="md" color="primary" />
      <Spinner size="lg" color="primary" />
    </div>
  ),
};

export const InButton: Story = {
  name: "In button",
  render: () => (
    <Button color="primary" isDisabled>
      <Spinner size="sm" color="current" />
      Saving…
    </Button>
  ),
};
