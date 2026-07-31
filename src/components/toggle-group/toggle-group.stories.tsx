import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@qpub/qui";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" variant="bordered">
      <ToggleGroupItem value="left" aria-label="Left">
        <AlignLeftIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center">
        <AlignCenterIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">
        <AlignRightIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold"]} variant="solid">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" defaultValue="a" variant="solid">
        <ToggleGroupItem value="a">Solid A</ToggleGroupItem>
        <ToggleGroupItem value="b">Solid B</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" defaultValue="a" variant="bordered">
        <ToggleGroupItem value="a">Bordered A</ToggleGroupItem>
        <ToggleGroupItem value="b">Bordered B</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ToggleGroup key={size} type="single" defaultValue="a" size={size} variant="bordered">
          <ToggleGroupItem value="a">{size}</ToggleGroupItem>
          <ToggleGroupItem value="b">alt</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const IconOnly: Story = {
  name: "Icon only",
  render: () => (
    <ToggleGroup type="single" defaultValue="left" size="sm">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
