import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedTime: z.string(),
    authors: z.array(z.string()),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { blog };
