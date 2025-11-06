import Posts from "@/components/layout/blog/posts";
import HeroSection from "@/components/layout/heroSection";
import { Metadata } from "next";
import { ViewTransition } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const title = t("metadata.title");
  const description = t("metadata.description");

  return {
    title,
    description,
    keywords: t.raw("metadata.keywords"),
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Blog() {
  const t = useTranslations("blog");
  return (
    <div className="layout space-y-8">
      <HeroSection className="relative">
        <HeroSection.BackLink href="/">{t("backlink")}</HeroSection.BackLink>
        <HeroSection.Title>
          <ViewTransition name="blog">
            <span>{t("title")}</span>
          </ViewTransition>
        </HeroSection.Title>
        <p>{t("intro")}</p>
      </HeroSection>
      <Posts />
    </div>
  );
}
