import { defineRecipe } from "@pandacss/dev";

export const textRecipe = defineRecipe({
  className: "text",
  variants: {
    textStyle: {
      display: {
        textStyle: "display-lg",
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
