import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react";

import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@qpub/qui";

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

function Palette() {
  return (
    <Command className="rounded-md border border-border max-w-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            Calendar
          </CommandItem>
          <CommandItem>
            <SmileIcon />
            Search emoji
          </CommandItem>
          <CommandItem>
            <CalculatorIcon />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export const Default: Story = {
  render: () => <Palette />,
};

export const CommandDialogStory: Story = {
  name: "Command dialog",
  render: function DialogStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandDialog isOpen={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setOpen(false)}>New project</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Invite teammate</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Open settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const EmptyState: Story = {
  name: "Empty state",
  render: () => (
    <Command className="rounded-md border border-border max-w-md">
      <CommandInput placeholder="Search…" value="zzzz-no-match" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Hidden">
          <CommandItem>Only shows when matching</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Grouped: Story = {
  render: () => <Palette />,
};

export const WithShortcuts: Story = {
  name: "With shortcuts",
  render: () => <Palette />,
};
