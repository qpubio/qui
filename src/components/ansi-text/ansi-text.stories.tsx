import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnsiText } from "@qpub/qui";

const meta = {
  title: "Components/AnsiText",
  component: AnsiText,
  parameters: { layout: "padded" },
} satisfies Meta<typeof AnsiText>;

export default meta;
type Story = StoryObj<typeof meta>;

const demo =
  "\x1b[32mPASS\x1b[0m auth.spec.ts\n" +
  "\x1b[31mFAIL\x1b[0m billing.spec.ts\n" +
  "\x1b[1;33mwarning\x1b[0m: deprecated API\n" +
  "\x1b[36minfo\x1b[0m: retrying in 2s\n" +
  "\x1b[2mdimmed context\x1b[0m";

export const Colored: Story = {
  args: {
    children: demo,
  },
  render: (args) => (
    <pre className="max-w-xl rounded-md border border-border bg-card p-4 m-0">
      <AnsiText {...args} />
    </pre>
  ),
};

export const Plain: Story = {
  args: {
    children: demo,
    plain: true,
  },
  render: (args) => (
    <pre className="max-w-xl rounded-md border border-border bg-card p-4 m-0">
      <AnsiText {...args} />
    </pre>
  ),
};

export const Palette: Story = {
  name: "ANSI palette swatches",
  render: () => (
    <div className="grid grid-cols-2 gap-2 font-mono text-sm max-w-md">
      {(
        [
          [30, "black"],
          [31, "red"],
          [32, "green"],
          [33, "yellow"],
          [34, "blue"],
          [35, "magenta"],
          [36, "cyan"],
          [37, "white"],
          [90, "bright-black"],
          [91, "bright-red"],
          [92, "bright-green"],
          [93, "bright-yellow"],
          [94, "bright-blue"],
          [95, "bright-magenta"],
          [96, "bright-cyan"],
          [97, "bright-white"],
        ] as const
      ).map(([code, name]) => (
        <AnsiText key={code}>{`\x1b[${code}m${name}\x1b[0m`}</AnsiText>
      ))}
    </div>
  ),
};
