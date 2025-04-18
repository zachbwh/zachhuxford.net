import { cva, type RecipeVariantProps } from "@styled-system/css";
import { styled } from "@styled-system/jsx";

const textRecipe = cva({
  variants: {
    textStyle: {
      display: {
        textStyle: "display-lg",
      },
      body: {
        textStyle: "body",
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

type TextVariants = RecipeVariantProps<typeof textRecipe>;
type TextStyleVariants =
  | NonNullable<NonNullable<TextVariants>["textStyle"]>
  | "inherit";
type ColorVariants = NonNullable<NonNullable<TextVariants>["color"]>;

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
  color?: ColorVariants;
  as?: TextTags;
};

export const Text = ({
  children,
  textStyle,
  color,
  as = "span",
}: TextProps) => {
  const Tag = styled(as, textRecipe);
  return (
    <Tag
      textStyle={textStyle !== "inherit" ? textStyle : undefined}
      color={color}
    >
      {children}
    </Tag>
  );
};
