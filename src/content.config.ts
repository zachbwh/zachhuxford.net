import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedTime: z.string(),
      authors: z.array(z.string()),
      thumbnail: image(),
      thumbnailAlt: z.string(),
    }),
});

export const collections = { blog };
