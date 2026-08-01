import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Kbd,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "@qpub/qui";
import { InfoIcon } from "lucide-react";

/**
 * Gallery for validating the terminal appearance language against existing primitives.
 * Use the Storybook toolbar: Appearance → Terminal, Density → Compact, Theme → dark/light.
 */
const meta = {
  title: "Themes/Terminal Appearance",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const PrimitivesGallery: Story = {
  name: "Primitives gallery",
  render: () => (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-lg font-semibold">Terminal appearance</h1>
        <p className="text-sm text-muted mt-1">
          Toolbar: <Kbd>Appearance</Kbd> Terminal · Density · Theme. Brand colors stay; chrome densifies.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-medium">Controls</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" color="primary">
            Primary
          </Button>
          <Button size="sm" variant="bordered">
            Bordered
          </Button>
          <Button size="sm" variant="ghost">
            Ghost
          </Button>
          <ToggleGroup type="single" defaultValue="a" size="sm" variant="bordered">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label="Command"
            size="sm"
            startContent={<span className="text-primary">$</span>}
            defaultValue="deploy --env=prod"
          />
          <Select label="Region" size="sm" defaultValue="us">
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">us-east-1</SelectItem>
              <SelectItem value="eu">eu-west-1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="logs" color="primary" size="sm" className="max-w-md">
          <TabsList>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="traces">Traces</TabsTrigger>
          </TabsList>
          <TabsContent value="logs" className="text-sm text-muted p-2">
            Stream output
          </TabsContent>
          <TabsContent value="metrics" className="text-sm text-muted p-2">
            Charts
          </TabsContent>
          <TabsContent value="traces" className="text-sm text-muted p-2">
            Spans
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium">Feedback</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="success">success</Badge>
          <Badge color="warning" variant="bordered">
            warning
          </Badge>
          <Badge color="error">error</Badge>
          <Badge color="debug">debug</Badge>
          <Spinner size="sm" color="primary" />
        </div>
        <Progress value={66} color="success" size="sm" className="max-w-md" />
        <Alert color="warning" variant="bordered" className="max-w-lg">
          <AlertIcon>
            <InfoIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Queue depth high</AlertTitle>
            <AlertDescription>Status colors match the default brand palette.</AlertDescription>
          </AlertContent>
        </Alert>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium">Surfaces</h2>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Deploy job</CardTitle>
            <CardDescription>Card under terminal chrome (sharp radius, no soft shadow).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table size="sm">
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Build</TableCell>
                  <TableCell>ok</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Test</TableCell>
                  <TableCell>ok</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium">Overlays</h2>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="bordered">
                Dialog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm deploy</DialogTitle>
                <DialogDescription>Terminal chrome: no soft shadow, denser padding.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button size="sm" color="primary">
                  Deploy
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="bordered">
                Popover
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 text-sm">Popover content</PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="bordered">
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Restart</DropdownMenuItem>
              <DropdownMenuItem>Scale</DropdownMenuItem>
              <DropdownMenuItem>Logs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </div>
  ),
};
