import { getAllMdxFiles } from "@/lib/mdx";
import PostCard from "../ui/postCard";
import { Post } from "@/types/blog";
import { getLocale, getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/utils";

export default async function RecentPosts() {
  const t = await getTranslations("home.recentPosts");
  const locale = await getLocale();
  const posts: Post[] = await getAllMdxFiles(locale);
  const recentPosts = posts.slice(0, 3);
  return (
    <section data-fade-3>
      <h2 className="text-foreground mb-2 font-medium">{t("title")}</h2>
      <ul>
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <PostCard href={post.slug} date={post.frontmatter.createdAt}>
              <PostCard.Title>{post.frontmatter.title}</PostCard.Title>
              <PostCard.PostCardDate>
                {formatDate({
                  date: post.frontmatter.createdAt,
                  format: "short",
                  locale: locale === "ar" ? "ar-SA" : "en-US",
                })}
              </PostCard.PostCardDate>
            </PostCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
