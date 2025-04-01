import { cva, type RecipeVariantProps } from "@styled-system/css";
import {
  useFloating,
  useInteractions,
  useClick,
  useFocus,
  autoUpdate,
  FloatingFocusManager,
  useDismiss,
  useTransitionStyles,
  useTransitionStatus,
} from "@floating-ui/react";
import { useState } from "react";

const popoverRecipe = cva({
  base: {
    border: "outline",
    backgroundColor: "blue.700",
    color: "white",
    transition: "opacity",
    transitionDuration: "100ms",
    padding: "2",
    borderRadius: "1",
    opacity: 0,
    "&[data-status=open]": {
      opacity: 1,
    },
    "&[data-status=close]": {
      opacity: 0,
    },
    "&[data-status=initial]": {
      opacity: 0,
    },
  },
});

export type PopoverProps = {
  renderReferenceComponent: ({
    setReference,
    referenceProps,
  }: {
    setReference: (node: Element | null) => void;
    referenceProps: Record<string, unknown>;
  }) => React.ReactElement;
  children: React.ReactNode;
};

export const Popover = ({
  renderReferenceComponent,
  children,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
  });

  const click = useClick(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);

  const { isMounted, status: transitionStatus } = useTransitionStatus(context, {
    duration: 100,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    focus,
    dismiss,
  ]);

  return (
    <>
      {renderReferenceComponent({
        setReference: refs.setReference,
        referenceProps: getReferenceProps(),
      })}
      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={popoverRecipe()}
            data-status={transitionStatus}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
