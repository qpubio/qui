import type { Meta, StoryObj } from "@storybook/react-vite";

import { Code } from "@qpub/qui";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "fatal",
  "info",
  "debug",
] as const;

const meta = {
  title: "Components/Code",
  component: Code,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    children: "npm install @qpub/qui",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <Code key={color} color={color}>
          {color}
        </Code>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Code size="sm">sm</Code>
      <Code size="md">md</Code>
      <Code size="lg">lg</Code>
    </div>
  ),
};

export const BlockWithCopy: Story = {
  name: "Block with copy",
  render: () => (
    <Code display="block" language="bash" showCopy className="max-w-xl">{`pnpm add @qpub/qui
pnpm add -D tailwindcss`}</Code>
  ),
};

export const LineNumbers: Story = {
  name: "Line numbers",
  render: () => (
    <Code display="block" lineNumbers language="ts" showCopy className="max-w-xl">{`export function greet(name: string) {
  return \`hello, \${name}\`
}`}</Code>
  ),
};

export const LanguageHeaderOnly: Story = {
  name: "Language header only",
  render: () => (
    <Code display="block" language="json" className="max-w-xl">{`{ "ok": true }`}</Code>
  ),
};

export const BlockNoCopy: Story = {
  name: "Block without copy",
  render: () => (
    <Code display="block" className="max-w-xl">{`plain block code`}</Code>
  ),
};
