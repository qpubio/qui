# Migrating apps to `@qpub/qui`

Targets: **`qpub-website`** and **`qpub-dashboard`** (paths below are relative to each app’s repo root).

This package is intended to replace the bulk of duplicated **`components/ui/*`** primitives. **`@qpub/qui`** ships as **one client bundle** (`dist/index.mjs` / `dist/index.js` with `"use client"` at the top). Import components from that entry only — do not deep-import paths under **`dist/`**.

---

## Next.js App Router

- **`import { Button, … } from "@qpub/qui"`** — use from Server or Client Components; the published bundle is a client module.
- **Monorepo / `file:` dependency:** add **`transpilePackages: ["@qpub/qui"]`** in the app’s **`next.config`**, then reinstall and restart dev.
- **`cn`** — not exported; keep **`clsx` + `tailwind-merge`** in your app if you need it on the server.

---

## Stay in `components/ui/` (never shipped from `@qpub/qui`)

Keep these modules in the app and keep importing them from **`@/components/ui/...`** (or relative paths inside `components/ui/`):

| File / area                                                                                           | Notes                                        |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **`Chart.tsx`**                                                                                       | Recharts stack                               |
| **`AdvancedChart.tsx`**                                                                               | Built on local chart stack                   |
| **`CodeHighlighter.tsx`**                                                                             | Shiki / syntax                               |
| **`AdvancedCodeHighlighter.tsx`**, **`AdvancedCodeHighlighterGroupTabs.tsx`**, **`LanguageTabs.tsx`** | Advanced snippet UI                          |
| **`CodeEditor.tsx`**                                                                                  | Monaco                                       |
| **`ApiKeyDisplay.tsx`**                                                                               | Product-specific wiring on top of primitives |

The codemod **does not** rewrite imports for these names; everything else in the table below is migrated to **`@qpub/qui`**.

---

## Shipped UI modules (codemod rewrites to `@qpub/qui`)

When a file imports **`@/components/ui/<Name>`** or a sibling **`./<Name>`** from inside **`components/ui/`**, `<Name>` is rewritten to **`@qpub/qui`** if `<Name>` is one of:

