# Terminal appearance

Terminal is a second **appearance language** for `@qpub/qui` — the same components and APIs, remapped design tokens. It is **not** a `variant` and not a parallel component library.

## Axes

| Axis | Attribute | Values |
| --- | --- | --- |
| Scheme | `class="dark"` or `data-theme="dark"` | light / dark (existing) |
| Appearance | `data-appearance="terminal"` | default / terminal |
| Density | `data-density="compact"` | comfortable / compact |

Do **not** register `"terminal"` as a `next-themes` theme value. Keep scheme and appearance separate.

## Setup

```css
@import "@qpub/qui/globals.css";
@import "@qpub/qui/themes/terminal.css";
```

```tsx
<html className="dark" data-appearance="terminal" data-density="compact">
```

Optional helper (sets attributes only — no runtime styling):

```tsx
import { AppearanceProvider } from "@qpub/qui";

<AppearanceProvider appearance="terminal" density="compact">
  {children}
</AppearanceProvider>
```

Scoped panels (portaled overlays still inherit from `<html>` unless you set attributes there too):

```tsx
<AppearanceProvider appearance="terminal" density="compact" target="self">
  <LogViewer items={lines} />
</AppearanceProvider>
```

## What changes visually

Under `data-appearance="terminal"`:

- Fully sharp corners (`--radius: 0` and `border-radius: 0`; radios/spinner stay circular)
- Mono-first `--font-sans` (falls back to `--font-mono`)
- Density variables (`--density-control-h*`, `--density-pad*`) for compact chrome
- Control heights (Button, Input, Select, Tabs, Toggle) use those density vars
- Soft shadows removed on cards, overlays, menus, tooltips, tabs, checkboxes via `data-slot` rules
- ANSI 16 tokens (`--ansi-*`) plus `--cursor` / `--selection`, tone-matched to the brand palette

**Brand colors are not remapped.** Primary, secondary, status (`info`…`fatal`), surfaces, and charts stay the same as the default appearance for the active light/dark scheme (`globals.css`). Terminal only changes chrome geometry, typography, density, shadows, and ANSI/cursor helpers.

Components keep using semantic utilities (`bg-background`, `text-success`, …).

QA: Storybook **Themes / Terminal Appearance** gallery with toolbar Appearance × Density × Theme.

## New components

| Component | Role |
| --- | --- |
| `Kbd` | Keyboard shortcut chip |
| `Terminal` + `TitleBar` / `Body` / `Cursor` | Frame chrome |
| `Prompt` | CLI-style composer |
| `StatusBar` + segments | Persistent status strip |
| `LogViewer` / `LogLine` | Stream / log rows with levels |
| `AnsiText` | Minimal SGR → spans (`stripAnsi` helper) |

Composition example:

```tsx
<Terminal>
  <TerminalTitleBar title="qpub-server" />
  <TerminalBody className="p-0">
    <LogViewer items={lines} autoScroll />
  </TerminalBody>
  <Prompt prefix="$" onSubmit={run} />
  <StatusBar>
    <StatusBarSegment tone="success">● running</StatusBarSegment>
  </StatusBar>
</Terminal>
```

## Input adornments

```tsx
<Input startContent={<span>$</span>} placeholder="deploy" />
```

## Storybook

Toolbar: **Theme** (light/dark) × **Appearance** (default/terminal) × **Density** (comfortable/compact).

See **Themes / Terminal Appearance** and the new component stories under **Components/**.

## Accessibility

- Log levels always include a text label (`ERROR`, `WARN`, …), not color alone
- `LogViewer` supports opt-in `live="polite"` for streaming
- Cursor blink respects `prefers-reduced-motion`
- Prefer semantic status tokens for UI chrome; use ANSI tokens for stream content
