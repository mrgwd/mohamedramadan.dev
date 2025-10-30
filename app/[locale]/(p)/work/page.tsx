import Experiences from "@/components/layout/work/experiences";
import HeroSection from "@/components/layout/heroSection";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t.raw("metadata.keywords"),
  };
}

export default function Work(): React.JSX.Element {
  const t = useTranslations("work");
  return (
    <div className="layout space-y-8">
      <HeroSection className="relative">
        <HeroSection.BackLink href="/">{t("backlink")}</HeroSection.BackLink>

        <HeroSection.Title>
          <ViewTransition name="work">
            <span>{t("title")}</span>
          </ViewTransition>
        </HeroSection.Title>

        <p>{t.rich("intro", { b: (chunks) => <strong>{chunks}</strong> })}</p>
      </HeroSection>
      <Experiences />
    </div>
  );
}
