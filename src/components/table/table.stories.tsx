import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@qpub/qui";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
];

export const Default: Story = {
  render: () => (
    <Table className="max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((row) => (
          <TableRow key={row.invoice}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithCaptionFooter: Story = {
  name: "With caption and footer",
  render: () => (
    <Table className="max-w-2xl">
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((row) => (
          <TableRow key={row.invoice}>
            <TableCell>{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const DenseData: Story = {
  name: "Dense data",
  render: () => (
    <Table size="sm" className="max-w-2xl font-mono">
      <TableHeader>
        <TableRow>
          <TableHead>ts</TableHead>
          <TableHead>level</TableHead>
          <TableHead>message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["10:01:02", "info", "server started"],
          ["10:01:03", "warn", "cache miss"],
          ["10:01:04", "error", "upstream timeout"],
        ].map(([ts, level, message]) => (
          <TableRow key={ts}>
            <TableCell>{ts}</TableCell>
            <TableCell>{level}</TableCell>
            <TableCell>{message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const RowStates: Story = {
  name: "Interactive rows",
  render: () => (
    <Table className="max-w-2xl" variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["Ada Lovelace", "Admin"],
          ["Grace Hopper", "Engineer"],
          ["Alan Turing", "Research"],
        ].map(([name, role]) => (
          <TableRow key={name} variant="interactive">
            <TableCell>{name}</TableCell>
            <TableCell>{role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
