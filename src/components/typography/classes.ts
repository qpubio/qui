/**
 * Shared typography class strings — single source for React components and
 * consumers that apply styles via className (e.g. Lexical theme maps).
 */
export const typographyClasses = {
  h1: "text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight",
  h2: "text-xl md:text-2xl lg:text-3xl font-semibold leading-tight",
  h3: "text-lg md:text-xl lg:text-2xl font-semibold leading-tight",
  h4: "text-base md:text-lg lg:text-xl font-medium leading-tight",
  h5: "text-sm md:text-base lg:text-lg font-medium leading-tight",
  h6: "text-xs md:text-sm lg:text-base font-medium leading-tight",
  p: "my-4 text-base font-normal leading-relaxed",
  ul: "my-4 mb-4 list-none space-y-1 pl-3 text-base font-normal leading-relaxed [&>li]:relative [&>li]:pl-3 [&>li]:before:absolute [&>li]:before:ml-[-22px] [&>li]:before:text-muted [&>li]:before:content-['-']",
  ol: "my-4 list-inside list-decimal space-y-2 text-base font-normal leading-relaxed [&>li]:marker:text-muted",
  li: "text-base font-normal leading-relaxed",
  quote: "my-3 border-l-[3px] border-border pl-4 text-muted italic",
  code: "my-3 block overflow-x-auto whitespace-pre rounded-md bg-accent px-4 py-3 font-mono text-sm leading-relaxed",
  inlineCode: "rounded-md bg-accent px-1.5 py-0.5 font-mono text-[0.875em]",
  link: "text-primary underline underline-offset-2",
  hr: "my-5 cursor-pointer border-0 border-t border-border py-0.5",
  bold: "font-bold",
  italic: "italic",
  underline: "underline",
  strikethrough: "line-through",
} as const;

export type TypographyVariant = keyof typeof typographyClasses;
