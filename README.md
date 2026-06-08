# @qpub/qui

Shared React primitives for QPub apps: **Tailwind CSS** tokens (shadcn-compatible), **CVA**, and **Radix** building blocks.

## Install

Using npm:

```bash
npm install @qpub/qui
```

**Peer vs bundled:** Anything in **`@qpub/qui` `peerDependencies`** is **not shipped inside** the published package. Your app installs React, Radix, Tailwind-related helpers, etc., so there is a single runtime copy and `qui` stays small. The library’s own **`devDependencies`** are only for building Storybook and `dist/` here.

While migrating, **`--sync-peers`** on [`scripts/qui-migrate-imports.mjs`](./scripts/qui-migrate-imports.mjs) can add any missing peer packages to the app’s **`package.json`**—see [MIGRATION.md](./MIGRATION.md).

Peer dependencies (must be installed in the consuming app; see **`@qpub/qui` `peerDependencies`** for exact ranges):

- `react`, `react-dom`
- All Radix primitives referenced by the components you import (for example `@radix-ui/react-dialog`, `@radix-ui/react-select`, …); see `@qpub/qui` `peerDependencies` for the full set
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `tailwindcss`, `tailwindcss-animate`

Optional or feature-specific (install when you use command palette, date picker, etc.):

- `lucide-react`, `cmdk`, `vaul`, `sonner`, `react-day-picker`, `react-resizable-panels`

## Tailwind consumers

Add the preset and scan the compiled package so utilities are generated:

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

Import base variables once (adjust path if your bundler resolves CSS differently):

```css
@import "@qpub/qui/globals.css";
```

Override CSS variables in your own layer as needed.

### Fonts

This package does **not** ship font files or `@font-face` rules. You choose how fonts are loaded (`next/font`, `@fontsource/*`, CDN, self-hosted assets, etc.).

The Tailwind preset maps `font-sans` / `font-mono` to CSS variables:

- `--font-sans` — full sans `font-family` stack (comma-separated)
- `--font-mono` — full monospace stack

The published `globals.css` (`@import "@qpub/qui/globals.css"`) sets both to **system UI fallbacks** so components render correctly without extra setup. Override **`--font-sans`** / **`--font-mono`** on `:root` or `body` when you inject your own faces (for example map Geist from `next/font` into `--font-sans`; see [MIGRATION.md](./MIGRATION.md)).

## Usage

Published output is a **single client bundle** (`"use client"` on `dist/index.mjs`). Import everything from **`@qpub/qui`**:

```tsx
import { Button, Card, CardHeader, CardTitle, Input } from "@qpub/qui";
```

In a Next.js app using **`file:../qui`**, set **`transpilePackages: ["@qpub/qui"]`** in **`next.config`**. This package does not export **`cn`** — add your own class helper in the app if needed.

See **Storybook**: `npm run dev` from this repo.

## Developing this package

```bash
npm install
npm run typecheck
npm run dev
npm run build
npm run lint
npm run build-storybook
```

## Migrating an app (`components/ui` → `@qpub/qui`)

Use the published import codemod (see **[MIGRATION.md](./MIGRATION.md)** for peers, Tailwind, app-only widgets, delete list):

```bash
# From the consuming app repo (adjust path):
node ../qui/scripts/qui-migrate-imports.mjs --sync-peers           # dry-run: imports + deps
node ../qui/scripts/qui-migrate-imports.mjs --sync-peers --write    # apply, then npm install

# From this repo, pointing at the app:
npm run migrate-imports -- --root /path/to/qpub-website --sync-peers --write
```

Without **`--write`**, the script prints diffs only. **`--sync-peers`** merges any missing **`@qpub/qui` peers** into the app’s **`dependencies`**.

---
