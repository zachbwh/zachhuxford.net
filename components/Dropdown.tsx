"use client";
import { useListNavigation } from "@floating-ui/react";
import { type PopoverProps, PopoverBase, usePopover } from "./Popover";
import { useMemo, useRef, useState } from "react";
import { cva } from "../styled-system/css";

export const dropdownItem = cva({
  base: {
    padding: "2",
    borderRadius: "2",
    color: "foreground.on-main-accent",
    backgroundColor: "background.secondary",
    outlineWidth: "0",
    _focus: {
      backgroundColor: "background.secondary-hover",
    },
  },
});

type DropdownItemProps = {
  label: string;
  id: string;
  value: string;
};
export type DropdownProps = Pick<PopoverProps, "renderReferenceComponent"> & {
  children: DropdownItemProps[];
  onItemAction: (value: string) => void;
};

export const Dropdown = ({
  renderReferenceComponent,
  children,
  onItemAction,
}: DropdownProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const {
    refs,
    floatingStyles,
    interactions,
    isMounted,
    transitionStatus,
    context,
  } = usePopover();

  const listRef = useRef<(HTMLDivElement | null)[]>([]);

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const combinedInteractions = useMemo(() => {
    return [...interactions, listNavigation];
  }, [interactions, listNavigation]);

  return (
    <PopoverBase
      renderReferenceComponent={renderReferenceComponent}
      refs={refs}
      floatingStyles={floatingStyles}
      interactions={combinedInteractions}
      isMounted={isMounted}
      transitionStatus={transitionStatus}
      context={context}
    >
      {({ getItemProps }) =>
        children.map(({ label, id, value }, index) => (
          <div
            key={id}
            // Make these elements focusable using a roving tabIndex.
            tabIndex={activeIndex === index ? 0 : -1}
            className={dropdownItem()}
            ref={(node) => {
              listRef.current[index] = node;
            }}
            {...getItemProps({
              onClick: () => {
                onItemAction(value);
              },
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  onItemAction(value);
                }
              },
            })}
          >
            {label}
          </div>
        ))
      }
    </PopoverBase>
  );
};
