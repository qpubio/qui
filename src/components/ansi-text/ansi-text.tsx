"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * Minimal SGR (Select Graphic Rendition) subset:
 * - 0 reset
 * - 1 bold / 2 dim / 3 italic / 4 underline
 * - 30–37 / 90–97 foreground, 39 default
 *
 * No parser dependency. For full ANSI, preprocess in the app.
 */

const FG: Record<number, string> = {
  30: "text-ansi-black",
  31: "text-ansi-red",
  32: "text-ansi-green",
  33: "text-ansi-yellow",
  34: "text-ansi-blue",
  35: "text-ansi-magenta",
  36: "text-ansi-cyan",
  37: "text-ansi-white",
  39: "",
  90: "text-ansi-bright-black",
  91: "text-ansi-bright-red",
  92: "text-ansi-bright-green",
  93: "text-ansi-bright-yellow",
  94: "text-ansi-bright-blue",
  95: "text-ansi-bright-magenta",
  96: "text-ansi-bright-cyan",
  97: "text-ansi-bright-white",
};

type StyleState = {
  bold: boolean;
  dim: boolean;
  italic: boolean;
  underline: boolean;
  fg: string;
};

const defaultStyle = (): StyleState => ({
  bold: false,
  dim: false,
  italic: false,
  underline: false,
  fg: "",
});

function applyCodes(state: StyleState, codes: number[]): StyleState {
  let next = { ...state };
  for (const code of codes) {
    if (code === 0) next = defaultStyle();
    else if (code === 1) next.bold = true;
    else if (code === 2) next.dim = true;
    else if (code === 3) next.italic = true;
    else if (code === 4) next.underline = true;
    else if (code === 22) {
      next.bold = false;
      next.dim = false;
    } else if (code === 23) next.italic = false;
    else if (code === 24) next.underline = false;
    else if (FG[code] !== undefined) next.fg = FG[code];
  }
  return next;
}

function styleClass(state: StyleState): string {
  return cn(
    state.fg,
    state.bold && "font-bold",
    state.dim && "opacity-60",
    state.italic && "italic",
    state.underline && "underline"
  );
}

type Segment = { text: string; className: string };

const ESC = String.fromCharCode(27);
const SGR_SPLIT = new RegExp(`${ESC}\\[([0-9;]*)m`);
const SGR_GLOBAL = new RegExp(`${ESC}\\[[0-9;]*m`, "g");

function parseAnsi(input: string): Segment[] {
  const parts = input.split(SGR_SPLIT);
  const segments: Segment[] = [];
  let style = defaultStyle();

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i] ?? "";
    if (i % 2 === 0) {
      if (part) {
        segments.push({ text: part, className: styleClass(style) });
      }
    } else {
      const codes = part
        .split(";")
        .filter(Boolean)
        .map((c) => Number(c));
      style = applyCodes(style, codes.length ? codes : [0]);
    }
  }
  return segments;
}

/** Strip CSI SGR sequences for accessible plain text. */
export function stripAnsi(input: string): string {
  return input.replace(SGR_GLOBAL, "");
}

export type AnsiTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  children: string;
  /** When true, renders a single plain-text node (no color spans). */
  plain?: boolean;
};

function AnsiText({ className, children, plain = false, ...props }: AnsiTextProps) {
  const segments = React.useMemo(
    () => (plain ? null : parseAnsi(children)),
    [children, plain]
  );

  if (plain) {
    return (
      <span data-slot="ansi-text" className={cn("font-mono", className)} {...props}>
        {stripAnsi(children)}
      </span>
    );
  }

  return (
    <span
      data-slot="ansi-text"
      className={cn("font-mono whitespace-pre-wrap", className)}
      {...props}
    >
      {segments?.map((seg, i) => (
        <span key={i} className={seg.className || undefined}>
          {seg.text}
        </span>
      ))}
    </span>
  );
}

export { AnsiText };
