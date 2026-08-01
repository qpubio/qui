# Theming

`@qpub/qui` uses **CSS custom properties** as the single source of truth for colors, radius, and fonts. Components consume tokens through Tailwind utilities (`bg-primary`, `text-muted-foreground`, …), not hard-coded values.

---

## Setup

1. Add the Tailwind preset and scan the compiled package:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@qpub/qui/tailwind-preset")],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@qpub/qui/dist/**/*.{js,mjs}",
  ],
};
```

2. Import design tokens once in your global CSS (before app-specific overrides):

```css
@import "@qpub/qui/globals.css";
```

The preset sets **`darkMode: ["class"]`**. Dark tokens apply when either **`html` has class `dark`** or an ancestor has **`data-theme="dark"`** (Storybook and some toggles use the latter).

---

## Token format

Variables store **OKLCH components only** — lightness, chroma, hue — without the `oklch()` wrapper:

```css
:root {
  --primary: 0.5677 0.2373 262.9;
}
```

The Tailwind preset maps each token to `oklch(var(--primary) / <alpha-value>)`, so utilities like `bg-primary/80` work.

**Do not** wrap values in `oklch(...)` when overriding; keep the same `L C H` triple format.

---

## Token groups

| Group | Variables | Tailwind examples |
| --- | --- | --- |
| **Base** | `--background`, `--foreground` | `bg-background`, `text-foreground` |
| **Surfaces** | `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--popover-border`, `--dialog` | `bg-card`, `bg-popover`, `border-popover-border` |
| **Brand** | `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground` | `bg-primary`, `text-primary-foreground` |
| **State** | `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground` | `bg-muted`, `text-accent-foreground` |
| **Interaction** | `--border`, `--ring` | `border-border`, `ring-ring` |
| **Charts** | `--chart-1` … `--chart-6` | `fill-chart-1`, `stroke-chart-3` |
| **Sidebar** | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, … | `bg-sidebar`, `text-sidebar-foreground` |
| **Status** | `--info`, `--debug`, `--success`, `--warning`, `--error`, `--fatal` (+ `-foreground` each) | `bg-success`, `text-error-foreground` |
| **Layout** | `--radius` | `rounded-md` (derived sizes in preset) |
| **Fonts** | `--font-sans`, `--font-mono` | `font-sans`, `font-mono` |

Default light and dark values live in [`src/styles/globals.css`](../src/styles/globals.css).

---

## Light and dark mode

Light tokens are on **`:root`**. Dark tokens override the same names under:

```css
html.dark,
[data-theme="dark"] {
  --background: 0 0 0;
  /* … */
}
```

Most components rely on semantic tokens and need no `dark:` classes. A few primitives add `dark:` tweaks for borders or invalid states; switching the root theme is enough for them to pick up new values.

---

## Appearance languages (terminal)

Color **scheme** (light/dark) is orthogonal to **appearance** (default/terminal).

```css
@import "@qpub/qui/globals.css";
@import "@qpub/qui/themes/terminal.css";
```

```html
<html class="dark" data-appearance="terminal" data-density="compact">
```

See [terminal.md](./terminal.md) for tokens, performance mode (`@qpub/qui/lite` + motion kill-switch), new composites (`Terminal`, `Prompt`, `LogViewer`, …), and Storybook controls.

Optional helpers: `AppearanceProvider`, `useAppearance` from `@qpub/qui`.

### `next-themes` (recommended for Next.js apps)

```tsx
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>
```

Use **`attribute="class"`** so `next-themes` toggles the `dark` class on `<html>`, matching the preset and `globals.css`.

Toggle in UI:

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
// setTheme("light" | "dark" | "system")
```

### `useDocumentDark`

When you cannot use `next-themes` (e.g. a leaf component that must react to the document class), import the hook from `@qpub/qui`:

```tsx
import { useDocumentDark } from "@qpub/qui";

const dark = useDocumentDark(); // true when <html class="dark">
```

It observes `document.documentElement` for class changes and does not manage theme state itself.

---

## Customizing tokens

Override variables **after** the `@qpub/qui/globals.css` import. Keep names identical so components and the preset stay aligned.

```css
@import "@qpub/qui/globals.css";

@layer base {
  :root {
    --primary: 0.55 0.22 250;
    --radius: 0.5rem;
  }

  html.dark,
  [data-theme="dark"] {
    --primary: 0.72 0.14 265;
  }
}
```

Override **both** light (`:root`) and dark (`html.dark` / `[data-theme="dark"]`) when changing a color that should differ per theme.

Apps that previously kept theme SCSS (`styles/themes/light.scss`, `styles/themes/dark.scss`) can migrate those blocks into this pattern and delete duplicate theme files once variable names match `qui`.

---

## Fonts

`@qpub/qui` does **not** ship font files. Defaults in `globals.css` are system UI stacks.

Map your app’s fonts via CSS variables:

```css
:root {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

With **Next.js `next/font`**, point the loader’s CSS variable at `--font-sans` / `--font-mono`, or bridge an existing `--font-geist-sans` as above. See [MIGRATION.md](../MIGRATION.md#font-css-variables-breaking) for the rename from legacy `--font-geist-*` names.

---

## Border radius

`--radius` is the base (default `0.75rem`). The preset derives:

| Utility | Formula |
| --- | --- |
| `rounded-2xs` | `calc(var(--radius) - 8px)` |
| `rounded-xs` | `calc(var(--radius) - 6px)` |
| `rounded-sm` | `calc(var(--radius) - 4px)` |
| `rounded-md` | `var(--radius)` |
| `rounded-lg` | `calc(var(--radius) + 4px)` |
| `rounded-xl` | `calc(var(--radius) + 6px)` |
| `rounded-2xl` | `calc(var(--radius) + 8px)` |

---

## Component notes

### `Toaster`

The package `Toaster` is **not** wired to `next-themes`. It accepts Sonner’s `theme` prop (default `"system"`). For explicit sync with the app theme, wrap it in your app:

```tsx
"use client";

import { useTheme } from "next-themes";
import { Toaster as QuiToaster } from "@qpub/qui";

export function Toaster() {
  const { theme = "system" } = useTheme();
  return <QuiToaster theme={theme as "light" | "dark" | "system"} position="top-right" />;
}
```

Toast surfaces use `--popover`, `--popover-foreground`, and `--popover-border` via inline Sonner CSS variables.

### Charts and third-party widgets

Recharts, Monaco, Shiki, and similar libraries live in the **app** (`components/ui/`), not in `@qpub/qui`. Read `useTheme()` or `useDocumentDark()` there and pass the resolved `"light"` / `"dark"` value into the library’s own theme API.

---

## Storybook (this repo)

Storybook uses `@storybook/addon-themes` with **`data-theme`** on the preview root (`docs/.storybook/preview.tsx`), which matches the `[data-theme="dark"]` block in `globals.css`. Additional toolbar controls set **`data-appearance`** and **`data-density`**. Geist fonts are loaded only in Storybook via `docs/.storybook/storybook-fonts.css` — they are not published with the package.

Run `npm run dev` from this repo to preview components across scheme × appearance × density.
