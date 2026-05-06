import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@qpub/qui";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Plan</CardTitle>
        <CardDescription>Shared primitives for shipped apps.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm" variant="bordered">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  ),
};
