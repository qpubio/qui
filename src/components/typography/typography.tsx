import * as React from "react";

import { cn } from "../../lib/utils";
import { typographyClasses } from "./classes";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type ListProps = React.HTMLAttributes<HTMLUListElement>;
type OrderedListProps = React.HTMLAttributes<HTMLOListElement>;
type ListItemProps = React.HTMLAttributes<HTMLLIElement>;
type QuoteProps = React.HTMLAttributes<HTMLQuoteElement>;
type PreProps = React.HTMLAttributes<HTMLPreElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type HrProps = React.HTMLAttributes<HTMLHRElement>;

export type TypographyProps = {
  children?: React.ReactNode;
  className?: string;
};

export function H1({ className, ...props }: HeadingProps) {
  return <h1 className={cn(typographyClasses.h1, className)} {...props} />;
}

export function H2({ className, ...props }: HeadingProps) {
  return <h2 className={cn(typographyClasses.h2, className)} {...props} />;
}

export function H3({ className, ...props }: HeadingProps) {
  return <h3 className={cn(typographyClasses.h3, className)} {...props} />;
}

export function H4({ className, ...props }: HeadingProps) {
  return <h4 className={cn(typographyClasses.h4, className)} {...props} />;
}

export function H5({ className, ...props }: HeadingProps) {
  return <h5 className={cn(typographyClasses.h5, className)} {...props} />;
}

export function H6({ className, ...props }: HeadingProps) {
  return <h6 className={cn(typographyClasses.h6, className)} {...props} />;
}

export function P({ className, ...props }: ParagraphProps) {
  return <p className={cn(typographyClasses.p, className)} {...props} />;
}

export function Ul({ className, ...props }: ListProps) {
  return <ul className={cn(typographyClasses.ul, className)} {...props} />;
}

export function Ol({ className, ...props }: OrderedListProps) {
  return <ol className={cn(typographyClasses.ol, className)} {...props} />;
}

export function Li({ className, ...props }: ListItemProps) {
  return <li className={cn(typographyClasses.li, className)} {...props} />;
}

export function Quote({ className, ...props }: QuoteProps) {
  return (
    <blockquote className={cn(typographyClasses.quote, className)} {...props} />
  );
}

export function CodeBlock({ className, ...props }: PreProps) {
  return <pre className={cn(typographyClasses.code, className)} {...props} />;
}

export function InlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code className={cn(typographyClasses.inlineCode, className)} {...props} />
  );
}

export function TextLink({ className, ...props }: AnchorProps) {
  return <a className={cn(typographyClasses.link, className)} {...props} />;
}

export function Divider({ className, ...props }: HrProps) {
  return <hr className={cn(typographyClasses.hr, className)} {...props} />;
}

export { typographyClasses } from "./classes";
export type { TypographyVariant } from "./classes";
