import type { MDXComponents } from "mdx/types";
import { css } from "@styled-system/css";
import Link from "next/link";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className={css({
          textStyle: "display-md",
          color: "foreground.on-main-accent",
          sm: {
            textStyle: "display-lg",
          },
        })}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={css({
          textStyle: "display-sm",
          sm: { textStyle: "display-lg" },
        })}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={css({
          textStyle: "display-xs",
          sm: { textStyle: "display-md" },
        })}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={css({
          textStyle: "display-xs",
          sm: { textStyle: "display-sm" },
        })}
      >
        {children}
      </h4>
    ),
    ol: ({ children }) => (
      <ol
        className={css({
          listStyle: "body",
          listStyleType: "number",
          listStylePosition: "inside",
          color: "foreground.on-main-accent",
        })}
      >
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul
        className={css({
          listStyle: "body",
          listStyleType: "circle",
          listStylePosition: "inside",
          color: "foreground.on-main-accent",
        })}
      >
        {children}
      </ul>
    ),
    p: ({ children }) => (
      <p
        className={css({
          textStyle: "body",
          paddingY: "2",
        })}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className={css({ textStyle: "body" })}>{children}</blockquote>
    ),
    a: ({ children, href }) => (
      <Link
        className={css({ _hover: { textDecoration: "underline" } })}
        href={href}
      >
        {children}
      </Link>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        height={200}
        width={300}
        {...props}
      />
    ),
    ...components,
  };
}
