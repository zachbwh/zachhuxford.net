import { css } from "../styled-system/css";
import Link from "next/link";
import { focusRing } from "./FocusRing";

const navigation = css({
  width: "[100%]",
  paddingBlock: "4",
  paddingInline: "2",
  display: "flex",
  justifyContent: "space-around",
});

const navigationItem = css({
  display: "inline",
  padding: "2",
});

const navigationLink = css(
  {
    padding: "2",
    borderRadius: "2",
    color: "foreground.on-main-accent",
    textStyle: "body",
    _hover: {
      textDecoration: "underline",
    },
  },
  focusRing.raw()
);

type NavigationItemProps = {
  label: string;
  id: string;
  href: string;
};
export type Navigation = {
  items: NavigationItemProps[];
};

export const Navigation = ({ items }: Navigation) => {
  return (
    <nav className={navigation}>
      <ul>
        {items.map((item) => (
          <li className={navigationItem} key={item.id}>
            <Link href={item.href} className={navigationLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
