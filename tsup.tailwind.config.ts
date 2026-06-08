import { defineConfig } from "tsup";

export default defineConfig({
  entry: { "tailwind-preset": "tailwind.preset.ts" },
  format: ["cjs", "esm"],
  dts: true,
  clean: false,
  sourcemap: true,
  outDir: "dist",
  platform: "node",
  external: ["tailwindcss", "tailwindcss-animate"],
});
