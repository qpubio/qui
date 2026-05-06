import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "src", "components");

const skip = new Set(["button", "input", "card", "label"]);

/** export function Name */
const exportFunction = (src) => {
  const m = src.match(/export function ([A-Za-z0-9_]+)\s*\(/);
  return m?.[1];
};

/** First exported PascalCase symbol that is not `use*` */
const firstNamedExport = (src) => {
  const blocks = [...src.matchAll(/export \{([^}]+)\}/g)].map((x) => x[1]);
  const last = blocks[blocks.length - 1];
  if (!last) return null;
  const names = last
    .split(",")
    .map((s) => s.trim())
    .map((s) => (s.includes(" as ") ? s.split(/\s+as\s+/).pop().trim() : s))
    .filter(Boolean);
  return (
    names.find((n) => /^[A-Z]/.test(n) && !n.startsWith("use")) ?? names[0] ?? null
  );
};

const overrides = {
  "date-range-picker": "DateRangePicker",
};

for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  const dir = ent.name;
  if (skip.has(dir)) continue;

  const storyFile = path.join(root, dir, `${dir}.stories.tsx`);
  if (fs.existsSync(storyFile)) continue;

  const tsxFile = path.join(root, dir, `${dir}.tsx`);
  if (!fs.existsSync(tsxFile)) continue;

  const src = fs.readFileSync(tsxFile, "utf8");
  const fn = exportFunction(src);
  const named = firstNamedExport(src);
  const comp = overrides[dir] ?? fn ?? named;
  if (!comp) {
    console.warn("skip (no export):", dir);
    continue;
  }

  const title = `UI/${dir
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")}`;

  const story = `import type { Meta, StoryObj } from "@storybook/react";
import { ${comp} } from "@qpub/qui";

const meta = {
  title: "${title}",
  component: ${comp},
  parameters: { layout: "centered" },
} satisfies Meta<typeof ${comp}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Smoke: Story = {
  args: {} as Record<string, never>,
};
`;

  fs.writeFileSync(storyFile, story, "utf8");
  console.log("wrote", path.relative(process.cwd(), storyFile));
}
