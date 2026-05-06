/** Discriminant types for Button `isIconOnly` accessibility constraints. */

export type IconOnlyButtonProps = {
  isIconOnly: true;
} & ({ "aria-label": string } | { "aria-labelledby": string } | { title: string });

export type RegularButtonProps = {
  isIconOnly?: false;
};

export type ButtonVisualVariant =
  | "solid"
  | "faded"
  | "bordered"
  | "light"
  | "flat"
  | "ghost"
  | "link";

export type ButtonPaletteColor =
  | "primary"
  | "secondary"
  | "info"
  | "debug"
  | "warning"
  | "success"
  | "error"
  | "fatal"
  | "default";
