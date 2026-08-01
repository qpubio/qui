import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react";

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@qpub/qui";

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

const variants = ["solid", "bordered", "flat", "faded"] as const;

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: variants },
    color: { control: "select", options: colors },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-lg">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          You can use alerts for status messages across the app.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: "bordered",
    color: "info",
  },
};

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      {variants.map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted">{variant}</p>
          <div className="grid gap-2">
            {colors.map((color) => (
              <Alert key={color} variant={variant} color={color}>
                <AlertContent>
                  <AlertTitle className="capitalize">{color}</AlertTitle>
                  <AlertDescription>
                    {variant} alert using the {color} palette.
                  </AlertDescription>
                </AlertContent>
              </Alert>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <Alert color="success" variant="faded" className="max-w-lg">
      <AlertIcon>
        <CheckCircle2Icon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Deploy finished</AlertTitle>
        <AlertDescription>
          All 12 checks passed. Production is serving revision abc123.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const StatusExamples: Story = {
  name: "Status examples",
  render: () => (
    <div className="flex max-w-lg flex-col gap-3">
      <Alert color="info" variant="bordered">
        <AlertIcon>
          <InfoIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>Informational status.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert color="warning" variant="bordered">
        <AlertIcon>
          <TriangleAlertIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Something needs attention.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert color="error" variant="bordered">
        <AlertIcon>
          <AlertCircleIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>The request failed.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert color="success" variant="bordered">
        <AlertIcon>
          <CheckCircle2Icon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Everything looks good.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
};
