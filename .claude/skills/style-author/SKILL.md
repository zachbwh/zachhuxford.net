---
name: style-author
description: How to write styles in this Astro + Panda CSS project. Use this skill whenever creating or modifying .astro components that need styling, adding CSS classes, or working with Panda CSS APIs (css(), cva(), patterns). Also use when the user asks about styling conventions, token usage, or responsive design in this project.
---

# Style Authoring

This project uses Panda CSS for styling Astro components. Oxlint runs the `@pandacss/eslint-plugin` but **cannot lint inside Astro template expressions** — only code in the frontmatter (`---` block) gets checked. This is the main architectural constraint that shapes how styles are written here.

## The frontmatter rule

All `css()`, `cva()`, and pattern calls (like `stack()`, `flex()`, etc.) must go in the Astro frontmatter. Assign them to variables there, then reference those variables in the template via `class={varName}`.

```astro
---
import { css } from "@styled-system/css";

const wrapper = css({ display: "flex", gap: "4" });
const title = css({ textStyle: "heading-sm", color: "foreground.on-main-accent" });
---

<div class={wrapper}>
  <h2 class={title}>Hello</h2>
</div>
```

Never do this — it works at runtime but oxlint can't check it:

```astro
<!-- BAD: css() call in template — invisible to the linter -->
<div class={css({ display: "flex", gap: "4" })}>
```

## How Panda CSS works under the hood

Panda CSS uses AST-based static analysis at build time to extract styles from your source code. It parses calls to `css()`, `cva()`, patterns, etc. and generates atomic CSS classes — it does not evaluate your code at runtime. This means style definitions must be statically analyzable: the compiler needs to be able to read the exact style object from the source text. The `@pandacss/no-dynamic-styling` lint rule catches violations, but understanding this constraint helps you write styles that work with the system rather than against it.

## Always use Panda CSS — never CSS modules

Do not create `.module.css` files or use CSS modules. All styling should use Panda CSS atomic styles (`css()`, `cva()`, patterns). The only exception is the existing `src/styles/global.css` for global reset/font/layer setup.

## Avoid inline style attributes

Do not use the `style` attribute on elements. Use Panda CSS instead. There may be rare edge cases where `style` is necessary (e.g., dynamic values that truly can't be expressed statically), but these are unlikely in this project.

## Panda CSS APIs

**`css()`** — the default for most components. Import from `@styled-system/css`.

**`cva()`** — use when a component has variants (size, color, etc.). Import from `@styled-system/css`. Extract variant types with `RecipeVariantProps`:

```astro
---
import { cva, type RecipeVariantProps } from "@styled-system/css";

const buttonRecipe = cva({
  base: { borderRadius: "2", paddingInline: "4", paddingBlock: "2" },
  variants: {
    variant: {
      solid: { background: "background.primary" },
      outline: { borderWidth: "1", borderColor: "border.outline" },
    },
  },
});

type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;
interface Props { variant: NonNullable<NonNullable<ButtonVariants>["variant"]> }
const { variant } = Astro.props;
---

<button class={buttonRecipe({ variant })}>
  <slot />
</button>
```

**Pattern helpers** — use for common layouts. Import from `@styled-system/patterns`:
- `stack()` — vertical or horizontal stack with gap
- `flex()` — flexbox container
- `hstack()` / `vstack()` — directional stacks
- `grid()` — CSS grid
- `center()` — centering container
- `container()` — max-width container
- `visuallyHidden()` — accessible screen-reader-only content

## Merging and combining styles

When you need to merge multiple style objects, use `css()` with `css.raw()` — never string concatenation of class names from separate `css()` calls. Later arguments override earlier ones:

```typescript
const baseStyles = css.raw({ display: "flex", gap: "4", color: "foreground.on-main-accent" });
const overrideStyles = css.raw({ gap: "6" });

// Merge them — gap becomes "6", other properties preserved
const merged = css(baseStyles, overrideStyles);
```

`css.raw()` returns the raw style object without generating a class name, so it can be reused and composed. This is the correct way to share and override styles.

For recipes, use `recipe.raw()` to extract a raw style object that can then be merged with `css()`:

```typescript
const buttonStyles = cva({
  base: { borderRadius: "2" },
  variants: { size: { sm: { paddingBlock: "1" }, lg: { paddingBlock: "3" } } },
});

// Merge recipe output with additional styles
const customButton = css(buttonStyles.raw({ size: "sm" }), css.raw({ color: "foreground.on-main-accent" }));
```

**For concatenating class name strings**, use the `cx()` utility from `@styled-system/css`:

```astro
---
import { css, cx } from "@styled-system/css";

const linkClass = css({ display: "block" });
---

<a class={cx(linkClass, "group")}>
```

## Token usage

Strict tokens and strict property values are enabled (`strictTokens: true`, `strictPropertyValues: true`). Every value must come from the design system — the compiler will error on unknown values.

**Finding valid tokens:** Check the generated type definitions in `styled-system/tokens/tokens.d.ts`. This file has union types for every token category (`SpacingToken`, `ColorToken`, `SizeToken`, `RadiusToken`, etc.) and always reflects the current config. Read it when unsure what values are available.

**Semantic color tokens** are defined in `panda.preset.ts` under `semanticTokens`. Prefer these over raw palette colors (e.g., `foreground.on-main-accent` rather than `emerald.500`) because they handle theme switching automatically.

**Text styles** are defined in `panda.preset.ts` under `textStyles`. Use the `textStyle` property (e.g., `textStyle: "heading-sm"`).

**Escape hatch** — for values outside the token system, use bracket notation: `width: "[100%]"`, `borderRadius: "[50%]"`, `inset: "-2"`.

## Logical properties

The `@pandacss/no-physical-properties` rule is set to `error`. Always use logical property names:

| Physical (error) | Logical (correct) |
|---|---|
| `paddingLeft` / `paddingRight` | `paddingInlineStart` / `paddingInlineEnd` or `paddingInline` |
| `paddingTop` / `paddingBottom` | `paddingBlockStart` / `paddingBlockEnd` or `paddingBlock` |
| `marginLeft` / `marginRight` | `marginInlineStart` / `marginInlineEnd` or `marginInline` |
| `borderLeft` | `borderInlineStart` |

The shorthand `paddingInline` and `paddingBlock` set both sides and are preferred when values are symmetric.

## Other linting rules to respect

- **No hardcoded colors** — use semantic color tokens, not hex/rgb/oklch values
- **No dynamic styling** — style objects must be statically analyzable. Don't compute property names or values at runtime
- **No config functions in source** — don't import from `@pandacss/dev` in components

## Responsive design

Use Panda's condition objects for responsive values. The breakpoints are `sm`, `md`, `lg`, `xl`, `2xl`:

```typescript
const container = css({
  paddingInline: { base: "4", sm: "10" },
  maxWidth: { base: "[100%]", lg: "20" },
});
```

Use `hideBelow` and `hideFrom` for show/hide at breakpoints.

## Theme conditions

This project has three themes (default, dark, purple) controlled by `data-theme` on the HTML element. Use the custom conditions `_darkTheme` and `_purpleTheme` when defining theme-specific values. These are already set up in semantic tokens, so most of the time you just use the semantic token and it handles themes automatically.
