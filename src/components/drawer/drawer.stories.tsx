import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@qpub/qui";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-sm text-muted">Drawer body content.</div>
        <DrawerFooter>
          <Button color="primary">Submit</Button>
          <DrawerClose asChild>
            <Button variant="bordered">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Directions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["top", "right", "bottom", "left"] as const).map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button size="sm" variant="bordered">
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">{direction}</DrawerTitle>
              <DrawerDescription>Drawer from the {direction}.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Drawer key={size} size={size} direction="right">
          <DrawerTrigger asChild>
            <Button size="sm" variant="bordered">
              {size}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Size {size}</DrawerTitle>
              <DrawerDescription>Right drawer sized {size}.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const MobileMenu: Story = {
  name: "Mobile menu",
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="bordered">Menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Quick links for mobile.</DrawerDescription>
        </DrawerHeader>
        <nav className="grid gap-2 p-4 text-sm">
          <button type="button" className="rounded-md px-3 py-2 text-left hover:bg-accent">
            Dashboard
          </button>
          <button type="button" className="rounded-md px-3 py-2 text-left hover:bg-accent">
            Projects
          </button>
          <button type="button" className="rounded-md px-3 py-2 text-left hover:bg-accent">
            Settings
          </button>
        </nav>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
