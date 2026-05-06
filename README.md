# @qpub/qui

Shared React primitives for QPub apps: **Tailwind CSS** tokens (shadcn-compatible), **CVA**, and **Radix** building blocks.

## Install

Using npm:

```bash
npm install @qpub/qui
```

Peer dependencies (install in the consuming app):

- `react`, `react-dom`
- `@radix-ui/react-slot`, `@radix-ui/react-label`
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `tailwindcss`, `tailwindcss-animate`

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

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, Input } from "@qpub/qui";
```

See **Storybook**: `npm run dev` from this repo.

## Developing this package

```bash
npm install
npm run dev
npm run build
npm run lint
```

## License

MIT — see [LICENSE](./LICENSE).

For migrating existing apps off duplicated `components/ui`, see [MIGRATION.md](./MIGRATION.md).
