import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button, SecretText } from "@qpub/qui";

const meta = {
  title: "Components/SecretText",
  component: SecretText,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SecretText>;

export default meta;
type Story = StoryObj<typeof meta>;

const secret = "sk_live_51HqT2vKexample";

export const Hidden: Story = {
  render: () => (
    <p className="font-mono text-sm">
      <SecretText isVisible={false}>{secret}</SecretText>
    </p>
  ),
};

export const Visible: Story = {
  render: () => (
    <p className="font-mono text-sm">
      <SecretText isVisible>{secret}</SecretText>
    </p>
  ),
};

export const CustomPlaceholder: Story = {
  name: "Custom placeholder",
  render: () => (
    <p className="font-mono text-sm">
      <SecretText isVisible={false} placeholder="****-****-****">
        {secret}
      </SecretText>
    </p>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [visible, setVisible] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <code className="rounded-md border border-border px-2 py-1 text-sm">
          <SecretText isVisible={visible}>{secret}</SecretText>
        </code>
        <Button size="sm" variant="bordered" onClick={() => setVisible((v) => !v)}>
          {visible ? "Hide" : "Reveal"}
        </Button>
      </div>
    );
  },
};
