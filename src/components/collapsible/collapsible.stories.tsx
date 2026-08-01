import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@qpub/qui";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="max-w-sm space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium">@qpub/qui dependencies</h4>
        <CollapsibleTrigger asChild>
          <Button size="sm" variant="bordered">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <p className="text-sm text-muted">3 packages installed.</p>
      <CollapsibleContent className="space-y-1 text-sm font-mono">
        <div>@radix-ui/react-dialog</div>
        <div>class-variance-authority</div>
        <div>cmdk</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(true);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="max-w-sm space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="bordered" size="sm">
            {open ? "Collapse" : "Expand"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-md border border-border p-3 text-sm">
          Controlled content is visible when open.
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const Nested: Story = {
  render: () => (
    <Collapsible className="max-w-md space-y-2" defaultOpen>
      <CollapsibleTrigger asChild>
        <Button size="sm" variant="ghost">
          Parent section
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pl-3">
        <p className="text-sm text-muted">Parent content</p>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button size="sm" variant="bordered">
              Nested section
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-md border border-border p-2 text-sm">
            Nested collapsible content.
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  ),
};
