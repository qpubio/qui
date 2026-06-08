#!/usr/bin/env node
/**
 * Rewrite UI imports to `@qpub/qui`:
 * - `import … from "@/components/ui/<PascalName>"` when <PascalName> is shipped from this package
 * - `import … from "./<PascalName>"` inside `<root>/components/ui/**` for the same stems (sibling UI files)
 *
 * App-only modules stay on `components/ui/` and are not in `QUI_UI_STEMS` (see MIGRATION.md).
 *
 * Default: print diffs only. Use `--write` to save source edits and/or package.json (--sync-peers).
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const QUI_TARGET = "@qpub/qui";

/**
 * Every `components/ui/<Name>.tsx` stem that @qpub/qui re-exports. Keep in sync with this package.
 * When you add a component to `qui` and ship it, append here (and add the file to the consumer app
 * delete list in MIGRATION.md if needed).
 */
const QUI_UI_STEMS = new Set([
  "Alert",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Card",
  "Checkbox",
  "Code",
  "Collapsible",
  "Command",
  "CopyButton",
  "DateRangePicker",
  "Dialog",
  "Drawer",
  "DropdownMenu",
  "Input",
  "Label",
  "NavigationMenu",
  "Popover",
  "Progress",
  "RadioGroup",
  "Resizable",
  "ScrollArea",
  "SecretText",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Spinner",
  "Table",
  "Tabs",
  "Toaster",
  "Toggle",
  "ToggleGroup",
  "Tooltip",
]);

const ALIAS_UI_RE = /^@\/components\/ui\/([A-Za-z][a-zA-Z0-9]*)$/;
/** Sibling imports only: `./Button`, not `./foo/bar` */
const REL_SIBLING_RE = /^\.\/([A-Za-z][a-zA-Z0-9]*)$/;

function parseCli() {
  let write = false;
  let syncPeers = false;
  /** @type {string | undefined} */
  let quiPackage;
  let root = process.cwd();
  let roots = ["app", "components", "pages", "src"];
  const ignoreDirs = new Set([
    "node_modules",
    ".next",
    ".turbo",
    ".git",
    ".vercel",
    "dist",
    "coverage",
    "storybook-static",
  ]);

  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`Usage: node scripts/qui-migrate-imports.mjs [options]

Rewrite @/components/ui/<Component> (and ./<Component> inside components/ui/)
imports to "@qpub/qui" for every stem shipped by @qpub/qui.

Options:
  --write             Apply edits (default: dry-run diffs only)
  --sync-peers        Merge missing @qpub/qui peerDependencies into the app's package.json dependencies
                      (see MIGRATION.md — peers are expected in the host app, not bundled into qui)
  --qui-package PATH  Force path to @qpub/qui package.json (else node_modules/@qpub/qui, else ../qui)
  --root <dir>        Project root to scan (default: cwd)
  --roots <list>      Comma-separated top-level dirs under root (default: app,components,pages,src)
  --ignore <list>     Extra directory names to skip while walking
`);
    process.exit(0);
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--write") write = true;
    else if (a === "--sync-peers") syncPeers = true;
    else if (a === "--qui-package") quiPackage = argv[++i];
    else if (a === "--root") root = argv[++i] ?? root;
    else if (a === "--roots") {
      roots = (argv[++i] ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === "--ignore") {
      for (const p of (argv[++i] ?? "").split(",").map((s) => s.trim())) {
        if (p) ignoreDirs.add(p);
      }
    }
  }
  return { write, syncPeers, quiPackage, root, roots, ignoreDirs };
}

function isUnderComponentsUi(absFile, root) {
  const ui = path.normalize(path.join(root, "components", "ui"));
  const f = path.normalize(absFile);
  return f.startsWith(`${ui}${path.sep}`);
}

function targetModuleForSpecifier(mod, absFile, root) {
  const alias = ALIAS_UI_RE.exec(mod);
  if (alias) {
    const stem = alias[1];
    return QUI_UI_STEMS.has(stem) ? QUI_TARGET : null;
  }
  if (!isUnderComponentsUi(absFile, root)) return null;
  const rel = REL_SIBLING_RE.exec(mod);
  if (!rel) return null;
  const stem = rel[1];
  return QUI_UI_STEMS.has(stem) ? QUI_TARGET : null;
}

