---
name: content-author
description: Scaffold a new blog post and guide ongoing content edits. Use this skill whenever creating a new blog post, adding or changing images/assets in blog content, modifying the Content Collections schema, or working with MDX files in src/content/. Also use when the user asks about content structure, frontmatter fields, or how blog posts are rendered.
user_invocable: true
argument: "a description of what the blog post is about"
---

# Content Authoring

This project uses Astro Content Collections with MDX for blog posts. Content and assets are colocated — each post is a folder containing its MDX file and any images it uses.

## When invoked with a topic

Derive a URL-friendly slug from the topic (lowercase, hyphens, no special characters) and scaffold a new blog post:

```
src/content/blog/<slug>/
├── index.mdx
└── (user will add images here)
```

Create `src/content/blog/<slug>/index.mdx` using today's date for `publishedTime`. Use the topic to fill in the `title` and `description`:

```yaml
---
title: "Derived from the topic"
description: "A short summary derived from the topic"
publishedTime: "YYYY-MM-DD"
authors:
  - "Zach Huxford"
thumbnail: ./opengraph-image.jpeg
thumbnailAlt: "Descriptive alt text for the thumbnail image"
---
```

After scaffolding, let the user know they need to add a thumbnail image (e.g., `opengraph-image.jpeg`) to the folder. Leave the post body for the author to write. Your role is to handle the technical scaffolding and assist with frontmatter, image references, and MDX syntax — not to author blog content.

## OG image generation

When a blog post has a thumbnail image in place, generate the OG image by running:

```bash
./scripts/generate-og-image.sh src/content/blog/<slug>/<thumbnail-filename> public/og/<slug>.png
```

Or generate OG images for all posts at once:

```bash
./scripts/generate-all-og-images.sh
```

These scripts require ImageMagick (`magick`) to be installed locally. They composite the site favicon onto the thumbnail with a gradient overlay. Run this after adding or updating a thumbnail — the generated images in `public/og/` should be committed to the repo since CI does not have ImageMagick.

## When invoked without a topic

Ask the user what the blog post is about, then scaffold as above.

## Content structure

```
src/content/
├── config.ts              # Collection schema definition
└── blog/
    └── my-post/           # One folder per post (the folder name = the URL slug)
        ├── index.mdx       # Post content
        ├── hero.jpeg       # Colocated images
        └── diagram.png
```

The folder name becomes the URL slug: `src/content/blog/my-post/` → `/blog/my-post/`.

## Frontmatter fields

- `title` (required) — post title, shown in the page heading and blog card
- `description` (required) — shown as subtitle on the blog index card
- `publishedTime` (required) — ISO date string, used for sorting and display
- `authors` (required) — array of author names
- `thumbnail` (required) — relative path to a colocated image; Astro processes it through `image()` so it gets optimization and type-safe `ImageMetadata` (with `src`, `width`, `height`)
- `thumbnailAlt` (required) — alt text for the thumbnail image; used as `og:image:alt`, the `alt` attribute on blog cards and post pages, and as a visible caption beneath the thumbnail in blog posts

## Image references

Thumbnail images in frontmatter use **relative paths** (e.g., `./photo.jpeg`). Astro's `image()` schema helper resolves and optimizes these at build time.

For images referenced inside MDX body content, use standard markdown image syntax with relative paths:

```mdx
![Alt text](./diagram.png)
```

## Schema

The collection schema is defined in `src/content/config.ts`. The `schema` property is a function that receives `{ image }` from Astro and returns a Zod object. The `image()` helper validates that the path resolves to a real image and transforms it into `ImageMetadata` at build time.

## How content renders

The rendering pipeline flows through these files:

- `src/pages/blog/index.astro` — blog listing page; queries all posts via `getCollection("blog")`, sorts by `publishedTime` descending, renders each as a `BlogCard`
- `src/pages/blog/[slug].astro` — individual post page; uses `getStaticPaths()` to generate routes, renders MDX through custom markdown components
- `src/layouts/BlogLayout.astro` — wraps each post with title, date, authors, and thumbnail
- `src/components/BlogCard.astro` — card component for the blog index

The `thumbnail` prop is `ImageMetadata` (not a string) — pass it directly to Astro's `<Image>` component via `src`. When adding new frontmatter fields that reference images, use the `image()` schema helper and pass the full `ImageMetadata` object through to components. See the astro-patterns skill for responsive image conventions.

## Custom markdown components

MDX content is rendered with custom component overrides defined in `src/pages/blog/[slug].astro`. These map standard HTML elements to styled Astro components in `src/components/markdown/`. When adding new markdown features, check whether an override already exists before creating a new component.
