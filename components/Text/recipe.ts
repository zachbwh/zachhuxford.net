import { defineRecipe } from "@pandacss/dev";

export const textRecipe = defineRecipe({
  className: "text",
  variants: {
    textStyle: {
      displayLg: {
        textStyle: "display-lg",
      },
      displayMd: {
        textStyle: "display-md",
      },
      displaySm: {
        textStyle: "display-sm",
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
});