async function resolveQuiPackageJson(root, override) {
  const candidates = [];
  if (override) candidates.push(path.resolve(override));
  candidates.push(path.join(root, "node_modules", "@qpub", "qui", "package.json"));
  candidates.push(path.resolve(path.join(root, "..", "qui", "package.json")));
  for (const p of candidates) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    "Could not find @qpub/qui package.json. Install @qpub/qui in the app, use a sibling ../qui repo, or pass --qui-package /path/to/qui/package.json",
  );
}

/** @param {Record<string, unknown>} pkg */
function collectDeclaredDependencyNames(pkg) {
  const names = new Set();
  for (const key of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    const block = pkg[key];
    if (block && typeof block === "object") {
      for (const n of Object.keys(block)) names.add(n);
    }
  }
  return names;
}

/**
 * Add any missing @qpub/qui peerDependencies to the app's `dependencies`.
 * Peers are not bundled into the published library; npm expects the host app to install them.
 */
async function runSyncPeers({ root, write, quiPackage }) {
  const consumerPath = path.join(root, "package.json");
  const quiPath = await resolveQuiPackageJson(root, quiPackage);
  const [consumerRaw, quiRaw] = await Promise.all([
    fs.readFile(consumerPath, "utf8"),
    fs.readFile(quiPath, "utf8"),
  ]);
  const consumer = JSON.parse(consumerRaw);
  const qui = JSON.parse(quiRaw);
  const peers = qui.peerDependencies;
  if (!peers || typeof peers !== "object") {
    console.error("(sync-peers) @qpub/qui has no peerDependencies.");
    return;
  }

  const declared = collectDeclaredDependencyNames(consumer);
  consumer.dependencies ??= {};

  /** @type {string[]} */
  const added = [];
  /** @type {string[]} */
  const skipped = [];

  for (const [name, range] of Object.entries(peers)) {
    if (!range || typeof range !== "string") continue;
    if (name === "@qpub/qui") continue;
    if (declared.has(name)) {
      skipped.push(name);
      continue;
    }
    consumer.dependencies[name] = range;
    declared.add(name);
    added.push(`${name} (${range})`);
  }

  const sortedDeps = {};
  for (const k of Object.keys(consumer.dependencies).sort()) sortedDeps[k] = consumer.dependencies[k];
  consumer.dependencies = sortedDeps;

  const nextRaw = `${JSON.stringify(consumer, null, 2)}\n`;

  console.log(`\n(sync-peers) Using stems from ${path.relative(process.cwd(), quiPath) || quiPath}`);
  if (added.length === 0) {
    console.log("(sync-peers) All peer packages already declared in the app's package.json.");
    return;
  }
  console.log(`Would add ${added.length} entr(y/ies) to dependencies:`);
  for (const line of added) console.log(`  + ${line}`);
  if (skipped.length) console.log(`Already declared (left unchanged): ${skipped.join(", ")}`);
  if (!write) {
    console.log(
      "\nDry-run: package.json not modified. Repeat with --write to apply (imports and sync-peers both respect --write when passed).",
    );
    return;
  }
  await fs.writeFile(consumerPath, nextRaw, "utf8");
  console.log(`\nUpdated ${path.relative(process.cwd(), consumerPath) || consumerPath}`);
}

async function walkDir(dir, ignoreDirs, visitor) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      await walkDir(full, ignoreDirs, visitor);
      continue;
    }
    if (!/\.tsx?$/.test(entry.name)) continue;
    await visitor(full);
  }
}

function moduleText(spec) {
  if (ts.isStringLiteral(spec) || ts.isNoSubstitutionTemplateLiteral(spec)) return spec.text;
  return "";
}

function remapLegacyImport(decl, factory, root, absPath) {
  const mod = moduleText(decl.moduleSpecifier);
  const next = targetModuleForSpecifier(mod, absPath, root);
  if (!next) return decl;
  return factory.updateImportDeclaration(
    decl,
    decl.modifiers,
    decl.importClause,
    factory.createStringLiteral(next),
    decl.attributes,
  );
}

function specifierKey(el) {
  if (!ts.isImportSpecifier(el)) return el.getText();
  if (el.propertyName) return `${el.propertyName.text} as ${el.name.text}`;
  return el.name.text;
}

