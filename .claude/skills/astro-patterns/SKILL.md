---
name: astro-patterns
description: Idiomatic Astro patterns for this project — linking, images and assets, content collections, and routing. Use this skill whenever adding or modifying links/navigation, working with images or static assets, creating new pages or routes, or querying content collections. Also use when the user asks how something should be done "the Astro way" or when you're unsure about Astro conventions.
---

# Astro Patterns

This project is an Astro 5 static site. The patterns below cover the areas where Astro's conventions differ from other frameworks and where mistakes are easy to make.

When you're unsure about an Astro API or pattern not covered here, fetch `https://docs.astro.build/llms-full.txt` for comprehensive documentation.

## Linking

There is no built-in `<Link>` component in Astro. Standard `<a>` tags are the idiomatic way to link between pages. Use root-relative paths for internal links:

```astro
<a href="/about">About</a>
```

## Images and assets

Astro has two places for assets, and the choice matters:

**`src/` assets** — Astro optimizes these at build time (resizing, format conversion, etc.). Use the `<Image>` component from `astro:assets`:

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---
<Image src={heroImg} alt="Hero image" />
```

The import gives you an `ImageMetadata` object. Pass it directly to `<Image>` via `src` — don't destructure `.src`, `.width`, `.height` onto a plain `<img>`.

**Responsive images** — this project uses a shared `IMAGE_WIDTHS` constant from `src/consts.ts` for all `<Image>` components. All image components should use the same set of widths so that the same source image generates identical output files across pages, enabling browser cache hits when users navigate between them (e.g., blog list → blog post). Check `src/consts.ts` for the current values — they should reflect the actual layout widths the images render at. If layouts change, update the constant to match.

For below-the-fold images, use `sizes="auto"` with `loading="lazy"` so the browser picks the right `srcset` entry based on actual rendered size:

```astro
---
import { IMAGE_WIDTHS } from '../consts';
---
<Image src={img} alt="..." widths={[...IMAGE_WIDTHS]} sizes="auto" loading="lazy" />
```

For above-the-fold images (hero/banner), provide an explicit `sizes` value instead of lazy loading so the browser can fetch the right variant immediately:

```astro
<Image src={img} alt="..." widths={[...IMAGE_WIDTHS]} sizes="min(768px, calc(100vw - 40px))" />
```

For cases where you need the optimized URL without rendering an `<img>` tag (e.g., for CSS backgrounds or meta tags), use `getImage()`:

```astro
---
import { getImage } from 'astro:assets';
import ogImage from '../assets/og.jpg';
const optimized = await getImage({ src: ogImage });
---
<meta property="og:image" content={optimized.src} />
```

**`public/` assets** — Copied to the build output as-is, no processing. Reference them by path from root. Use this for files that shouldn't be transformed: favicons, `robots.txt`, fonts, etc.

```astro
<img src="/favicon.svg" alt="" />
```

**In content (MDX/Markdown)** — images colocated with content in `src/content/` use relative paths:

```mdx
![Diagram](./diagram.png)
```

In frontmatter, the `image()` schema helper validates and transforms image paths into `ImageMetadata` at build time. See the content-author skill for details on this project's content image conventions.

## Content Collections

Content Collections provide type-safe access to structured content (like blog posts). The schema is defined in `src/content/config.ts`.

**Query all entries:**

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```

**Query a single entry:**

```astro
---
import { getEntry } from 'astro:content';
const post = await getEntry('blog', 'my-post-slug');
---
```

**Render content to HTML:**

```astro
---
const post = await getEntry('blog', 'my-post');
const { Content } = await post.render();
---
<Content />
```

**Generate pages from a collection** — use `getStaticPaths()` in a dynamic route file:

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<Content />
```

Each entry's `data` property contains the validated frontmatter fields, and `slug` is derived from the folder/file name.

## Routing

Astro uses file-based routing — each file in `src/pages/` becomes a route:

- `src/pages/index.astro` -> `/`
- `src/pages/about.astro` -> `/about`
- `src/pages/blog/index.astro` -> `/blog`

Dynamic routes use bracket syntax with `getStaticPaths()`:

- `src/pages/blog/[slug].astro` -> `/blog/:slug`
- `src/pages/docs/[...slug].astro` -> `/docs/*` (catch-all/rest parameter)

No base path is configured — routes map directly from the file structure to URLs.
