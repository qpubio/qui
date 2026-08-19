import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label, Switch } from "@qpub/qui";

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
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  argTypes: {
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: true,
    "aria-label": "Airplane mode",
  },
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" defaultChecked color="primary" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      {colors.map((color) => (
        <Switch key={color} color={color} defaultChecked aria-label={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" defaultChecked aria-label="sm" />
      <Switch size="md" defaultChecked aria-label="md" />
      <Switch size="lg" defaultChecked aria-label="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="off" aria-label="Off" />
        <Label htmlFor="off">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="on" defaultChecked aria-label="On" />
        <Label htmlFor="on">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled" disabled defaultChecked aria-label="Disabled" />
        <Label htmlFor="disabled">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="invalid"
          aria-invalid
          defaultChecked
          color="error"
          aria-label="Invalid"
        />
        <Label htmlFor="invalid">Invalid</Label>
      </div>
    </div>
  ),
};
