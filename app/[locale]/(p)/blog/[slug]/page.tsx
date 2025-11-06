import TableOfContents from "@/components/specific/blog/toc";
import Share from "@/components/specific/blog/share";
import HeroSection from "@/components/layout/heroSection";
import Stats from "@/components/layout/blog/stats";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ClockCountdownIcon } from "@phosphor-icons/react/dist/ssr";
import { LikeButton } from "@/components/specific/blog/likeButton";
import { ViewTransition } from "react";
import { getAllMdxFiles, getMdxSource } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/mdx-components";
import { formatDate } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { incrementView } from "@/lib/actions";
import { getPostStats } from "@/utils/blog.ts/getPostStats";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;
  const post = await getMdxSource(slug, locale);
  if (!post) {
    return { title: "Not Found" };
  }
  const { frontmatter } = post;
  const title = frontmatter.title;
  const description = frontmatter.description?.slice(0, 160) || "";

  return {
    title,
    description,
    keywords: frontmatter.tags,
    authors: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      locale,
      publishedTime: frontmatter.createdAt,
      modifiedTime: frontmatter.updatedAt,
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllMdxFiles();

  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const slug = (await params).slug;
  const post = await getMdxSource(slug, locale);
  const id = post.frontmatter.id;
  if (!post || !id) {
    notFound();
  }

  const { content, frontmatter, headings } = post;

  await incrementView(id, slug);
  const { data: stats } = await getPostStats(id);

  return (
    <>
      <TableOfContents
        headings={headings}
        className="sm:animate-fade-left opacity-0 sm:opacity-100"
      />
      <div className="layout">
        <HeroSection className="relative">
          <HeroSection.BackLink href="/blog">
            {t("blog.title")}
          </HeroSection.BackLink>
          <HeroSection.Title>
            <ViewTransition
              name={`post-${frontmatter.title.split(" ").join("-")}`}
            >
              <span>{frontmatter.title}</span>
            </ViewTransition>
          </HeroSection.Title>
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-1">
              <ClockCountdownIcon />
              {formatDate({
                date: frontmatter.createdAt,
                format: "short",
                locale: locale === "ar" ? "ar-SA" : "en-US",
              })}
            </p>
            <Stats likes={stats?.likes} views={stats?.views} />
          </div>
        </HeroSection>
        <section className="overflow-y-clip">
          <article className="article" data-fade-2>
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        properties: {
                          className: [
                            "anchor max-sm:inline-block",
                            "relative",
                            "group",
                            "flex items-center",
                          ],
                          "aria-hidden": "false",
                        },
                        content: {
                          type: "element",
                          tagName: "HandwrittenHashtag",
                          properties: {
                            className: [
                              "anchor-icon",
                              "group-hover:*:bg-primary dark:*:bg-[#333333] *:bg-[#dddddd]",
                              "sm:absolute max-sm:inline-block max-sm:translate-y-1",
                              "ltr:sm:*:-translate-x-5 rtl:*:sm:translate-x-5 ltr:max-sm:translate-x-1 rtl:*:max-sm:-translate-x-1",
                            ],
                          },
                          children: [],
                        },
                        behavior: "wrap",
                      },
                    ],
                  ],
                },
              }}
            />
          </article>
          <div className="my-16 space-y-4">
            <LikeButton id={id} initialLikes={stats?.likes} />
            <Share title={frontmatter.title} slug={slug} />
          </div>
        </section>
      </div>
    </>
  );
}
