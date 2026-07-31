import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@qpub/qui";

const colors = [
  "default",
  "primary",
  "secondary",
  "info",
  "debug",
  "warning",
  "success",
  "error",
  "fatal",
] as const;

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function FruitSelect(props: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
}

export const Default: Story = {
  render: () => (
    <FruitSelect label="Favorite fruit" helperText="Shown on your profile" color="primary" />
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <FruitSelect key={color} color={color} defaultValue="apple" />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <FruitSelect size="sm" defaultValue="apple" label="Small" />
      <FruitSelect size="md" defaultValue="banana" label="Medium" />
      <FruitSelect size="lg" defaultValue="orange" label="Large" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <FruitSelect
      label="Region"
      isInvalid
      errorMessage="Select a valid region"
      isRequired
    />
  ),
};

export const GroupsSeparators: Story = {
  name: "Groups and separators",
  render: () => (
    <Select label="Framework" defaultValue="next">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Meta frameworks</SelectLabel>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Libraries</SelectLabel>
          <SelectItem value="vite">Vite</SelectItem>
          <SelectItem value="webpack">Webpack</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const ScrollLongList: Story = {
  name: "Long scrollable list",
  render: () => (
    <Select label="Timezone" defaultValue="utc">
      <SelectTrigger className="w-72">
        <SelectValue placeholder="Timezone" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 24 }, (_, i) => (
          <SelectItem key={i} value={`utc${i === 0 ? "" : i > 0 ? `+${i}` : String(i)}`}>
            UTC{i === 0 ? "" : i > 0 ? `+${i}` : i}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
