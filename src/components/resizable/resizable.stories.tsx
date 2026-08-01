import type { Meta, StoryObj } from "@storybook/react-vite";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qpub/qui";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-56 max-w-2xl rounded-md border border-border"
    >
      <ResizablePanel defaultSize={40} minSize={20}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Left</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={20}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Right</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-72 max-w-md rounded-md border border-border"
    >
      <ResizablePanel defaultSize={35}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Top</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Bottom</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-72 max-w-3xl rounded-md border border-border"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-4 text-sm">Editor</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-4 text-sm">Terminal</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithMinSize: Story = {
  name: "With min size",
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-48 max-w-2xl rounded-md border border-border"
    >
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="flex h-full items-center justify-center p-4 text-sm">min 30%</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="flex h-full items-center justify-center p-4 text-sm">min 30%</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
