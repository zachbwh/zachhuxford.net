import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { text } from "@styled-system/recipes/text";

const BLOG_DIR = path.join(process.cwd(), "app/blog");

const getBlogPosts = async () => {
  const files = fs.readdirSync(BLOG_DIR, { recursive: true });
  const posts = [];

  for (const file of files) {
    const filePath = file.toString();
    if (filePath.endsWith(".mdx")) {
      const { metadata } = await import(`./${filePath}`);

      posts.push({
        slug: filePath.replace(/\/page\.mdx$/, ""),
        ...metadata,
      });
    }
  }

  return posts;
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  console.log("posts: ", posts);

  return (
    <div>
      <h1 className={text({ textStyle: "displayLg", color: "onMainAccent" })}>
        Blog Posts
        <span className={text({ color: "secondaryAccent" })}>.</span>
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <span
              className={text({ textStyle: "body", color: "onMainAccent" })}
            >
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
