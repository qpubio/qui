import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusBar, StatusBarSegment, StatusBarSpacer } from "@qpub/qui";

const meta = {
  title: "Components/StatusBar",
  component: StatusBar,
  parameters: { layout: "padded" },
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="border border-border rounded-md overflow-hidden max-w-2xl">
      <div className="h-32 bg-background" />
      <StatusBar>
        <StatusBarSegment tone="success">● connected</StatusBarSegment>
        <StatusBarSegment>main</StatusBarSegment>
        <StatusBarSegment>~/qpub</StatusBarSegment>
        <StatusBarSpacer />
        <StatusBarSegment tone="info">UTF-8</StatusBarSegment>
        <StatusBarSegment>Ln 42</StatusBarSegment>
      </StatusBar>
    </div>
  ),
};

export const Top: Story = {
  render: () => (
    <div className="border border-border rounded-md overflow-hidden max-w-2xl">
      <StatusBar position="top">
        <StatusBarSegment tone="warning">staging</StatusBarSegment>
        <StatusBarSpacer />
        <StatusBarSegment tone="error">3 errors</StatusBarSegment>
      </StatusBar>
      <div className="h-24 bg-background p-3 text-sm">Workspace content</div>
    </div>
  ),
};
