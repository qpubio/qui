import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
