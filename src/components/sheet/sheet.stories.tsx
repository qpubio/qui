import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@qpub/qui";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Adjust preferences for this workspace.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 py-4">
          <Input label="Display name" defaultValue="Ada" />
          <Input label="Email" defaultValue="ada@qpub.io" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="bordered">Cancel</Button>
          </SheetClose>
          <Button color="primary">Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button size="sm" variant="bordered">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="capitalize">{side} sheet</SheetTitle>
              <SheetDescription>Opened from the {side}.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  name: "With form",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button color="primary">Invite member</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite member</SheetTitle>
          <SheetDescription>Send an invite to join this organization.</SheetDescription>
        </SheetHeader>
        <div className="space-y-3 py-4">
          <Input label="Email" placeholder="name@company.com" isRequired />
          <Input label="Role" defaultValue="Developer" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <Button color="primary">Send invite</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FooterActions: Story = {
  name: "Footer actions",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="bordered">Filters</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <p className="text-sm text-muted py-4">Filter controls go here.</p>
        <SheetFooter>
          <Button variant="ghost" size="sm">
            Reset
          </Button>
          <Button size="sm" color="primary">
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
