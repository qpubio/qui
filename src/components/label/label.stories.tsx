import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input, Label } from "@qpub/qui";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email address",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
};

export const WithInput: Story = {
  name: "With input",
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@qpub.io" />
    </div>
  ),
};

export const DisabledPeer: Story = {
  name: "Disabled peer",
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="disabled-field">Disabled field</Label>
      <Input id="disabled-field" isDisabled defaultValue="read-only value" />
    </div>
  ),
};
