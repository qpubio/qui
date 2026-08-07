import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CodeBlock,
  Divider,
  H1,
  H2,
  H3,
  InlineCode,
  Li,
  Ol,
  P,
  Quote,
  TextLink,
  Ul,
} from "@qpub/qui";

const meta = {
  title: "Components/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="max-w-2xl space-y-2">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <P>
        Body paragraph with <InlineCode>inline code</InlineCode> and a{" "}
        <TextLink href="#">link</TextLink>.
      </P>
      <Quote>A short quotation for emphasis.</Quote>
      <Ul>
        <Li>Bullet one</Li>
        <Li>Bullet two</Li>
      </Ul>
      <Ol>
        <Li>First</Li>
        <Li>Second</Li>
      </Ol>
      <CodeBlock>
        <code>{`const hello = "world";`}</code>
      </CodeBlock>
      <Divider />
      <P>Content after a divider.</P>
    </div>
  ),
};
