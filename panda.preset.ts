import { definePreset, defineTextStyles } from "@pandacss/dev";

const textStyles = defineTextStyles({
  "display-2xl": {
    value: {
      fontFamily: "var(--font-karla), sans-serif",
      fontWeight: "600",
      fontSize: "80px",
      lineHeight: "1.2",
    },
  },
  "display-xl": {
    value: {
      fontFamily: "var(--font-karla), sans-serif",
      fontWeight: "600",
      fontSize: "68px",
      lineHeight: "1.2",
    },
  },
  "display-lg": {
    value: {
      fontFamily: "var(--font-karla), sans-serif",
      fontWeight: "600",
      fontSize: "56px",
      lineHeight: "1.2",
    },
  },
  "display-md": {
    value: {
      fontFamily: "var(--font-karla), sans-serif",
      fontWeight: "600",
      fontSize: "48px",
      lineHeight: "1.2",
    },
  },
  "display-sm": {
    value: {
      fontFamily: "var(--font-karla), sans-serif",
      fontWeight: "600",
      fontSize: "40px",
      lineHeight: "1.2",
    },
  },
  "display-xs": {
    value: {
      fontFamily: "var(--font-karla), sans-serif",
      fontWeight: "600",
      fontSize: "32px",
      lineHeight: "1.2",
    },
  },
  "heading-lg": {
    value: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: "500",
      fontSize: "28px",
      lineHeight: "1.5",
    },
  },
  "heading-md": {
    value: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: "500",
      fontSize: "24px",
      lineHeight: "1.5",
    },
  },
  "heading-sm": {
    value: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "1.5",
    },
  },
  body: {
    value: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "1.5",
    },
  },
  code: {
    value: {
      fontFamily: "var(--font-inconsolata), monospace",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "1.5",
    },
  },
});

