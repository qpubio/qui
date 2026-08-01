import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, type Options } from "tsup";

const root = path.dirname(fileURLToPath(import.meta.url));
const chromeLite = path.join(root, "src/chrome/lite.ts");

const shared: Options = {
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  banner: {
    js: '"use client";',
  },
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".js" };
  },
};

export default defineConfig([
  {
    ...shared,
    entry: { index: "src/index.ts" },
    clean: true,
  },
  {
    ...shared,
    entry: { lite: "src/index.ts" },
    clean: false,
    esbuildOptions(options) {
      options.alias = {
        ...(options.alias as Record<string, string> | undefined),
        "#chrome": chromeLite,
      };
    },
  },
]);
