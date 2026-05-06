import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { Button } from "@qpub/qui";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select" },
    color: { control: "select" },
    size: { control: "select" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SolidDefault: Story = {
  args: {
    variant: "solid",
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
          <span className="text-muted font-medium capitalize w-28">
            {variant}
          </span>
          {(["default", "primary", "warning", "error"] as const).map(
            (color) => (
              <Button key={color} variant={variant} color={color} size="sm">
                {color}
              </Button>
            ),
          )}
        </div>
      ))}
    </div>
  ),
};
