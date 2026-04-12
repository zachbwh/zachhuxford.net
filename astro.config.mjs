import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://zachhuxford.net",
  integrations: [mdx()],
  output: "static",
  prefetch: {
    prefetchAll: true,
  },
});
