import { PostMeta } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { extractHeadings } from "./toc";

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

export async function getMdxSource(slug: string, locale: string = "en") {
  const postsDirectory = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.${locale}.mdx`,
  );
  const source = await fs.promises.readFile(postsDirectory, "utf8");
  const { content, data } = matter(source);
  const headings = extractHeadings(content);
  return { content, frontmatter: data, headings };
}

export async function getAllMdxFiles(locale: string = "en") {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = await fs.promises.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames
      .filter((file) => file.endsWith(`.${locale}.mdx`))
      .map(async (file) => {
        const slug = file.replace(`.${locale}.mdx`, "");
        const source = await fs.promises.readFile(
          path.join(postsDirectory, file),
          "utf8",
        );
        const { content, data } = matter(source);
        return { content, frontmatter: data, slug };
      }),
  );
  return posts.filter(
    (post): post is { slug: string; content: string; frontmatter: PostMeta } =>
      post !== null,
  );
}