export default definePreset({
  name: "website preset",
  theme: {
    extend: {
      textStyles,
      tokens: {
        colors: {
          black: {
            "0": { value: "oklch(0 0 0 / 0)" },
            "50": { value: "oklch(0 0 0 / 0.05)" },
            "100": { value: "oklch(0 0 0 / 0.1)" },
            "200": { value: "oklch(0 0 0 / 0.2)" },
            "300": { value: "oklch(0 0 0 / 0.3)" },
            "400": { value: "oklch(0 0 0 / 0.4)" },
            "500": { value: "oklch(0 0 0 / 0.5)" },
            "600": { value: "oklch(0 0 0 / 0.6)" },
            "700": { value: "oklch(0 0 0 / 0.7)" },
            "800": { value: "oklch(0 0 0 / 0.8)" },
            "900": { value: "oklch(0 0 0 / 0.9)" },
            "950": { value: "oklch(0 0 0 / 0.95)" },
            "1000": { value: "oklch(0 0 0)" },
          },
          white: {
            "0": { value: "oklch(1 0 0 / 0)" },
            "50": { value: "oklch(1 0 0 / 0.05)" },
            "100": { value: "oklch(1 0 0 / 0.1)" },
            "200": { value: "oklch(1 0 0 / 0.2)" },
            "300": { value: "oklch(1 0 0 / 0.3)" },
            "400": { value: "oklch(1 0 0 / 0.4)" },
            "500": { value: "oklch(1 0 0 / 0.5)" },
            "600": { value: "oklch(1 0 0 / 0.6)" },
            "700": { value: "oklch(1 0 0 / 0.7)" },
            "800": { value: "oklch(1 0 0 / 0.8)" },
            "900": { value: "oklch(1 0 0 / 0.9)" },
            "950": { value: "oklch(1 0 0 / 0.95)" },
            "1000": { value: "oklch(1 0 0)" },
          },
          emerald: {
            "50": { value: "oklch(.979 .021 166.113)" },
            "100": { value: "oklch(.95 .052 163.051)" },
            "200": { value: "oklch(.905 .093 164.15)" },
            "300": { value: "oklch(.845 .143 164.978)" },
            "400": { value: "oklch(.765 .177 163.223)" },
            "500": { value: "oklch(.696 .17 162.48)" },
            "600": { value: "oklch(.596 .145 163.225)" },
            "700": { value: "oklch(.508 .118 165.612)" },
            "800": { value: "oklch(.432 .095 166.913)" },
            "900": { value: "oklch(.378 .077 168.94)" },
            "950": { value: "oklch(.262 .051 172.552)" },
          },
          slate: {
            "50": { value: "oklch(.984 .003 247.858)" },
            "100": { value: "oklch(.968 .007 247.896)" },
            "200": { value: "oklch(.929 .013 255.508)" },
            "300": { value: "oklch(.869 .022 252.894)" },
            "400": { value: "oklch(.704 .04 256.788)" },
            "500": { value: "oklch(.554 .046 257.417)" },
            "600": { value: "oklch(.446 .043 257.281)" },
            "700": { value: "oklch(.372 .044 257.287)" },
            "800": { value: "oklch(.279 .041 260.031)" },
            "900": { value: "oklch(.208 .042 265.755)" },
            "950": { value: "oklch(.129 .042 264.695)" },
          },
          mauve: {
            "50": { value: "oklch(0.78 0.03 317.65)" },
            "100": { value: "oklch(0.73 0.03 317.65)" },
            "200": { value: "oklch(0.68 0.03 317.65)" },
            "300": { value: "oklch(0.53 0.03 317.65)" },
            "400": { value: "oklch(0.58 0.03 317.65)" },
            "500": { value: "oklch(0.53 0.03 317.65)" },
            "600": { value: "oklch(0.48 0.03 317.65)" },
            "700": { value: "oklch(0.43 0.03 317.65)" },
            "800": { value: "oklch(0.38 0.03 317.65)" },
            "900": { value: "oklch(0.33 0.03 317.65)" },
            "950": { value: "oklch(0.28 0.03 317.65)" },
          },
        },
        spacing: {
          "0": { value: "0px" },
          "1": { value: "4px" },
          "2": { value: "8px" },
          "3": { value: "12px" },
          "4": { value: "16px" },
          "5": { value: "20px" },
          "6": { value: "24px" },
          "7": { value: "28px" },
          "8": { value: "32px" },
          "9": { value: "36px" },
          "10": { value: "40px" },
          "11": { value: "44px" },
          "12": { value: "48px" },
          "13": { value: "52px" },
          "14": { value: "56px" },
          "15": { value: "60px" },
          "16": { value: "64px" },
          "17": { value: "68px" },
          "18": { value: "72px" },
          "19": { value: "76px" },
          "20": { value: "80px" },
          max: { value: "9999px" },
        },
        sizes: {
          "0": { value: "0px" },
          "1": { value: "4px" },
          "2": { value: "8px" },
          "3": { value: "12px" },
          "4": { value: "16px" },
          "5": { value: "20px" },
          "6": { value: "24px" },
          "7": { value: "28px" },
          "8": { value: "32px" },
          "9": { value: "36px" },
          "10": { value: "40px" },
          "11": { value: "44px" },
          "12": { value: "48px" },
          "13": { value: "52px" },
          "14": { value: "56px" },
          "15": { value: "60px" },
          "16": { value: "64px" },
          "17": { value: "68px" },
          "18": { value: "72px" },
          "19": { value: "76px" },
          "20": { value: "80px" },
          max: { value: "9999px" },
        },
        radii: {
          "0": { value: "0px" },
          "1": { value: "4px" },
          "2": { value: "8px" },
          "3": { value: "12px" },
          "4": { value: "16px" },
          "5": { value: "20px" },
          "6": { value: "24px" },
          "7": { value: "28px" },
          "8": { value: "32px" },
          max: { value: "9999px" },
        },
        shadows: {
          sm: { value: "oklch(0 0 0 / 0.3) 0px 4px 12px" },
          lg: { value: "oklch(0 0 0 / 0.3) 0px 8px 16px" },
        },
      },
      semanticTokens: {
        colors: {
          foreground: {
            "on-main-accent": { value: "oklch(1 0 0)" },
            "secondary-accent": { value: "oklch(.508 .118 165.612)" },
          },
          background: {
            "main-accent": {
              value: {
                _purpleTheme: "oklch(0.43 0.03 317.65)",
                _darkTheme: "oklch(.208 .042 265.755)",
              },
            },
            primary: {
              value: {
                _purpleTheme: "oklch(0.73 0.03 317.65)",
                _darkTheme: "oklch(.968 .007 247.896)",
              },
            },
            "primary-hover": {
              value: {
                _purpleTheme: "oklch(0.68 0.03 317.65)",
                _darkTheme: "oklch(.929 .013 255.508)",
              },
            },
            "primary-active": {
              value: {
                _purpleTheme: "oklch(0.53 0.03 317.65)",
                _darkTheme: "oklch(.869 .022 252.894)",
              },
            },
            secondary: {
              value: {
                _purpleTheme: "oklch(0 0 0 / 0)",
                _darkTheme: "oklch(1 0 0 / 0)",
              },
            },
            "secondary-hover": {
              value: {
                _purpleTheme: "oklch(0 0 0 / 0.1)",
                _darkTheme: "oklch(1 0 0 / 0.1)",
              },
            },
            "secondary-active": {
              value: {
                _purpleTheme: "oklch(0 0 0 / 0.2)",
                _darkTheme: "oklch(1 0 0 / 0.2)",
              },
            },
          },
        },
        borders: {
          outline: {
            value: {
              _purpleTheme: "4px solid oklch(0.58 0.03 317.65)",
              _darkTheme: "4px solid oklch(.554 .046 257.417)",
            },
          },
        },
      },
    },
  },
});
