"use client";

import * as React from "react";

export type Appearance = "default" | "terminal";
export type Density = "comfortable" | "compact";

export type AppearanceState = {
  appearance: Appearance;
  density: Density;
};

const AppearanceContext = React.createContext<AppearanceState | null>(null);

function readAppearance(el: HTMLElement): Appearance {
  const value = el.getAttribute("data-appearance");
  return value === "terminal" ? "terminal" : "default";
}

function readDensity(el: HTMLElement): Density {
  const value = el.getAttribute("data-density");
  return value === "compact" ? "compact" : "comfortable";
}

function readDocumentAppearance(): AppearanceState {
  if (typeof document === "undefined") {
    return { appearance: "default", density: "comfortable" };
  }
  const root = document.documentElement;
  return {
    appearance: readAppearance(root),
    density: readDensity(root),
  };
}

/**
 * Reads appearance/density from the nearest `AppearanceProvider`,
 * otherwise from `document.documentElement` attributes.
 */
export function useAppearance(): AppearanceState {
  const ctx = React.useContext(AppearanceContext);
  const [docState, setDocState] = React.useState<AppearanceState>(readDocumentAppearance);

  React.useEffect(() => {
    if (ctx) return;
    const root = document.documentElement;
    const read = () => setDocState(readDocumentAppearance());
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, {
      attributes: true,
      attributeFilter: ["data-appearance", "data-density"],
    });
    return () => obs.disconnect();
  }, [ctx]);

  return ctx ?? docState;
}

type AppearanceProviderProps = {
  appearance?: Appearance;
  density?: Density;
  /** Element to set attributes on. Defaults to `document.documentElement`. */
  target?: "html" | "self";
  className?: string;
  children: React.ReactNode;
};

/**
 * Thin helper that sets `data-appearance` / `data-density` on a root.
 * Does not inject styles — import `@qpub/qui/themes/terminal.css` for terminal tokens.
 */
export function AppearanceProvider({
  appearance = "default",
  density = "comfortable",
  target = "html",
  className,
  children,
}: AppearanceProviderProps) {
  const value = React.useMemo(
    () => ({ appearance, density }),
    [appearance, density]
  );

  React.useEffect(() => {
    if (target !== "html") return;
    const root = document.documentElement;
    if (appearance === "default") {
      root.removeAttribute("data-appearance");
    } else {
      root.setAttribute("data-appearance", appearance);
    }
    if (density === "comfortable") {
      root.removeAttribute("data-density");
    } else {
      root.setAttribute("data-density", density);
    }
  }, [appearance, density, target]);

  const tree =
    target === "self" ? (
      <div
        className={className}
        data-appearance={appearance === "default" ? undefined : appearance}
        data-density={density === "comfortable" ? undefined : density}
      >
        {children}
      </div>
    ) : (
      children
    );

  return (
    <AppearanceContext.Provider value={value}>{tree}</AppearanceContext.Provider>
  );
}
