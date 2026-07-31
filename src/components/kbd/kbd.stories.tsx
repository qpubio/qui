import type { Meta, StoryObj } from "@storybook/react-vite";

import { Kbd } from "@qpub/qui";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "⌘K",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd size="sm">esc</Kbd>
      <Kbd size="md">⌘K</Kbd>
      <Kbd size="lg">Ctrl+C</Kbd>
    </div>
  ),
};

export const ShortcutChord: Story = {
  name: "Shortcut chord",
  render: () => (
    <div className="flex items-center gap-1 text-sm text-muted">
      Press <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>P</Kbd> to open the command palette
    </div>
  ),
};
