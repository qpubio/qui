import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea, ScrollBar, Separator } from "@qpub/qui";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border border-border">
      <div className="p-3">
        {tags.map((tag) => (
          <div key={tag}>
            <div className="py-2 text-sm">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max gap-3 p-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-24 w-32 items-center justify-center rounded-md bg-accent text-sm"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-56 w-80 rounded-md border border-border">
      <div className="w-[600px] p-3 text-sm leading-relaxed">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="mb-2">
            Row {i + 1}: wide content that overflows horizontally and vertically for dual scrollbars.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
