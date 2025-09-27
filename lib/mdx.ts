import { PostMeta } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

if (process.platform === "win32") {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "esbuild.exe",
  );
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild",
  );
}

export async function getMdxSource(slug: string) {
  const postsDirectory = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.mdx`,
  );
  const source = await fs.promises.readFile(postsDirectory, "utf8");
  const { content, data } = matter(source);
  return { content, frontmatter: data } as {
    content: string;
    frontmatter: PostMeta;
  };
}

export async function getAllMdxFiles() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = await fs.promises.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { data } = matter(source);
      return { frontmatter: data, slug };
    }),
  );
  return posts.filter(
    (post): post is { slug: string; content: string; frontmatter: PostMeta } =>
      post !== null,
  );
}
