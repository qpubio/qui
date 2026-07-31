import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../../src/styles/globals.css";
import "../../src/styles/themes/terminal.css";
import "./storybook-fonts.css";

function AppearanceFrame({
  appearance,
  density,
  children,
}: {
  appearance: string;
  density: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const root = document.documentElement;
    if (appearance === "terminal") {
      root.setAttribute("data-appearance", "terminal");
    } else {
      root.removeAttribute("data-appearance");
    }
    if (density === "compact") {
      root.setAttribute("data-density", "compact");
    } else {
      root.removeAttribute("data-density");
    }
  }, [appearance, density]);

  // Inherit tokens from <html>; do not set data-appearance on this wrapper
  // (avoids light-terminal rules winning over dark scheme on a child root).
  return (
    <div className="min-h-screen bg-background text-foreground p-4">{children}</div>
  );
}

const withAppearance: Decorator = (Story, context) => {
  const appearance = (context.globals.appearance as string) || "default";
  const density = (context.globals.density as string) || "comfortable";
  return (
    <AppearanceFrame appearance={appearance} density={density}>
      <Story />
    </AppearanceFrame>
  );
};

const preview: Preview = {
  globalTypes: {
    appearance: {
      description: "Design appearance language",
      toolbar: {
        title: "Appearance",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "terminal", title: "Terminal" },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: "Control density",
      toolbar: {
        title: "Density",
        icon: "collapse",
        items: [
          { value: "comfortable", title: "Comfortable" },
          { value: "compact", title: "Compact" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    appearance: "default",
    density: "comfortable",
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
    withAppearance,
  ],
  parameters: {
    layout: "padded",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
