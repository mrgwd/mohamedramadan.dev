import { getAllMdxFiles } from "@/lib/mdx";
import PostCard from "../ui/postCard";
import { Post } from "@/types/blog";
import { getLocale, getTranslations } from "next-intl/server";

export default async function RecentPosts() {
  const t = await getTranslations("home.recentPosts");
  const locale = await getLocale();
  const posts: Post[] = await getAllMdxFiles(locale);
  const recentPosts = posts.slice(0, 3);
  return (
    <section data-fade-3>
      <h2 className="text-foreground mb-2 font-medium">{t("title")}</h2>
      <ul className="">
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <PostCard href={post.slug} date={post.frontmatter.createdAt}>
              {post.frontmatter.title}
            </PostCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
