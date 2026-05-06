// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslint from "@eslint/js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginReactHooks.configs.flat["recommended-latest"],
  {
    ignores: ["dist/**", "docs/storybook-static/**", "*.cjs", "docs/.storybook/**", "scripts/**"],
  },
  storybook.configs["flat/recommended"]
);
