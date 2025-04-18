import type { MDXComponents } from "mdx/types";
import { text } from "@styled-system/recipes";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className={text({
          textStyle: {
            base: "displayMd",
            sm: "displayLg",
          },
        })}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={text({ textStyle: { base: "displaySm", sm: "displayMd" } })}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={text({ textStyle: "displaySm" })}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className={text({ textStyle: "displaySm" })}>{children}</h4>
    ),
    ol: ({ children }) => (
      <ol className={text({ textStyle: "body" })}>{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className={text({ textStyle: "body" })}>{children}</ul>
    ),
    p: ({ children }) => (
      <p className={text({ textStyle: "body" })}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className={text({ textStyle: "body" })}>
        {children}
      </blockquote>
    ),
    ...components,
  };
}
