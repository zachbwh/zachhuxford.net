import { cva, type RecipeVariantProps } from "@styled-system/css";
import { styled } from "@styled-system/jsx";

const avatarRecipe = cva({
  base: {
    borderRadius: "50%",
  },
  variants: {
    size: {
      sm: {
        width: "8",
        height: "8",
      },
      md: {
        width: "14",
        height: "14",
      },
      lg: {
        width: "20",
        height: "20",
      },
    },
  },
});

type AvatarVariants = RecipeVariantProps<typeof avatarRecipe>;
type SizeVariants = NonNullable<NonNullable<AvatarVariants>["size"]>;

export type AvatarProps = {
  size: SizeVariants;
  src: string;
};

export const Avatar = ({ size, src }: AvatarProps) => {
  const Component = styled("img", avatarRecipe);
  return <Component size={size} src={src} alt="Avatar" />;
};
