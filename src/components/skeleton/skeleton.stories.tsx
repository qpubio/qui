import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import { Button, Skeleton } from "@qpub/qui";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Composition: Story = {
  render: () => (
    <div className="flex max-w-sm items-start gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
};

export const CardPlaceholder: Story = {
  name: "Card placeholder",
  render: () => (
    <div className="max-w-sm space-y-3 rounded-md border border-border p-4">
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-8 w-24" />
    </div>
  ),
};

export const LoadingToContent: Story = {
  name: "Loading to content",
  render: function LoadingToContentStory() {
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

    useEffect(() => {
      setLoading(true);
      const id = window.setTimeout(() => setLoading(false), 1500);
      return () => window.clearTimeout(id);
    }, [key]);

    return (
      <div className="flex max-w-sm flex-col gap-3">
        <div className="space-y-3 rounded-md border border-border p-4">
          {loading ? (
            <>
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-24" />
            </>
          ) : (
            <>
              <div className="flex h-40 items-center justify-center rounded-md bg-muted/30 text-sm text-muted">
                Cover image
              </div>
              <p className="font-medium">Deploy pipeline</p>
              <p className="text-sm text-muted">
                Last run finished in 42s with no failures.
              </p>
              <Button size="sm" color="primary">
                View run
              </Button>
            </>
          )}
        </div>
        <Button
          size="sm"
          variant="bordered"
          onClick={() => setKey((k) => k + 1)}
        >
          Reload
        </Button>
      </div>
    );
  },
};
