import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
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
