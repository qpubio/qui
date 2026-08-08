# @qpub/qui

React UI primitives for any React or Next.js project: **Tailwind CSS** tokens (shadcn-compatible), **CVA**, and **Radix** building blocks.

## Install

Using npm:

```bash
npm install @qpub/qui
```

**Peer vs bundled:** Anything in **`@qpub/qui` `peerDependencies`** is **not shipped inside** the published package. Your app installs React, Radix, Tailwind-related helpers, etc., so there is a single runtime copy and `qui` stays small. The library’s own **`devDependencies`** are only for building Storybook and `dist/` in this repo.

While migrating from local `components/ui` shims, **`--sync-peers`** on the published codemod can add any missing peer packages to your app’s **`package.json`**—see [MIGRATION.md](./MIGRATION.md).

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

**Theming:** token format, light/dark mode, `next-themes`, overrides, fonts, and component-specific notes — see **[docs/theming.md](./docs/theming.md)**. Terminal appearance language — see **[docs/terminal.md](./docs/terminal.md)**.

## Usage

Published output is a **single client bundle** (`"use client"` on `dist/index.mjs`). Import everything from **`@qpub/qui`**:

```tsx
import { Button, Card, CardHeader, CardTitle, Input } from "@qpub/qui";
```

In a Next.js app, add **`transpilePackages: ["@qpub/qui"]`** in **`next.config`**. This package does not export **`cn`** — add your own class helper in the app if needed.

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

Use the published import codemod (see **[MIGRATION.md](./MIGRATION.md)** for peers, Tailwind, app-only widgets, delete list). Run from your app root after **`npm install @qpub/qui`**:

```bash
node node_modules/@qpub/qui/scripts/qui-migrate-imports.mjs --sync-peers           # dry-run: imports + deps
node node_modules/@qpub/qui/scripts/qui-migrate-imports.mjs --sync-peers --write    # apply, then npm install
```

Without **`--write`**, the script prints diffs only. **`--sync-peers`** merges any missing **`@qpub/qui` peers** into the app’s **`dependencies`**.

---

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
