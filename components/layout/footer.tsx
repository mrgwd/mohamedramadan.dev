import { SOCIALS } from "@/constants/social";
import ExternalLink from "../ui/externalLink";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="layout mt-16 mb-8 flex flex-wrap gap-x-3" data-fade-4>
      <ExternalLink href={`https://twitter.com/${SOCIALS.twitter}`}>
        {t("footer.twitter", { handle: SOCIALS.twitter })}
      </ExternalLink>
      <ExternalLink href={`https://linkedin.com/in/${SOCIALS.linkedin}`}>
        {t("common.socialMedia.linkedin")}
      </ExternalLink>
      <ExternalLink href={`https://github.com/${SOCIALS.github}`}>
        {t("common.socialMedia.github")}
      </ExternalLink>
      <ExternalLink href={`mailto:${SOCIALS.email}`}>
        {t("common.socialMedia.email")}
      </ExternalLink>

      <ExternalLink
        className="ltr:sm:ml-auto rtl:sm:mr-auto"
        href={`https://github.com/${SOCIALS.github}/mohamedramadan.dev`}
      >
        {t("footer.sourceCode")}
      </ExternalLink>
    </footer>
  );
}
