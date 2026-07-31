import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox, Label } from "@qpub/qui";

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

const variants = ["default", "flat", "light"] as const;

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: variants },
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: true,
    color: "primary",
    "aria-label": "Accept terms",
  },
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked color="primary" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 text-sm">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <span className="w-16 capitalize text-muted">{variant}</span>
          {colors.map((color) => (
            <Checkbox
              key={color}
              variant={variant}
              color={color}
              defaultChecked
              aria-label={`${variant} ${color}`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" defaultChecked aria-label="sm" />
      <Checkbox size="md" defaultChecked aria-label="md" />
      <Checkbox size="lg" defaultChecked aria-label="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="unchecked" aria-label="Unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checked" defaultChecked aria-label="Checked" />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled" disabled defaultChecked aria-label="Disabled" />
        <Label htmlFor="disabled">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="invalid" aria-invalid defaultChecked color="error" aria-label="Invalid" />
        <Label htmlFor="invalid">Invalid</Label>
      </div>
    </div>
  ),
};
