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

type TextVariants = RecipeVariantProps<typeof textStyleRecipe>;
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
  color = "onMainAccent",
  as = "span",
}: TextProps) => {
  const Tag = styled(as, textStyleRecipe);
  return (
    <Tag
      textStyle={textStyle !== "inherit" ? textStyle : undefined}
      color={color}
    >
      {children}
    </Tag>
  );
};
