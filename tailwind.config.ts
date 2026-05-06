import type { Config } from "tailwindcss";

import preset from "./tailwind.preset";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [preset],
} satisfies Config;
