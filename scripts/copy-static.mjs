import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

await mkdir(dist, { recursive: true });
await copyFile(join(root, "src/styles/globals.css"), join(dist, "globals.css"));
console.log("Copied src/styles/globals.css -> dist/globals.css");

const themesDist = join(dist, "themes");
await mkdir(themesDist, { recursive: true });
await copyFile(
  join(root, "src/styles/themes/terminal.css"),
  join(themesDist, "terminal.css")
);
console.log("Copied src/styles/themes/terminal.css -> dist/themes/terminal.css");

for (const name of ["index.mjs", "index.js", "lite.mjs", "lite.js"]) {
  const file = join(dist, name);
  try {
    const body = await readFile(file, "utf8");
    if (/^["']use client["']\s*;?\s*\r?\n/.test(body)) continue;
    await writeFile(file, `"use client";\n${body}`, "utf8");
    console.log(`Prepended "use client" -> dist/${name}`);
  } catch {
    /* bundle not built */
  }
}
