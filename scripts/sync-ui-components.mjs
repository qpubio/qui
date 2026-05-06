/**
 * Port qpub-website/components/ui → qui/src/components/<kebab>/<kebab>.tsx
 * Skips Button, Input, Card, Label (already in qui).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const QuiRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEBSITE_UI = "/Users/ali/Dev/qpub/qpub-website/components/ui";
const OUT = path.join(QuiRoot, "src/components");
const SKIP = new Set(["Button.tsx", "Input.tsx", "Card.tsx", "Label.tsx"]);

function pascalToKebab(stem) {
  return stem
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/** @typedef {Record<string,string>} StemMap */

function buildStemMap() {
  /** @type {StemMap} */
  const map = {};
  for (const f of fs.readdirSync(WEBSITE_UI)) {
    if (!f.endsWith(".tsx") || SKIP.has(f)) continue;
    map[path.basename(f, ".tsx")] = pascalToKebab(path.basename(f, ".tsx"));
  }
  return map;
}

const stemMap = buildStemMap();

function uiImportReplacement(specifier) {
  const m =
    specifier.match(/^@\/components\/ui\/([A-Za-z0-9_]+|\.\/[^:]+)$/) ||
    specifier.match(/^\.\/([A-Za-z0-9_]+)$/);
  if (!m) return null;
  const raw = m[1];
  if (raw.startsWith(".")) return null;

  /** @typedef {string} Stem */
  const stem = /** @type {string} */ (raw);
  const dir = stemMap[stem];
  if (!dir) {
    if (["Button", "Input", "Card", "Label"].includes(stem)) {
      const d = stem.toLowerCase();
      return `../${d}/${d}`;
    }
    console.warn("Unknown UI stem:", stem);
    return null;
  }
  return `../${dir}/${dir}`;
}

function transformSource(text, outFile) {
  let t = text;
  t = t.replace(/^"use client";\s*\n?/m, "");
  t = t.replace(/from ["']@\/lib\/utils["']/g, 'from "../../lib/utils"');

  t = t.replace(/from ["'](@\/components\/ui\/[A-Za-z0-9_]+|\.\/[A-Za-z0-9_]+)["']/g, (full, spec) => {
    const q = full.includes("'") ? "'" : '"';
    const inner = full.match(/["']([^"']+)["']/)?.[1];
    if (!inner) return full;
    if (inner.startsWith("@/components/ui/")) {
      const stem = inner.replace("@/components/ui/", "");
      const rep = uiImportReplacement(`@/components/ui/${stem}`);
      return rep ? `from ${q}${rep}${q}` : full;
    }
    if (inner.startsWith("./")) {
      const stem = inner.slice(2);
      const dir = stemMap[stem] ?? (["Button", "Input", "Card", "Label"].includes(stem) ? stem.toLowerCase() : null);
      if (dir) return `from ${q}../${dir}/${dir}${q}`;
    }
    return full;
  });

  return t;
}

function main() {
  for (const stem of Object.keys(stemMap).sort()) {
    const kebab = stemMap[stem];
    const srcPath = path.join(WEBSITE_UI, `${stem}.tsx`);
    const dir = path.join(OUT, kebab);
    const dest = path.join(dir, `${kebab}.tsx`);
    fs.mkdirSync(dir, { recursive: true });
    const raw = fs.readFileSync(srcPath, "utf8");
    const out = transformSource(raw, dest);
    fs.writeFileSync(dest, out, "utf8");
    console.log("Wrote", path.relative(QuiRoot, dest));
  }
}

main();
