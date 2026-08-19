# Changelog

## [0.5.1] - 2026-08-20

### Fixed

- `Switch` default color variant now uses the neutral `default` track (`bg-foreground`) instead of `primary`

## [0.5.0] - 2026-08-11

### Added

- `Switch` form control (`Switch`, `switchVariants`) with color/size variants; Storybook stories under Components/Switch
- Peer dependency `@radix-ui/react-switch`
- Terminal appearance: suppress box-shadow on `[data-slot="switch"]`

## [0.4.0] - 2026-08-07

### Added

- `Typography` primitives (`H1`–`H6`, `P`, `Ul`, `Ol`, `Li`, `Quote`, `CodeBlock`, `InlineCode`, `TextLink`, `Divider`) plus exported `typographyClasses` for className-based consumers (e.g. rich-text theme maps)

## [0.3.0] - 2026-08-07

### Added

- `Textarea` form control (mirrors `Input`: variant/color/size, label, invalid/error/helper); Storybook stories under Components/Textarea

## [0.2.1] - 2026-08-05

### Fixed

- Select trigger overflow: long `SelectValue` text now truncates inside the trigger; chevron stays within the border

## [0.2.0] - 2026-08-01

### Added

- Terminal appearance (`data-appearance="terminal"`, `themes/terminal.css`)
- Terminal composites: Kbd, Terminal, Prompt, StatusBar, LogViewer, AnsiText
- `@qpub/qui/lite` entry (lean chrome: no motion/blur/shadow class strings)
- DateTimePicker (+ related date exports as shipped)
- AppearanceProvider / density hooks; Storybook Appearance × Density toolbar
- Interactive Storybook demos (Progress task, CopyButton feedback, Skeleton→content, Spinner async)

### Changed

- Card section-owned spacing (`px-4 py-4`, no doubled border pads)
- Terminal: mono typography, sharp radius tokens, motion/blur kill-switch, opaque overlays
- Theming docs (`docs/terminal.md`, `docs/theming.md`)

## [0.1.1] - 2026-06-13

### Added

- Initial `@qpub/qui` primitives (Button, Card, Input, overlays, etc.)
- Storybook, Tailwind preset, `globals.css`
- CI + npm Trusted Publishing workflows
- Migration guide / README / theming foundation

### Fixed

- npm Trusted Publishing (Node 24, `.npmrc` auth cleanup)
- Client-boundary `"use client"` coverage for Next.js

[0.5.0]: https://github.com/qpubio/qui/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/qpubio/qui/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/qpubio/qui/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/qpubio/qui/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/qpubio/qui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/qpubio/qui/compare/646415f...v0.1.1
