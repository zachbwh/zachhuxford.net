import type React from "react";
import { sva, type RecipeVariantProps } from "@styled-system/css";
import { Text } from "./Text";

const buttonRecipe = sva({
  slots: ["button", "label"],
  base: {
    button: {
      transition: "background",
      transitionDuration: "300ms",
    },
  },
  variants: {
    size: {
      sm: {
        button: {
          padding: "2",
        },
      },
      md: {
        button: {
          padding: "3",
        },
      },
      lg: {
        button: {
          padding: "4",
        },
      },
    },
    variant: {
      primary: {
        button: {
          backgroundColor: "background.primary",
          _hover: {
            backgroundColor: "background.primary-hover",
          },
          _active: {
            backgroundColor: "background.primary-active",
          },
        },
      },
      secondary: {
        button: {
          borderColor: "blue.700",
        },
      },
    },
  },
});

type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;
type Sizes = NonNullable<NonNullable<ButtonVariants>["size"]>;
type Variants = NonNullable<NonNullable<ButtonVariants>["variant"]>;

export type ButtonProps = {
  size: Sizes;
  variant: Variants;
  label: string;
  hideLabel?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  ref?: React.Ref<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
};

export const Button = ({
  size,
  variant,
  label,
  hideLabel,
  icon,
  iconPosition = "start",
  type = "button",
  ref,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
  ...rest
}: ButtonProps) => {
  const classnames = buttonRecipe({ size, variant });
  return (
    <button
      className={classnames.button}
      aria-label={hideLabel ? label : undefined}
      ref={ref}
      type={type}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {icon && iconPosition === "start" && icon}
      {!hideLabel && <Text textStyle="body">{label}</Text>}
      {icon && iconPosition === "end" && icon}
    </button>
  );
};
