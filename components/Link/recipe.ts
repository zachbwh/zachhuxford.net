import { defineRecipe } from "@pandacss/dev";

export const linkRecipe = defineRecipe({
  className: "link",
  base: {
    _hover: {
      textDecoration: "underline",
    },
  },
});
