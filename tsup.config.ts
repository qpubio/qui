import { defineConfig } from "tsup";

const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "@radix-ui/react-slot",
  "@radix-ui/react-label",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    target: "es2022",
    outDir: "dist",
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
    external,
  },
  {
    entry: { "tailwind-preset": "tailwind.preset.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    sourcemap: true,
    outDir: "dist",
    platform: "node",
    banner: {},
    external: ["tailwindcss", "tailwindcss-animate"],
  },
]);
