import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@qpub/qui";

const meta = {
  title: "Primitives/Label",
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Accessible label",
    htmlFor: "field",
  },
};
