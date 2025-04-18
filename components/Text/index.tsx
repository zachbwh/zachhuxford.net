import { text, type TextVariant } from "@styled-system/recipes";

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

export type TextProps = TextVariant & {
  children: React.ReactNode;
  as?: TextTags;
};

export const Text = ({
  children,
  textStyle,
  color,
  as = "span",
}: TextProps) => {
  const Element = as;
  return (
    <Element
      className={text({
        textStyle,
        color,
      })}
    >
      {children}
    </Element>
  );
};
