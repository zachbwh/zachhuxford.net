import {
  defineConfig,
  defineGlobalStyles,
  defineTextStyles,
  type SemanticTokens,
} from "@pandacss/dev";
import tokensDark from "@design-tokens/js/dark/tokens";
import tokensBase from "@design-tokens/js/purple/tokens";

import tokensPandaDark from "@design-tokens/js/dark/tokens-panda";
import tokensPandaPurple from "@design-tokens/js/purple/tokens-panda";

import { textRecipe } from "@components/Text/recipe";

type RecursiveSemanticToken = SemanticTokens[keyof SemanticTokens];
const mergeSemanticTokens = (
  themedSemanticTokens: { name: string; tokens: SemanticTokens }[]
) => {
  const _mergeRecursiveSemanticTokens = (
    name: string,
    obj: RecursiveSemanticToken,
    mergedTokens: NonNullable<RecursiveSemanticToken>
  ) => {
    if (!obj) {
      return mergedTokens;
    }
    Object.keys(obj).forEach((key) => {
      if (key === "value") {
        if (!mergedTokens.value) {
          mergedTokens.value = {};
        }
        if (typeof mergedTokens.value === "object") {
          // @ts-ignore
          mergedTokens.value[`_${name}`] = obj[key];
        }
      }

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        if (!mergedTokens[key]) {
          mergedTokens[key] = {} as NonNullable<RecursiveSemanticToken>;
        }
        // @ts-ignore
        _mergeRecursiveSemanticTokens(name, obj[key], mergedTokens[key]);
      }
    });

    return mergedTokens;
  };
  return themedSemanticTokens.reduce((acc, { name, tokens }) => {
    return Object.entries(tokens).reduce((acc, [key, recursiveToken]) => {
      const mergedRecursiveToken: RecursiveSemanticToken =
        acc[key as keyof SemanticTokens] || {};
      _mergeRecursiveSemanticTokens(name, recursiveToken, mergedRecursiveToken);
      // @ts-ignore
      acc[key as keyof SemanticTokens] = mergedRecursiveToken;
      return acc;
    }, acc);
  }, {} as SemanticTokens);
};

const mergedSemanticTokens = mergeSemanticTokens([
  { name: "darkTheme", tokens: tokensPandaDark["semantic-tokens"] },
  { name: "purpleTheme", tokens: tokensPandaPurple["semantic-tokens"] },
]);

const globalCss = defineGlobalStyles({
  // Maybe figure out a better way of handling icons
  ".lucide": {
    display: "inline-block",
  },
});

type PandaTextStyle = {
  value: {
    fontFamily: string;
    fontWeight: string;
    fontSize: string;
    lineHeight: string;
  };
};

const typographyTokens = Object.entries(tokensDark.text.typography);
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

    // @ts-ignore
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
  include: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./mdx-components.tsx",
  ],

  // Files to exclude
  exclude: [],

  conditions: {
    darkTheme: "[data-theme=dark] &",
    purpleTheme: "[data-theme=purple] &",
  },

  theme: {
    textStyles,
    tokens: {
      colors: {
        ...tokensPandaDark.colors,
      },
      spacing: {
        ...tokensPandaDark.dimensions,
      },
      sizes: {
        ...tokensPandaDark.dimensions,
      },
      borders: { ...tokensPandaDark.borders },
      radii: { ...tokensPandaDark.dimensions },
    },
    semanticTokens: mergedSemanticTokens,
    extend: {
      recipes: {
        text: textRecipe,
      },
    },
  },
  strictTokens: true,
  strictPropertyValues: true,

  globalCss,

  jsxFramework: "react",

  outdir: "styled-system",
});
