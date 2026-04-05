import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import zachhuxfordPreset from "./panda.preset";

const globalCss = defineGlobalStyles({
  "*": {
    fontFamily: "var(--font-montserrat), sans-serif",
    color: "oklch(1 0 0)",
  },
});

export default defineConfig({
  preflight: true,

  include: ["./src/**/*.{astro,ts,tsx}"],
  exclude: [],

  conditions: {
    darkTheme: "[data-theme=dark] &",
    purpleTheme: "[data-theme=purple] &",
  },

  presets: [zachhuxfordPreset],

  strictTokens: true,
  strictPropertyValues: true,
  globalCss,
  outdir: "styled-system",
});
