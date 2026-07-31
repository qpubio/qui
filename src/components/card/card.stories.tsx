import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@qpub/qui";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Plan</CardTitle>
        <CardDescription>Shared primitives for shipped apps.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted">
        Includes buttons, forms, overlays, and layout building blocks.
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="bordered">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  name: "With action",
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive alerts.</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted">Email and push are enabled.</CardContent>
    </Card>
  ),
};

export const Composition: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Deployments</CardTitle>
        <CardDescription>Last 3 releases</CardDescription>
        <CardAction>
          <Button size="sm" color="primary">
            New
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>v1.2.0</span>
          <span className="text-success">Live</span>
        </div>
        <div className="flex justify-between">
          <span>v1.1.4</span>
          <span className="text-muted">Rolled back</span>
        </div>
        <div className="flex justify-between">
          <span>v1.1.3</span>
          <span className="text-muted">Archived</span>
        </div>
      </CardContent>
      <CardFooter className="border-t justify-end gap-2">
        <Button size="sm" variant="ghost">
          History
        </Button>
        <Button size="sm" variant="bordered">
          Compare
        </Button>
      </CardFooter>
    </Card>
  ),
};
