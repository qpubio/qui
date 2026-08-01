import type { Meta, StoryObj } from "@storybook/react-vite";
import { MailIcon, PlusIcon } from "lucide-react";

import { Button } from "@qpub/qui";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select" },
    color: { control: "select" },
    size: { control: "select" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "solid",
    color: "primary",
    children: "Button",
  },
};

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 text-sm">
      {(
        [
          "solid",
          "faded",
          "bordered",
          "light",
          "flat",
          "ghost",
          "link",
        ] as const
      ).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          <span className="text-muted font-medium capitalize w-28">{variant}</span>
          {(
            [
              "default",
              "primary",
              "secondary",
              "info",
              "debug",
              "warning",
              "success",
              "error",
              "fatal",
            ] as const
          ).map((color) => (
            <Button key={color} variant={variant} color={color} size="sm">
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
    color: "primary",
  },
};

export const IconOnly: Story = {
  name: "Icon only",
  render: () => (
    <div className="flex gap-2">
      <Button isIconOnly size="sm" aria-label="Add" color="primary">
        <PlusIcon />
      </Button>
      <Button isIconOnly size="md" aria-label="Add" color="primary">
        <PlusIcon />
      </Button>
      <Button isIconOnly size="lg" aria-label="Add" color="primary">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  name: "With leading icon",
  render: () => (
    <Button color="primary">
      <MailIcon className="size-4" />
      Email
    </Button>
  ),
};

export const AsChildLink: Story = {
  name: "As child link",
  render: () => (
    <Button asChild variant="bordered" color="primary">
      <a href="#docs">Documentation</a>
    </Button>
  ),
};
