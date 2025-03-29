import { cva, type RecipeVariantProps } from "@styled-system/css";
import { styled } from "@styled-system/jsx";

const textStyleRecipe = cva({
  variants: {
    textStyle: {
      display: {
        textStyle: "display",
      },
      body: {
        textStyle: "body",
      },
    },
  },
});

type TextVariants = RecipeVariantProps<typeof textStyleRecipe>;
type TextStyleVariants =
  | NonNullable<NonNullable<TextVariants>["textStyle"]>
  | "inherit";
type TextTags =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "strong"
  | "em";

export type TextProps = {
  children: React.ReactNode;
  textStyle: TextStyleVariants;
  as?: TextTags;
};

export const Text = ({ children, textStyle, as = "span" }: TextProps) => {
  const Tag = styled(as, textStyleRecipe);
  return (
    <Tag textStyle={textStyle !== "inherit" ? textStyle : undefined}>
      {children}
    </Tag>
  );
};
