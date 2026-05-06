# @qpub/qui

Shared React primitives for QPub apps: **Tailwind CSS** tokens (shadcn-compatible), **CVA**, and **Radix** building blocks.

## Install

Using npm:

```bash
npm install @qpub/qui
```

Peer dependencies (install in the consuming app):

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

```tsx
import { Button, Card, CardHeader, CardTitle, Input } from "@qpub/qui";
```

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

## License

MIT — see [LICENSE](./LICENSE).

For migrating existing apps off duplicated `components/ui`, see [MIGRATION.md](./MIGRATION.md).
