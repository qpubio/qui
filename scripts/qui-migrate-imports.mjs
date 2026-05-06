#!/usr/bin/env node
/**
 * Migrate `@/components/ui/{Button,Input,Card,Label}` → `@qpub/qui`.
 * Default: print diffs only. Use `--write` to save.
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const LEGACY_UI_RE = /^@\/components\/ui\/(Button|Input|Card|Label)$/;
const QUI_LITERAL = "@qpub/qui";

function parseCli() {
  let write = false;
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
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    if (a === "--write") write = true;
    else if (a === "--root") root = process.argv[++i] ?? root;
    else if (a === "--roots") {
      roots = (process.argv[++i] ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === "--ignore") {
      for (const p of (process.argv[++i] ?? "").split(",").map((s) => s.trim())) {
        if (p) ignoreDirs.add(p);
      }
    }
  }
  return { write, root, roots, ignoreDirs };
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

function remapLegacyImport(decl, factory) {
  const mod = moduleText(decl.moduleSpecifier);
  if (!LEGACY_UI_RE.test(mod)) return decl;
  return factory.updateImportDeclaration(
    decl,
    decl.modifiers,
    decl.importClause,
    factory.createStringLiteral(QUI_LITERAL),
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
    factory.createStringLiteral(QUI_LITERAL),
    undefined,
  );
}

function sequentialMerge(importDecls, factory) {
  /** @type {ts.ImportDeclaration[]} */
  const out = [];
  /** @type {ts.ImportDeclaration[]} */
  let buf = [];
  /** @type {boolean | null} */
  let bufType = null;

  function flush() {
    if (buf.length === 0) return;
    out.push(mergeQuiGroup(buf, factory, bufType === true));
    buf = [];
    bufType = null;
  }

  for (const d of importDecls) {
    const mod = moduleText(d.moduleSpecifier);
    if (mod !== QUI_LITERAL) {
      flush();
      out.push(d);
      continue;
    }
    const isType = d.importClause?.isTypeOnly === true;
    if (buf.length && bufType !== null && bufType !== isType) flush();
    if (buf.length === 0) bufType = isType;
    buf.push(d);
  }
  flush();
  return out;
}

function migrateSourceText(text, fileName) {
  const scriptKind = fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKind);
  const stmts = [...sf.statements];
  let k = 0;
  while (k < stmts.length && ts.isImportDeclaration(stmts[k])) k++;
  const leading = stmts.slice(0, k);
  const tail = stmts.slice(k);
  const factory = ts.factory;
  const remapped = leading.map((stmt) => remapLegacyImport(/** @type {ts.ImportDeclaration} */ (stmt), factory));
  const mergedLeading = sequentialMerge(remapped, factory);
  const newSf = ts.factory.updateSourceFile(
    sf,
    [...mergedLeading, ...tail],
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
  const { write, root, roots, ignoreDirs } = parseCli();
  let changed = 0;
  for (const sub of roots) {
    const base = path.join(root, sub);
    await walkDir(base, ignoreDirs, async (abs) => {
      const raw = await fs.readFile(abs, "utf8");
      const rel = path.relative(root, abs);
      let next;
      try {
        next = migrateSourceText(raw, abs);
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
    if (changed) console.log(`\nWrote ${changed} file(s).`);
  } else {
    console.log("\nDry run (no files written). Use --write to apply.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
