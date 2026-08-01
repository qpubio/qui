import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "@qpub/qui";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <p className="text-sm">Above</p>
      <Separator />
      <p className="text-sm">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};

export const InToolbar: Story = {
  name: "In toolbar",
  render: () => (
    <div className="flex items-center gap-2 rounded-md border border-border p-2">
      <button type="button" className="px-2 text-sm">
        File
      </button>
      <button type="button" className="px-2 text-sm">
        Edit
      </button>
      <Separator orientation="vertical" className="h-4" />
      <button type="button" className="px-2 text-sm">
        View
      </button>
    </div>
  ),
};
