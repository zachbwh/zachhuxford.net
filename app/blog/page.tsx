import fs from "node:fs";
import path from "node:path";
import { BlogPostCard } from "./_components/BlogPostCard";
import { css } from "@styled-system/css";

const BLOG_DIR = path.join(process.cwd(), "app/blog");

type BlogPost = {
  slug: string;
  metadata: {
    title: string;
    description?: string;
    authors: { name: string }[];
    publishedTime: string;
  };
  thumbnailSrc: string;
};

const getBlogPosts = async () => {
  const files = fs.readdirSync(BLOG_DIR, { recursive: true });
  const posts: BlogPost[] = [];

  for (const file of files) {
    const filePath = file.toString();
    if (filePath.endsWith(".mdx")) {
      const { metadata, thumbnailSrc } = await import(`./${filePath}`);
      const slug = filePath.replace(/\/page\.mdx$/, "");

      posts.push({
        slug,
        thumbnailSrc,
        metadata,
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
      <ul
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          columnGap: "6",
          rowGap: "10",
          justifyContent: "center",
        })}
      >
        <h1 className={css({ gridColumn: "1 / -1", textStyle: "display-lg" })}>
          Blog Posts
          <span className={css({ color: "foreground.secondary-accent" })}>
            .
          </span>
        </h1>
        {posts.map((post) =>
          Array.from({ length: 10 }).map((_, index) => (
            <li
              key={post.slug + String(index)}
              className={css({ gridColumn: "auto" })}
            >
              <BlogPostCard
                href={`/blog/${post.slug}`}
                thumbnailSrc={post.thumbnailSrc}
                title={post.metadata.title}
                subtitle={post.metadata.description ?? ""}
                date={post.metadata.publishedTime}
                author={post.metadata.authors[0]?.name}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
