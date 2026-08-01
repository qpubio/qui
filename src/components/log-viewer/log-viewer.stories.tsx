import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import { LogLine, LogViewer, type LogLineData } from "@qpub/qui";

const sample: LogLineData[] = [
  { id: "1", timestamp: "10:00:01", level: "debug", message: "bootstrap" },
  { id: "2", timestamp: "10:00:02", level: "info", message: "listening on :3000" },
  { id: "3", timestamp: "10:00:03", level: "success", message: "health check ok" },
  { id: "4", timestamp: "10:00:04", level: "warning", message: "cache miss key=user:42" },
  { id: "5", timestamp: "10:00:05", level: "error", message: "failed to dial redis" },
  { id: "6", timestamp: "10:00:06", level: "fatal", message: "process exiting" },
];

const meta = {
  title: "Components/LogViewer",
  component: LogViewer,
  parameters: { layout: "padded" },
} satisfies Meta<typeof LogViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Levels: Story = {
  render: () => (
    <LogViewer className="max-w-2xl border border-border rounded-md h-64" items={sample} />
  ),
};

export const WithoutLevels: Story = {
  name: "Without level labels",
  render: () => (
    <LogViewer
      className="max-w-2xl border border-border rounded-md"
      items={sample}
      showLevel={false}
    />
  ),
};

export const Composition: Story = {
  render: () => (
    <div className="max-w-2xl border border-border rounded-md font-mono text-xs">
      <LogLine timestamp="10:01:00" level="info">
        composed line
      </LogLine>
      <LogLine timestamp="10:01:01" level="error">
        another composed line
      </LogLine>
    </div>
  ),
};

export const Streaming: Story = {
  render: function StreamingStory() {
    const [items, setItems] = useState<LogLineData[]>(sample.slice(0, 2));
    useEffect(() => {
      let i = 2;
      const id = window.setInterval(() => {
        if (i >= sample.length) {
          window.clearInterval(id);
          return;
        }
        const next = sample[i++];
        setItems((prev) => [...prev, next]);
      }, 800);
      return () => window.clearInterval(id);
    }, []);
    return (
      <LogViewer
        className="max-w-2xl border border-border rounded-md h-48"
        items={items}
        autoScroll
        live="polite"
      />
    );
  },
};
