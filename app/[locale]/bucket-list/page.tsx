import List from "@/components/layout/bucket-list/list";
import HeroSection from "@/components/layout/heroSection";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
export const metadata: Metadata = {
  title: "Bucket List",
  description:
    "A list of things I want to achieve, experience, and accomplish at least once in my lifetime.",
  keywords: [
    "bucket list",
    "life goals",
    "personal goals",
    "travel",
    "adventure",
    "experiences",
    "achievements",
    "dreams",
    "aspirations",
    "life experiences",
    "goals",
    "to-do list",
  ],
};

export default function BucketList() {
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
