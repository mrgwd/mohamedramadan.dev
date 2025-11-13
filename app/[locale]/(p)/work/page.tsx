import Experiences from "@/components/layout/work/experiences";
import HeroSection from "@/components/layout/heroSection";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { use, ViewTransition } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t.raw("metadata.keywords"),
  };
}

export default function Work({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element {
  const { locale } = use(params);
  setRequestLocale(locale);
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
