import { defineRecipe } from "@pandacss/dev";

export const textRecipe = defineRecipe({
  className: "text",
  variants: {
    textStyle: {
      display2xl: {
        textStyle: "display-2xl",
      },
      displayXl: {
        textStyle: "display-xl",
      },
      displayLg: {
        textStyle: "display-lg",
      },
      displayMd: {
        textStyle: "display-md",
      },
      displaySm: {
        textStyle: "display-sm",
      },
      displayXs: {
        textStyle: "display-xs",
      },
      headingLg: {
        textStyle: "heading-lg",
      },
      headingMd: {
        textStyle: "heading-md",
      },
      headingSm: {
        textStyle: "heading-sm",
      },
      body: {
        textStyle: "body",
      },
      inherit: {
        textStyle: "inherit",
      },
    },
    color: {
      onMainAccent: {
        color: "foreground.on-main-accent",
      },
      secondaryAccent: {
        color: "foreground.secondary-accent",
      },
    },
  },
  defaultVariants: {
    color: "onMainAccent",
  },
});
