import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(dirname, "../..");

const config: StorybookConfig = {
  stories: ["../../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(c) {
    return mergeConfig(c, {
      resolve: {
        alias: {
          "@qpub/qui": path.join(pkgRoot, "src/index.ts"),
        },
      },
    });
  },
};

export default config;
