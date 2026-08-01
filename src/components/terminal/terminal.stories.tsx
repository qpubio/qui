import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  Badge,
  LogViewer,
  Prompt,
  StatusBar,
  StatusBarSegment,
  StatusBarSpacer,
  Terminal,
  TerminalBody,
  TerminalCursor,
  TerminalTitleBar,
  type LogLineData,
} from "@qpub/qui";

const meta = {
  title: "Components/Terminal",
  component: Terminal,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Frame: Story = {
  render: () => (
    <Terminal className="max-w-xl" size="sm">
      <TerminalTitleBar title="zsh — ali@qpub" />
      <TerminalBody>
        <div className="text-muted">Last login: Fri Jul 31 22:00:00</div>
        <div>
          <span className="text-primary">$</span> echo hello
        </div>
        <div>hello</div>
        <div>
          <span className="text-primary">$</span> <TerminalCursor />
        </div>
      </TerminalBody>
    </Terminal>
  ),
};

export const WithoutTrafficLights: Story = {
  name: "Without traffic lights",
  render: () => (
    <Terminal className="max-w-xl" size="sm">
      <TerminalTitleBar title="build.log" showControls={false} actions={<Badge size="sm" color="success">live</Badge>} />
      <TerminalBody>
        <pre className="text-xs text-muted m-0">{`compiling…\ndone in 1.2s`}</pre>
      </TerminalBody>
    </Terminal>
  ),
};

const seed: LogLineData[] = [
  { timestamp: "22:01:02", level: "info", message: "worker started" },
  { timestamp: "22:01:03", level: "debug", message: "loading config" },
  { timestamp: "22:01:04", level: "success", message: "ready on :8080" },
  { timestamp: "22:01:08", level: "warning", message: "retry queue depth=3" },
  { timestamp: "22:01:12", level: "error", message: "upstream timeout" },
];

export const FullConsole: Story = {
  name: "Full console composition",
  render: function FullConsoleStory() {
    const [lines, setLines] = useState(seed);
    return (
      <Terminal className="max-w-2xl" size="lg">
        <TerminalTitleBar title="qpub-server" />
        <TerminalBody className="p-0">
          <LogViewer className="h-64" items={lines} autoScroll />
        </TerminalBody>
        <Prompt
          prefix="$"
          placeholder="run a command…"
          onSubmit={(value) => {
            setLines((prev) => [
              ...prev,
              {
                timestamp: new Date().toLocaleTimeString(),
                level: "default",
                message: value,
              },
            ]);
          }}
        />
        <StatusBar>
          <StatusBarSegment tone="success">● running</StatusBarSegment>
          <StatusBarSegment>pid 4421</StatusBarSegment>
          <StatusBarSpacer />
          <StatusBarSegment>{lines.length} lines</StatusBarSegment>
        </StatusBar>
      </Terminal>
    );
  },
};
