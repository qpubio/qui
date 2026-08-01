import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@qpub/qui";

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
  title: "Components/Input",
  component: Input,
  parameters: { layout: "padded" },
  argTypes: {
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Ada Lovelace",
    helperText: "Visible on your profile",
  },
};

export const Invalid: Story = {
  args: {
    label: "Email",
    isInvalid: true,
    errorMessage: "Enter a valid address",
    defaultValue: "not-an-email",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="grid max-w-md gap-3">
      {colors.map((color) => (
        <Input key={color} color={color} label={color} defaultValue={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-md gap-3">
      <Input size="sm" label="Small" placeholder="sm" />
      <Input size="md" label="Medium" placeholder="md" />
      <Input size="lg" label="Large" placeholder="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "API key",
    defaultValue: "sk_live_••••",
    isDisabled: true,
  },
};

export const PasswordType: Story = {
  name: "Password type",
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const WithAdornments: Story = {
  name: "With adornments",
  args: {
    label: "Command",
    placeholder: "deploy",
    startContent: <span className="font-mono text-primary">$</span>,
    endContent: <span className="font-mono text-xs">⏎</span>,
    helperText: "startContent / endContent for CLI-style fields",
  },
};

export const PromptStyle: Story = {
  name: "Prompt-style field",
  render: () => (
    <div className="max-w-md space-y-3">
      <Input
        startContent={<span className="font-mono text-info">~/qpub</span>}
        placeholder="path or query"
        className="font-mono"
      />
      <Input size="sm" startContent={<span className="font-mono">#</span>} placeholder="tag" />
    </div>
  ),
};
