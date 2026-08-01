import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@qpub/qui";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted">Dialog body content goes here.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="bordered">Cancel</Button>
          </DialogClose>
          <Button color="primary">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Dialog key={size} size={size}>
          <DialogTrigger asChild>
            <Button size="sm" variant="bordered">
              {size}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Size {size}</DialogTitle>
              <DialogDescription>Dialog sized {size}.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-start gap-3">
        <Button onClick={() => setOpen(true)}>Open controlled</Button>
        <Dialog isOpen={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled</DialogTitle>
              <DialogDescription>Open state is managed externally.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

export const NonDismissable: Story = {
  name: "Non-dismissable",
  render: () => (
    <Dialog isDismissable={false}>
      <DialogTrigger asChild>
        <Button color="warning">Confirm action</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Escape and outside click are disabled. Use a footer action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="bordered">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button color="error">Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmPattern: Story = {
  name: "Confirm pattern",
  render: () => (
    <Dialog size="sm">
      <DialogTrigger asChild>
        <Button color="error" variant="bordered">
          Delete project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button color="error">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
