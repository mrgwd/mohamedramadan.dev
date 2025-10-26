import CurrentActivities from "@/components/layout/currentActivities";
import ExternalLink from "@/components/ui/externalLink";
import HeroSection from "@/components/layout/heroSection";
import RecentPosts from "@/components/layout/recentPosts";
import LanguageSwitch from "@/components/ui/languageSwitch";
import {
  GithubLogoIcon,
  ReadCvLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react/ssr";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ViewTransition } from "react";

export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="layout space-y-8">
      <HeroSection className="relative">
        <HeroSection.BackLink href="/">{""}</HeroSection.BackLink>
        <div className="flex items-center justify-between">
          <HeroSection.Title>
            {t.rich("title", {
              waving: (chunks) => (
                <span className="animate-waving-hand inline-block origin-bottom-right">
                  {chunks}
                </span>
              ),
            })}
          </HeroSection.Title>
          <LanguageSwitch />
        </div>
        <div className="space-y-4">
          <p>
            {t.rich("intro", {
              work: (chunks) => (
                <ViewTransition name="work">
                  <Link prefetch href="/work" className="link">
                    {chunks}
                  </Link>
                </ViewTransition>
              ),
              share: (chunks) => (
                <ViewTransition name="blog">
                  <Link prefetch href="/blog" className="link">
                    {chunks}
                  </Link>
                </ViewTransition>
              ),
            })}
          </p>
          <div className="fill-foreground flex flex-wrap gap-x-8 gap-y-2">
            <ExternalLink
              className="group"
              href="https://drive.google.com/file/d/1k7azHctUOPUasLjwg70TyzHqgGRjTLs8/view?pli=1"
            >
              <ReadCvLogoIcon
                size={20}
                weight="duotone"
                className="group-hover:*:text-primary group-hover:[&>*:last-child]:fill-background *:transition-all [&>*:first-child]:opacity-0 group-hover:[&>*:first-child]:opacity-100"
              />
              {t("resume")}
            </ExternalLink>
            <ExternalLink
              className="group"
              href="https://www.twitter.com/_MuhammedR"
            >
              <TwitterLogoIcon
                size={20}
                weight="duotone"
                className="group-hover:*:text-primary *:transition-all [&>*:first-child]:opacity-0 group-hover:[&>*:first-child]:opacity-100"
              />
              <span dir="ltr">@_MuhammedR</span>
            </ExternalLink>
            <ExternalLink className="group" href="https://www.github.com/mrgwd">
              <GithubLogoIcon
                size={20}
                className="group-hover:*:text-primary *:transition-all [&>*:first-child]:opacity-0 group-hover:[&>*:first-child]:opacity-100"
                weight="duotone"
              />
              mrgwd
            </ExternalLink>
          </div>
        </div>
      </HeroSection>
      <CurrentActivities />
      <RecentPosts />
    </div>
  );
}
