import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Kbd,
  Progress,
} from "@qpub/qui";

/**
 * Gallery for validating the terminal appearance language against existing primitives.
 * Use the Storybook toolbar: Appearance → Terminal, Density → Compact, Theme → dark/light.
 */
const meta = {
  title: "Themes/Terminal Appearance",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const PrimitivesGallery: Story = {
  name: "Primitives gallery",
  render: () => (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold">Terminal appearance</h1>
        <p className="text-sm text-muted mt-1">
          Toggle <Kbd>Appearance</Kbd> → Terminal in the toolbar. Same components, remapped tokens.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm">Solid</Button>
        <Button size="sm" variant="bordered" color="primary">
          Bordered
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Badge color="success">success</Badge>
        <Badge color="warning" variant="bordered">
          warning
        </Badge>
        <Badge color="error">error</Badge>
        <Badge color="debug">debug</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deploy job</CardTitle>
          <CardDescription>Card under terminal tokens (sharp radius, no soft shadow).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            label="Target"
            startContent={<span className="text-primary">$</span>}
            defaultValue="deploy --env=prod"
          />
          <Progress value={66} color="success" size="sm" />
        </CardContent>
      </Card>

      <Alert color="warning" variant="bordered">
        <AlertTitle>Queue depth high</AlertTitle>
        <AlertDescription>
          Semantic status colors map cleanly to ops / log levels.
        </AlertDescription>
      </Alert>

      <p className="text-xs text-muted">
        Shortcut: <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </p>
    </div>
  ),
};
