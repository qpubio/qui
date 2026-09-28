# Styling apps that use @qpub/qui

Rules for Tailwind class names in **consuming apps** (Next.js dashboards, marketing sites, etc.). `@qpub/qui` components already follow these patterns; app code should match them instead of copying shadcn defaults.

See also [theming.md](./theming.md) for tokens and setup.

## Muted text

Use **`text-muted`** for secondary copy, hints, timestamps, and loading states.

Do **not** use `text-muted-foreground` in app code. That name comes from shadcn docs; QUI and QPub apps standardize on `text-muted` (same intent, matches component source in this repo).

```tsx
// good
<p className="text-sm text-muted">Loading…</p>

// bad
<p className="text-sm text-muted-foreground">Loading…</p>
```

CSS variables such as `--muted-foreground` still exist in the token layer; this rule is about **which Tailwind utility you type**.

## Borders

QUI does **not** assume a global border color on every element (no `* { @apply border-border }` base layer). Whenever you add a visible border, set **width/side and color** together.

```tsx
// good
<div className="border border-border" />
<header className="border-b border-border" />
<StatusBar className="border-t border-border" />

// bad — width without color
<header className="border-b" />

// bad — color token without border width
<Card className="border-border" />
```

Use other border tokens when semantics require it (e.g. `border-popover-border` on popover surfaces).

## Anti-patterns

- Pasting shadcn/ui example class strings into QUI apps without adapting names
- Relying on “default border color” without an explicit `border-*` color class
- Using `-foreground` suffix utilities for muted text in app JSX
