# Terminal appearance

Terminal is a second **appearance language** for `@qpub/qui` — the same components and APIs, remapped design tokens. It is **not** a `variant` and not a parallel component library.

For **performance**, pair `data-appearance="terminal"` with the **`@qpub/qui/lite`** entry so motion / blur / shadow classes are absent from the delivered JS (and from Tailwind’s content scan). Appearance alone overrides at runtime; lite reduces what ships.

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

## Performance mode

| Goal | How |
| --- | --- |
| No transitions / animations | `terminal.css` kill-switch under `data-appearance="terminal"` (reduced-motion-equivalent for the subtree) |
| No backdrop blur / soft shadows | `terminal.css` + opaque overlay scrims |
| Smaller class surface / CSS | Import **`@qpub/qui/lite`** instead of `@qpub/qui` so components omit motion, elevation, and blur class strings |

```tsx
// Terminal apps that want lean delivery:
import { Button, Card, Dialog } from "@qpub/qui/lite";
```

Point Tailwind `content` at the lite package (or your app’s imports of it) so utilities like `animate-in` / `backdrop-blur-sm` are not generated when unused.

**Honest bounds:** lite does not remove Radix/React from the bundle. Do not claim “half the JS” from appearance alone. Snappier interaction comes from the CSS kill-switch; smaller CSS from the lite entry + app Tailwind scan.

## What changes visually

Under `data-appearance="terminal"`:

- Sharp corners via `--radius` / `--radius-*` set to `0` (preset uses those tokens; `rounded-full` stays circular)
- All UI text uses `--font-mono` (`--font-sans` remapped; `font-family` on the appearance root)
- Density variables (`--density-control-h*`, `--density-pad*`) for compact chrome
- Control heights (Button, Input, Select, Tabs, Toggle) use those density vars
- Soft shadows and backdrop blur removed; overlay scrims are opaque
- **No transitions or animations** (stronger than OS `prefers-reduced-motion`)
- ANSI 16 tokens (`--ansi-*`) plus `--cursor` / `--selection`, tone-matched to the brand palette

**Brand colors are not remapped.** Primary, secondary, status (`info`…`fatal`), surfaces, and charts stay the same as the default appearance for the active light/dark scheme (`globals.css`).

Components keep using semantic utilities (`bg-background`, `text-success`, …).

QA: Storybook **Themes / Terminal Appearance** gallery with toolbar Appearance × Density × Theme (full entry + CSS kill-switch).

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
- Terminal disables motion for the whole subtree (including cursor blink)
- Prefer semantic status tokens for UI chrome; use ANSI tokens for stream content
