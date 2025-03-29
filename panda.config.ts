import { defineConfig, defineTextStyles } from "@pandacss/dev";
import tokensDark from "@design-tokens/js/dark/tokens";
import tokensPurple from "@design-tokens/js/purple/tokens";

import tokensPandaDark from "@design-tokens/js/dark/tokens-panda";
import tokensPandaPurple from "@design-tokens/js/purple/tokens-panda";

const typographyTokens = Object.entries(tokensDark.text.typography);

type PandaTextStyle = {
  value: {
    fontFamily: string;
    fontWeight: string;
    fontSize: string;
    lineHeight: string;
  };
};

const textStyleDefinitions = typographyTokens.reduce(
  (acc, [name, designToken]) => {
    const designTokenValue = designToken.$value;
    const pandaTextStyle = {
      value: {
        fontFamily: designTokenValue.fontFamily,
        fontWeight: designTokenValue.fontWeight,
        fontSize: designTokenValue.fontSize,
        lineHeight: designTokenValue.lineHeight,
      },
    };

    acc[name] = pandaTextStyle;

    return acc;
  },
  {} as Record<string, PandaTextStyle>
);

const textStyles = defineTextStyles(textStyleDefinitions);

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  conditions: {
    darkTheme: "[data-theme=dark] &",
    purpleTheme: "[data-theme=purple] &",
  },

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      tokens: {
        colors: {
          ...tokensPandaDark.colors,
        },
      },
    },
    semanticTokens: {
      ...tokensPandaPurple["semantic-tokens"],
    },
  },

  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",
});