`Alert`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Card`, `Checkbox`, `Code`, `Collapsible`, `Command`, `CopyButton`, `DateRangePicker`, `Dialog`, `Drawer`, `DropdownMenu`, `Input`, `Label`, `NavigationMenu`, `Popover`, `Progress`, `RadioGroup`, `Resizable`, `ScrollArea`, `SecretText`, `Select`, `Separator`, `Sheet`, `Sidebar`, `Skeleton`, `Spinner`, `Table`, `Tabs`, `Toaster`, `Toggle`, `ToggleGroup`, `Tooltip`

The authoritative list lives in **`QUI_UI_STEMS`** in [`scripts/qui-migrate-imports.mjs`](scripts/qui-migrate-imports.mjs). Add a name there when you add a component to this package and want apps to migrate it.

---

## Before you run the codemod

1. **Install `@qpub/qui`**

   Local (monorepo):

   ```json
   "@qpub/qui": "file:../qui"
   ```

   Published:

   ```bash
   npm install @qpub/qui
   ```

   Avoid **`npm link`** for React-heavy trees unless you know the duplicate-React risks; prefer **`file:`** or workspace protocol.

2. **Tailwind**
   - Set **`presets: [require('@qpub/qui/tailwind-preset')]`** (or ESM equivalent).
   - Extend **`content`** with **`./node_modules/@qpub/qui/dist/**/\*.{js,mjs}`\*\* so classes used only inside the package still compile.
   - Import design tokens once, e.g. **`@import "@qpub/qui/globals.css";`**, or keep your theme files if **CSS variable names** stay aligned with `qui` (`--primary`, `--error`, …). See **[docs/theming.md](./docs/theming.md)** for overrides and dark mode.

3. **Peer dependencies (why they still appear in _your_ app)**

   **`@qpub/qui` does _not_ bundle** React, Radix, **`cmdk`**, **`tailwindcss`**, etc. npm expects the **host application** (here, `qpub-website`) to install those packages—the library only declares **`peerDependencies`** so:
   - you get **one** copy of React / Radix (avoids duplicated context, hook bugs, bloated bundles);
   - **`qui`’s `dist/`** stays small and avoids version skew with your app.

   So “deps for `qui`” in **`qui/package.json`** are mostly **development** installs for building Storybook/tests; **`peerDependencies`** are the contract for **consumers**. Your app lists the same peers in **`dependencies`** (or **`devDependencies`** where appropriate).

   To avoid hand-editing **`package.json`**, run the codemod with **`--sync-peers`**: it copies any missing peer entries from **`@qpub/qui`’s `package.json`** into the app’s **`dependencies`** using the published ranges (**does not** remove or change versions you already declared). Then run **`npm install`**.

   You still add **`@qpub/qui`** itself to **`dependencies`** (e.g. **`file:../qui`**) yourself— the sync step does not add that line.

---

## Codemod: rewrite imports (`qui-migrate-imports.mjs`)

From the **`qui`** repo (recommended while iterating):

```bash
cd /path/to/qpub-website
# Dry-run imports + see which peers would be added:
node ../qui/scripts/qui-migrate-imports.mjs --sync-peers
# Apply import rewrites, merge missing peers into package.json, then npm install:
node ../qui/scripts/qui-migrate-imports.mjs --sync-peers --write
npm install
```

After **`npm install @qpub/qui`**, the script is published under the package (`files` includes `scripts/qui-migrate-imports.mjs`):

```bash
node ./node_modules/@qpub/qui/scripts/qui-migrate-imports.mjs --write
```

Or from **`qui`**: **`npm run migrate-imports -- --root /path/to/qpub-website --write`**

### Flags

| Flag                     | Meaning                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`--write`**            | Apply edits (`package.json` when **`--sync-peers`** is used; TS/TSX when import diffs exist). Default: dry-run only.                                                                                                     |
| **`--sync-peers`**       | Merge missing **`@qpub/qui` peerDependencies** into the app’s **`dependencies`**. Reads **`qui`’s `package.json`** from **`node_modules/@qpub/qui`**, or **`../qui/package.json`** as a sibling, or **`--qui-package`**. |
| **`--qui-package PATH`** | Explicit path to **`@qpub/qui` `package.json`** if resolution fails (e.g. before first install).                                                                                                                         |
| **`--root <dir>`**       | App root to scan (default: current working directory).                                                                                                                                                                   |
| **`--roots`**            | Comma-separated top-level dirs under root (default: **`app,components,pages,src`**).                                                                                                                                     |
| **`--ignore`**           | Extra directory **names** to skip while walking.                                                                                                                                                                         |
| **`--help`**             | Usage summary.                                                                                                                                                                                                           |

### Behaviour

- Walks **`--roots`** under **`--root`**, skips `node_modules`, `.next`, etc.
- Rewrites **`@/components/ui/<Stem>`** for every `<Stem>` in **`QUI_UI_STEMS`** → **`"@qpub/qui"`**.
- Inside **`components/ui/**`**, rewrites **`from "./Stem"`** for the same stems (e.g. `ApiKeyDisplay`pulling`./Button` → **`@qpub/qui`\*\*).
- Merges **consecutive** `import type` or value imports from **`@qpub/qui`** (same type-only vs value grouping), **not** alternating type/value blocks.

### Formatting note

Files **with at least one** rewritten or merged import are reprinted with TypeScript’s printer (semicolons / JSX layout may normalize). Files with **no** import changes are left **byte-for-byte untouched**. Running your app **Prettier** after **`--write`** is recommended.

---

## Delete duplicated primitives (after the codemod)

When **`rg '@/components/ui/Button'`** (and each migrated stem) reports **only** app-only leftovers and **nothing** resolves to deleted sources, remove the shim files that are now provided by **`@qpub/qui`**:

**Remove** each of (if present):

`Alert.tsx`, `Avatar.tsx`, `Badge.tsx`, `Breadcrumb.tsx`, `Button.tsx`, `Card.tsx`, `Checkbox.tsx`, `Code.tsx`, `Collapsible.tsx`, `Command.tsx`, `CopyButton.tsx`, `DateRangePicker.tsx`, `Dialog.tsx`, `Drawer.tsx`, `DropdownMenu.tsx`, `Input.tsx`, `Label.tsx`, `NavigationMenu.tsx`, `Popover.tsx`, `Progress.tsx`, `RadioGroup.tsx`, `Resizable.tsx`, `ScrollArea.tsx`, `SecretText.tsx`, `Select.tsx`, `Separator.tsx`, `Sheet.tsx`, `Sidebar.tsx`, `Skeleton.tsx`, `Spinner.tsx`, `Table.tsx`, `Tabs.tsx`, `Toaster.tsx`, `Toggle.tsx`, `ToggleGroup.tsx`, `Tooltip.tsx`

**Keep** at minimum:

`AdvancedChart.tsx`, `AdvancedCodeHighlighter.tsx`, `AdvancedCodeHighlighterGroupTabs.tsx`, `ApiKeyDisplay.tsx`, `Chart.tsx`, `CodeEditor.tsx`, `CodeHighlighter.tsx`, `LanguageTabs.tsx`

Re-run **`node …/qui-migrate-imports.mjs`** if you temporarily keep a duplicate file—the codemod will still point consumers at **`@qpub/qui`** once imports match.

---

## Verify

- **`npm install`**, **`npm run build`** / typecheck / tests.
- **Next.js:** With **`transpilePackages: ["@qpub/qui"]`**, **`head -1 node_modules/@qpub/qui/dist/index.mjs`** should be **`"use client";`**. A Server Component may **`import { Button } from "@qpub/qui"`** without **`createContext`** errors.
- Spot-check SSR / client boundaries if Next.js complains.
- Visual pass on sidebar, dialogs, forms, toast.

---

## Behaviour differences vs-old app `components/ui`

- **`Sidebar`**: Package sidebar does **not** read app-specific global stores (e.g. Zustand). Prefer **`SidebarProvider`** with **`open` / `onOpenChange`** or uncontrolled defaults.
- **`Toaster`**: Package **`Toaster`** is not coupled to **`next-themes`**; pass **`theme`** when you need explicit Sonner theming. See **[docs/theming.md](./docs/theming.md#toaster)**.

These are intentional; adjust call sites rather than forcing store coupling back into **`qui`**.

---

## Symbols that are not part of `@qpub/qui`

Older docs mentioned symbols like **`LANGUAGE_DISPLAY_NAMES`**, **`Chart*`**, **`CodeHighlighter*`**, etc. Those **were not** migrated through this barrel; **`qpub-website` / `qpub-dashboard`** should keep importing them from **`@/components/ui/...`** or local modules—not from **`@qpub/qui`**—unless you add them to **`qui`** on purpose.

---

## Font CSS variables (breaking)

The Tailwind preset’s **`font-sans`** / **`font-mono`** utilities read **`--font-sans`** and **`--font-mono`** (see **`@qpub/qui/globals.css`**). Full font setup: **[docs/theming.md](./docs/theming.md#fonts)**.

If your app defined **`--font-geist-sans`** / **`--font-geist-mono`**, rename to:

- **`--font-geist-sans` → `--font-sans`**
- **`--font-geist-mono` → `--font-mono`**

**Next.js `next/font`:** wire the loader’s CSS variable into **`--font-sans`** / **`--font-mono`**, for example:

```css
:root {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}
```

(or point **`next/font`** at **`--font-sans`** directly if supported).
