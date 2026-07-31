import type { Meta, StoryObj } from "@storybook/react-vite";

import { Code, CopyButton } from "@qpub/qui";

const meta = {
  title: "Components/CopyButton",
  component: CopyButton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "pnpm add @qpub/qui",
  },
};

export const OverlayPositions: Story = {
  name: "Overlay positions",
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      {(
        ["top-right", "top-left", "bottom-right", "bottom-left"] as const
      ).map((position) => (
        <div
          key={position}
          className="relative h-24 rounded-md border border-border bg-card p-3 text-xs text-muted"
        >
          {position}
          <CopyButton
            text={`copied from ${position}`}
            variant="overlay"
            position={position}
          />
        </div>
      ))}
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["flat", "light", "ghost", "solid"] as const).map((appearance) => (
        <CopyButton
          key={appearance}
          text={`appearance-${appearance}`}
          appearance={appearance}
          ariaLabel={`Copy ${appearance}`}
        />
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With label",
  render: () => <CopyButton text="export const answer = 42" isIconOnly={false} />,
};

export const WithCodeBlock: Story = {
  name: "With code block",
  render: () => (
    <div className="relative max-w-md rounded-md border border-border bg-card p-4 font-mono text-sm">
      <Code display="block" className="bg-transparent">
        hello world
      </Code>
      <CopyButton text="hello world" variant="overlay" position="top-right" />
    </div>
  ),
};
