import * as React from "react";

/** True when `document.documentElement` has class `dark`. */
export function useDocumentDark() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return dark;
}
