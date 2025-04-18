import { cva } from "../styled-system/css";

export const focusRing = cva({
  base: {
    outlineWidth: "0",
    position: "relative",
    _before: {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      borderRadius: "[inherit]",
      transition: "[outline 100ms ease-in-out]",
      outlineWidth: "2",
      outlineOffset: "0",
      outlineStyle: "solid",
      outlineColor: "foreground.on-main-accent/0",
    },
    _focusVisible: {
      _before: {
        outlineColor: "foreground.on-main-accent",
      },
    },
  },
});
