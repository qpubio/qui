import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";

import { Button, Toaster } from "@qpub/qui";

const meta = {
  title: "Components/Toaster",
  component: Toaster,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => toast("Event created")}>
          Default
        </Button>
        <Button size="sm" color="success" onClick={() => toast.success("Saved")}>
          Success
        </Button>
        <Button size="sm" color="info" onClick={() => toast.info("Heads up")}>
          Info
        </Button>
        <Button size="sm" color="warning" onClick={() => toast.warning("Careful")}>
          Warning
        </Button>
        <Button size="sm" color="error" onClick={() => toast.error("Failed")}>
          Error
        </Button>
        <Button
          size="sm"
          variant="bordered"
          onClick={() => {
            const id = toast.loading("Uploading…");
            setTimeout(() => toast.success("Upload complete", { id }), 1500);
          }}
        >
          Loading
        </Button>
      </div>
    </>
  ),
};

export const AllTypes: Story = {
  name: "All types",
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        onClick={() => {
          toast("Default toast");
          toast.success("Success toast");
          toast.info("Info toast");
          toast.warning("Warning toast");
          toast.error("Error toast");
        }}
      >
        Fire all types
      </Button>
    </>
  ),
};

export const WithAction: Story = {
  name: "With action",
  render: () => (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast("File deleted", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Restored"),
            },
          })
        }
      >
        Toast with action
      </Button>
    </>
  ),
};

export const Theme: Story = {
  render: () => (
    <>
      <Toaster theme="dark" position="top-center" />
      <Button onClick={() => toast("Forced dark toaster theme")}>Show toast</Button>
    </>
  ),
};
