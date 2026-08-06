import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "@qpub/qui";

const colors = [
  "default",
  "primary",
  "secondary",
  "info",
  "debug",
  "warning",
  "success",
  "error",
  "fatal",
] as const;

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "padded" },
  argTypes: {
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Write a short summary…",
    helperText: "Shown under the title on list views",
  },
};

export const Invalid: Story = {
  args: {
    label: "Bio",
    isInvalid: true,
    errorMessage: "Keep it under 280 characters",
    defaultValue: "a".repeat(300),
  },
};

export const Colors: Story = {
  render: () => (
    <div className="grid max-w-md gap-3">
      {colors.map((color) => (
        <Textarea key={color} color={color} label={color} defaultValue={color} rows={2} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-md gap-3">
      <Textarea size="sm" label="Small" placeholder="sm" />
      <Textarea size="md" label="Medium" placeholder="md" />
      <Textarea size="lg" label="Large" placeholder="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Notes",
    defaultValue: "Read-only draft notes",
    isDisabled: true,
  },
};

export const WithRows: Story = {
  name: "With rows",
  args: {
    label: "SEO metadata",
    rows: 6,
    placeholder: '{ "title": "…" }',
    className: "font-mono text-xs",
    helperText: "Native rows prop controls initial height",
  },
};
