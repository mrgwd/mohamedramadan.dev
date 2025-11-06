import PostCard from "@/components/ui/postCard";
import { getAllMdxFiles } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Post } from "@/types/blog";
import { getLocale } from "next-intl/server";
import { ViewTransition } from "react";

export default async function Posts() {
  const locale = await getLocale();
  const posts: Post[] = await getAllMdxFiles(locale);
  return (
    <section>
      <ul>
        {posts.map((post, index) => (
          <li
            className="animate-fade-down opacity-0"
            key={post.slug}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <PostCard href={post.slug} date={post.frontmatter.createdAt}>
              <PostCard.Title>
                <ViewTransition
                  name={`post-${post.frontmatter.title.split(" ").join("-")}`}
                >
                  <span>{post.frontmatter.title}</span>
                </ViewTransition>
              </PostCard.Title>
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