function mergeQuiGroup(decls, factory, typeOnly) {
  if (decls.length === 1) return decls[0];
  const seen = new Set();
  /** @type {ts.ImportSpecifier[]} */
  const specs = [];
  for (const decl of decls) {
    const clause = decl.importClause;
    if (!clause?.namedBindings || !ts.isNamedImports(clause.namedBindings)) {
      return decls[0];
    }
    for (const el of clause.namedBindings.elements) {
      if (!ts.isImportSpecifier(el)) continue;
      const k = specifierKey(el);
      if (seen.has(k)) continue;
      seen.add(k);
      specs.push(el);
    }
  }
  const named = factory.createNamedImports(specs);
  const importClause = factory.createImportClause(typeOnly, undefined, named);
  return factory.createImportDeclaration(
    undefined,
    importClause,
    factory.createStringLiteral(QUI_TARGET),
    undefined,
  );
}

function migrateSourceText(text, fileNameAbs, root) {
  const scriptKind = fileNameAbs.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(fileNameAbs, text, ts.ScriptTarget.Latest, true, scriptKind);
  const factory = ts.factory;

  let touched = false;

  /** @type {ts.Statement[]} */
  const rebuilt = [];
  /** @type {ts.ImportDeclaration[]} */
  let quiBuf = [];
  /** @type {boolean | null} */
  let bufIsTypeOnly = null;

  function flushQuiBuf() {
    if (quiBuf.length === 0) return;
    if (quiBuf.length === 1) {
      rebuilt.push(quiBuf[0]);
    } else {
      rebuilt.push(mergeQuiGroup(quiBuf, factory, bufIsTypeOnly === true));
      touched = true;
    }
    quiBuf = [];
    bufIsTypeOnly = null;
  }

  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt)) {
      flushQuiBuf();
      rebuilt.push(stmt);
      continue;
    }

    const decl = remapLegacyImport(stmt, factory, root, fileNameAbs);
    const oldMod = moduleText(stmt.moduleSpecifier);
    const newMod = moduleText(decl.moduleSpecifier);
    if (oldMod !== newMod) touched = true;

    if (newMod !== QUI_TARGET) {
      flushQuiBuf();
      rebuilt.push(decl);
      continue;
    }
    const isTypeOnly = decl.importClause?.isTypeOnly === true;
    if (quiBuf.length > 0 && bufIsTypeOnly !== null && bufIsTypeOnly !== isTypeOnly) flushQuiBuf();
    if (quiBuf.length === 0) bufIsTypeOnly = isTypeOnly;
    quiBuf.push(decl);
  }
  flushQuiBuf();

  if (!touched) return text;

  const newSf = ts.factory.updateSourceFile(
    sf,
    rebuilt,
    sf.isDeclarationFile,
    sf.referencedFiles,
    sf.typeReferenceDirectives,
    sf.hasNoDefaultLib,
    sf.libReferenceDirectives,
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(newSf);
}

function printDiff(rel, before, after) {
  if (before === after) return;
  console.log(`\n--- ${rel}\n`);
  const b = before.split("\n");
  const a = after.split("\n");
  const n = Math.max(b.length, a.length);
  for (let i = 0; i < n; i++) {
    const bl = b[i];
    const al = a[i];
    if (bl !== al) {
      if (bl !== undefined) console.log(`-${bl}`);
      if (al !== undefined) console.log(`+${al}`);
    }
  }
}

async function main() {
  const { write, syncPeers, quiPackage, root, roots, ignoreDirs } = parseCli();

  if (syncPeers) {
    try {
      await runSyncPeers({ root, write, quiPackage });
    } catch (e) {
      console.error("(sync-peers) failed:", e instanceof Error ? e.message : e);
      process.exit(1);
    }
  }

  let changed = 0;
  for (const sub of roots) {
    const base = path.join(root, sub);
    await walkDir(base, ignoreDirs, async (abs) => {
      const raw = await fs.readFile(abs, "utf8");
      const rel = path.relative(root, abs);
      let next;
      try {
        next = migrateSourceText(raw, abs, root);
      } catch (e) {
        console.error(`Skip (parse error) ${rel}:`, e);
        return;
      }
      if (next === raw) return;
      printDiff(rel, raw, next);
      if (write) {
        await fs.writeFile(abs, next, "utf8");
        changed += 1;
      }
    });
  }
  if (write) {
    if (changed) console.log(`\nImport migration: wrote ${changed} file(s).`);
  } else if (changed === 0 && !syncPeers) {
    console.log("\nNo import changes. Use --write to apply when diffs are shown above.");
  } else if (!write && changed > 0) {
    console.log("\nImport migration: dry run (no source files written). Use --write to apply.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
