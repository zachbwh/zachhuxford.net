import type React from "react";
import { css, sva, type RecipeVariantProps } from "@styled-system/css";
import { text } from "@styled-system/recipes";
import { focusRing } from "./FocusRing";

const buttonRecipe = sva({
  slots: ["button", "label"],
  base: {
    button: {
      transition: "[background, transform]",
      transitionDuration: "100ms",
      borderRadius: "2",
      transform: "scale(1)",
      _active: {
        transform: "scale(0.96)",
      },
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
          color: "foreground.on-main-accent",
          backgroundColor: "background.secondary",
          _hover: {
            backgroundColor: "background.secondary-hover",
          },
          _active: {
            backgroundColor: "background.secondary-active",
          },
        },
      },
    },
    width: {
      full: {
        button: {
          width: "[100%]",
        },
      },
      min: {
        button: {
          width: "[min-content]",
        },
      },
    },
  },
});

type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;
type Sizes = NonNullable<NonNullable<ButtonVariants>["size"]>;
type Variants = NonNullable<NonNullable<ButtonVariants>["variant"]>;
type Widths = NonNullable<NonNullable<ButtonVariants>["width"]>;

export type ButtonProps = {
  size: Sizes;
  variant: Variants;
  width?: Widths;
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
  width,
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
  const classnames = buttonRecipe.raw({ size, variant, width });
  return (
    <button
      className={css(classnames.button, focusRing.raw())}
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
      {!hideLabel && (
        <span className={text({ textStyle: "body" })}>{label}</span>
      )}
      {icon && iconPosition === "end" && icon}
    </button>
  );
};
