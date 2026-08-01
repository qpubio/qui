import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckIcon } from "lucide-react";

import { Badge } from "@qpub/qui";

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

const variants = ["solid", "bordered", "flat"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: variants },
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "solid",
    color: "primary",
  },
};

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 text-sm">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          <span className="w-20 capitalize text-muted">{variant}</span>
          {colors.map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">sm</Badge>
      <Badge size="md">md</Badge>
      <Badge size="lg">lg</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  name: "With icon",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="success">
        <CheckIcon className="size-3" />
        Ready
      </Badge>
      <Badge color="warning" variant="bordered">
        Pending
      </Badge>
      <Badge color="error" variant="flat">
        Failed
      </Badge>
    </div>
  ),
};

export const AsLink: Story = {
  name: "As link",
  render: () => (
    <Badge asChild color="primary" variant="bordered">
      <a href="#docs">Documentation</a>
    </Badge>
  ),
};
