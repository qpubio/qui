# Migrating apps to `@qpub/qui`

Targets: **`qpub-website`** and **`qpub-dashboard`** (paths relative to their repo roots).

## Phase 1 — primitives only

After `@qpub/qui` exposes `Button`, `Input`, `Card`, and `Label` (required by `Input`):

1. **Install**

   Local development (recommended while iterating):

   ```json
   "@qpub/qui": "file:../qui"
   ```

   Published:

   ```bash
   npm install @qpub/qui
   ```

   **npm link**: possible but watch for duplicate React. Prefer `file:` or npm overrides.

2. **Tailwind**

   - Merge `presets: [require('@qpub/qui/tailwind-preset')]`.
   - Extend **`content`** to scan `./node_modules/@qpub/qui/dist/**/*.{js,mjs}` so dynamic classes compile.
   - Optionally `@import "@qpub/qui/globals.css";` **or** keep existing `styles/themes/*.scss` as long as **variable names** match (`--primary`, `--error`, …).

3. **Codemod (imports)**

   Copy `scripts/qui-migrate-imports.mjs` into the app repo (or run via relative path), then from the app root:

   ```bash
   node path/to/qui-migrate-imports.mjs
   node path/to/qui-migrate-imports.mjs --write
   ```

   Flags:

   - `--root` — project root (default `cwd`)
   - `--roots` — comma-separated folders to scan (default `app,components,pages,src`)
   - `--ignore` — extra directory names to skip
   - **`--write`** — apply changes (default is dry-run diffs only)

   The script rewrites `@/components/ui/Button|Input|Card|Label` → `@qpub/qui`, merges consecutive duplicate `@qpub/qui` specifier lists (`import` vs `import type` kept separate).

4. **Verify**

   - `npm run build` / typecheck per app.
   - Visual sweep: button variant matrix, labelled input + invalid state, card layout.

5. **Remove old files**

   After zero remaining imports:

   · `components/ui/Button.tsx`

   · `components/ui/Input.tsx`

   · `components/ui/Card.tsx`

   · `components/ui/Label.tsx`

## Edge cases

- **SSR / Next.js**: interactive primitives consume Radix hooks in client trees; add `"use client"` in a thin app wrapper if the compiler complains.
- **Class loss**: ensure Tailwind `content` includes the library `dist` output.
- **Token drift**: diff your theme SCSS against `src/styles/globals.css` in `qui` if colors shift.

## Later phases — `@qpub/qui` vs app-only components

Most shared `components/ui` modules are ported into `@qpub/qui`. **`Chart`** (Recharts wrappers), **`CodeHighlighter`** (Shiki syntax highlighting), **`CodeEditor`** (Monaco), **`ApiKeyDisplay`** (API key masking / copy UX), **Highcharts** charts, and **advanced multi-snippet / grouped code highlighters** stay in **`qpub-website`** / **`qpub-dashboard`** (or duplicated locally)—they are **not** exported from this package.

**Breaking shifts when rewiring imports from app `components/ui`:**

- **`Sidebar`**: Does not read a global Zustand sidebar store. Prefer `SidebarProvider` with optional controlled `open` / `onOpenChange`, or uncontrolled defaults.

- **`Toaster`**: No `next-themes` coupling; pass **`theme`** (Sonner-compatible) where needed.

Extend the codemod or replace imports explicitly; validate with **`npm install`** (matching peers), **`npm run build`**, and Storybook where applicable.

---

If you previously imported **`Chart*`**, **`CodeHighlighter*`**, **`CodeEditor*`**, **`CodeEditorProps`**, **`ApiKeyDisplay*`**, **`ApiKeyDisplayProps`**, **`LANGUAGE_DISPLAY_NAMES`**, **`LANGUAGE_ALIASES`**, **`SupportedLanguage`**, **`AdvancedChart*`**, **`AdvancedCodeHighlighter*`**, **`LanguageTabs`**, or **`AdvancedCodeHighlighterSyncProvider`** from **`@qpub/qui`**, use **`components/ui`** or a shared module inside each app instead.

Repeat install + codemod + delete for the remaining `components/ui/*` files as they move into **`@qpub/qui`** where applicable.

## Font CSS variables (breaking)

The Tailwind preset’s `font-sans` / `font-mono` utilities read **`--font-sans`** and **`--font-mono`** (defined with system fallbacks in `@qpub/qui/globals.css`).

If you previously overrode **`--font-geist-sans`** / **`--font-geist-mono`**, rename those declarations:

- `--font-geist-sans` → `--font-sans`
- `--font-geist-mono` → `--font-mono`

**Next.js `next/font`:** If your font loader exposes a class that sets something like `--font-geist-sans`, wire it into the new hooks, for example:

```css
:root {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}
```

(or configure the loader’s CSS variable name to **`--font-sans`** if your setup supports it.)
