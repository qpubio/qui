import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@qpub/qui";

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
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["solid", "underline"] },
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoTabs(
  props: React.ComponentProps<typeof Tabs> & { disabledTab?: boolean }
) {
  const { disabledTab, ...tabsProps } = props;
  return (
    <Tabs defaultValue="account" className="max-w-md" {...tabsProps}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team" disabled={disabledTab}>
          Team
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-muted p-2">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="text-sm text-muted p-2">
        Change your password here.
      </TabsContent>
      <TabsContent value="team" className="text-sm text-muted p-2">
        Manage your team.
      </TabsContent>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => <DemoTabs color="primary" />,
};

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["solid", "underline"] as const).map((variant) => (
        <div key={variant} className="space-y-4">
          <p className="text-xs uppercase text-muted">{variant}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {colors.map((color) => (
              <div key={color}>
                <p className="mb-2 text-xs capitalize text-muted">{color}</p>
                <DemoTabs variant={variant} color={color} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <DemoTabs size="sm" color="primary" />
      <DemoTabs size="md" color="primary" />
      <DemoTabs size="lg" color="primary" />
    </div>
  ),
};

export const FullWidth: Story = {
  name: "Full width",
  render: () => <DemoTabs fullWidth color="secondary" className="max-w-lg" />,
};

export const DisabledTrigger: Story = {
  name: "Disabled trigger",
  render: () => <DemoTabs color="primary" disabledTab />,
};
