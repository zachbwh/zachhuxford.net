import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Text } from "@components/Text";

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
      <Text as="h1" textStyle="displayLg" color="onMainAccent">
        Blog Posts
        <Text textStyle="inherit" color="secondaryAccent">
          .
        </Text>
      </Text>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Text textStyle="body" color="onMainAccent">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
