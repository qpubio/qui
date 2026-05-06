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
);
