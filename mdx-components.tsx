import type { MDXComponents } from "mdx/types";
import { text, link } from "@styled-system/recipes";
import { css } from "@styled-system/css";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className={text({
          textStyle: {
            base: "displayMd",
            sm: "display2xl",
          },
        })}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={text({ textStyle: { base: "displaySm", sm: "displayXl" } })}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={text({ textStyle: { base: "displayXs", sm: "displayLg" } })}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={text({ textStyle: { base: "displayXs", sm: "displayMd" } })}
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
      <p className={text({ textStyle: "body" })}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className={text({ textStyle: "body" })}>
        {children}
      </blockquote>
    ),
    a: ({ children, href }) => (
      <Link className={link()} href={href}>
        {children}
      </Link>
    ),
    ...components,
  };
}
