import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Prompt } from "@qpub/qui";

const meta = {
  title: "Components/Prompt",
  component: Prompt,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Prompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefix: "$",
    placeholder: "Type a command…",
  },
  render: function DefaultStory(args) {
    const [last, setLast] = useState<string>("");
    return (
      <div className="max-w-xl border border-border rounded-md overflow-hidden">
        <div className="p-3 text-sm text-muted min-h-16 font-mono">
          {last ? `Submitted: ${last}` : "Submit to see the value"}
        </div>
        <Prompt {...args} onSubmit={(v) => setLast(v)} />
      </div>
    );
  },
};

export const CustomPrefix: Story = {
  name: "Custom prefix",
  render: () => (
    <div className="max-w-xl border border-border rounded-md overflow-hidden">
      <Prompt prefix={<span className="text-info">➜</span>} placeholder="workspace command" />
    </div>
  ),
};

export const Multiline: Story = {
  render: () => (
    <div className="max-w-xl border border-border rounded-md overflow-hidden">
      <Prompt
        multiline
        prefix=">"
        placeholder="Shift+Enter for newline, Enter to submit"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: "deploy --prod",
    prefix: "$",
  },
};
