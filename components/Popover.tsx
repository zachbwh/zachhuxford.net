import { cva } from "@styled-system/css";
import {
  useFloating,
  offset,
  useInteractions,
  useClick,
  autoUpdate,
  FloatingFocusManager,
  useDismiss,
  useTransitionStatus,
  type UseInteractionsReturn,
} from "@floating-ui/react";
import { useState } from "react";

const popoverRecipe = cva({
  base: {
    border: "outline",
    backgroundColor: "blue.700",
    color: "white",
    transition: "all",
    transitionDuration: "200ms",
    padding: "2",
    borderRadius: "1",
    opacity: 0,
    transformOrigin: "center",
    transform: "translateY(2px) scale(0.97)",
    "&[data-status=open]": {
      opacity: 1,
      transform: "translateY(0px) scale(1)",
    },
    "&[data-status=close]": {
      opacity: 0,
    },
    "&[data-status=initial]": {
      opacity: 0,
    },
  },
});

type RenderReferenceComponent = ({
  setReference,
  referenceProps,
}: {
  setReference: (node: Element | null) => void;
  referenceProps: Record<string, unknown>;
}) => React.ReactElement;

type PopoverChildrenWithItems = ({
  getItemProps,
}: {
  getItemProps: UseInteractionsReturn["getItemProps"];
}) => React.ReactNode;

export type PopoverProps = {
  renderReferenceComponent: RenderReferenceComponent;
  children: React.ReactNode | PopoverChildrenWithItems;
};

/**
 * Hook to manage common popover state and interactions.
 * Compose this hook with `PopoverBase` and additional interactions for custom behaviour.
 * @see {@link PopoverBase}
 */
export const usePopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top-start",
    middleware: [offset(8)],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { isMounted, status: transitionStatus } = useTransitionStatus(context, {
    duration: 200,
  });

  return {
    refs,
    floatingStyles,
    interactions: [click, dismiss],
    isMounted,
    transitionStatus,
    context,
  };
};

export type PopoverBaseProps = ReturnType<typeof usePopover> & PopoverProps;

/**
 * Base popover component.
 * Compose this component with the `usePopover` hook to create a popover.
 * @see {@link usePopover}
 */
export const PopoverBase = ({
  renderReferenceComponent,
  refs,
  floatingStyles,
  interactions,
  isMounted,
  transitionStatus,
  context,
  children,
}: PopoverBaseProps) => {
  const { getReferenceProps, getFloatingProps, getItemProps } =
    useInteractions(interactions);

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
          >
            <div className={popoverRecipe()} data-status={transitionStatus}>
              {typeof children === "function"
                ? children({ getItemProps })
                : children}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

/**
 * Basic popover with common interactions.
 * To extend the popover, compose the `PopoverBase` component with the `usePopover` hook.
 * @see {@link PopoverBase}
 * @see {@link usePopover}
 */
export const Popover = ({
  renderReferenceComponent,
  children,
}: PopoverProps) => {
  const {
    refs,
    floatingStyles,
    interactions,
    isMounted,
    transitionStatus,
    context,
  } = usePopover();

  return (
    <PopoverBase
      refs={refs}
      floatingStyles={floatingStyles}
      interactions={interactions}
      isMounted={isMounted}
      transitionStatus={transitionStatus}
      context={context}
      renderReferenceComponent={renderReferenceComponent}
    >
      {children}
    </PopoverBase>
  );
};
