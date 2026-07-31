import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppearanceProvider, Badge, Button, useAppearance } from "@qpub/qui";

function AppearanceReadout() {
  const { appearance, density } = useAppearance();
  return (
    <p className="text-sm text-muted font-mono">
      useAppearance → appearance=<Badge size="sm">{appearance}</Badge> density=
      <Badge size="sm">{density}</Badge>
    </p>
  );
}

const meta = {
  title: "Themes/AppearanceProvider",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ScopedTerminal: Story = {
  name: "Scoped terminal panel",
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">Outside (inherits Storybook toolbar appearance):</p>
      <Button size="sm">Default region</Button>
      <AppearanceProvider appearance="terminal" density="compact" target="self" className="rounded-md border border-border p-4 space-y-3">
        <p className="text-sm font-mono text-primary">Scoped data-appearance=terminal</p>
        <Button size="sm" color="primary">
          Terminal button
        </Button>
        <AppearanceReadout />
      </AppearanceProvider>
      <p className="text-xs text-muted">
        useAppearance resolves the nearest AppearanceProvider context.
      </p>
    </div>
  ),
};
