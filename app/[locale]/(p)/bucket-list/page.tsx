import List from "@/components/layout/bucket-list/list";
import HeroSection from "@/components/layout/heroSection";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "bucket-list" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t.raw("metadata.keywords"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    twitter: {
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
  };
}

export default function BucketList({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("bucket-list");
  return (
    <div className="layout space-y-8">
      <HeroSection className="relative">
        <HeroSection.BackLink href="/">{t("backlink")}</HeroSection.BackLink>
        <HeroSection.Title>{t("title")}</HeroSection.Title>
        <p>{t("intro")}</p>
      </HeroSection>
      <List />
    </div>
  );
}
