import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@qpub/qui";

const meta = {
  title: "Components/Input",
  component: Input,
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
