import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { Toggle } from "@qpub/qui";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["solid", "bordered"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Toggle",
    "aria-label": "Toggle",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3">
      <Toggle variant="solid" aria-label="Solid">
        Solid
      </Toggle>
      <Toggle variant="bordered" aria-label="Bordered">
        Bordered
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="sm">
        sm
      </Toggle>
      <Toggle size="md" aria-label="md">
        md
      </Toggle>
      <Toggle size="lg" aria-label="lg">
        lg
      </Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Bold">
      <BoldIcon className="size-4" />
    </Toggle>
  ),
};

export const WithIcon: Story = {
  name: "With icon",
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Bold" defaultPressed>
        <BoldIcon className="size-4" />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon className="size-4" />
      </Toggle>
      <Toggle aria-label="Underline">
        <UnderlineIcon className="size-4" />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    "aria-label": "Disabled",
  },
};
