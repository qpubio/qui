import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label, RadioGroup, RadioGroupItem } from "@qpub/qui";

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
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="pro" className="gap-3">
      {(["free", "pro", "enterprise"] as const).map((value) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`plan-${value}`} color="primary" />
          <Label htmlFor={`plan-${value}`} className="capitalize">
            {value}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "flat"] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="text-xs uppercase text-muted">{variant}</p>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <RadioGroup key={`${variant}-${color}`} defaultValue="on">
                <RadioGroupItem
                  value="on"
                  variant={variant}
                  color={color}
                  aria-label={`${variant} ${color}`}
                />
              </RadioGroup>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <RadioGroup key={size} defaultValue="a">
          <RadioGroupItem value="a" size={size} color="primary" aria-label={size} />
        </RadioGroup>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="a" className="gap-2">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="enabled-a" />
          <Label htmlFor="enabled-a">Enabled</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="enabled-b" disabled />
          <Label htmlFor="enabled-b">Disabled item</Label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="x" disabled className="gap-2">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="x" id="group-x" />
          <Label htmlFor="group-x">Disabled group</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="day" className="flex flex-row gap-4">
      {(["day", "week", "month"] as const).map((value) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`hz-${value}`} color="secondary" />
          <Label htmlFor={`hz-${value}`} className="capitalize">
            {value}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
