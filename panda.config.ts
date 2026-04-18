import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import websitePreset from "./panda.preset";

const globalCss = defineGlobalStyles({
  "*": {
    fontFamily: "var(--font-montserrat), sans-serif",
    color: "oklch(1 0 0)",
    _focusVisible: {
      outlineWidth: "2",
      outlineStyle: "solid",
      outlineColor: "foreground.on-main-accent",
    },
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

  presets: [websitePreset],

  strictTokens: true,
  strictPropertyValues: true,
  globalCss,
  outdir: "styled-system",
});
