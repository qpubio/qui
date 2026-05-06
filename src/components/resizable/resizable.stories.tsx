import type { Meta, StoryObj } from "@storybook/react";
import { ResizablePanelGroup } from "@qpub/qui";

const meta = {
  title: "UI/Resizable",
  component: ResizablePanelGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
