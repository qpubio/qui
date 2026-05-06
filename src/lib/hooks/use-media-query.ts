import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      const listener = (): void => onStoreChange();
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    },
    [query],
  );

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
