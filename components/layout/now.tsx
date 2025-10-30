import { useTranslations } from "next-intl";
import ExternalLink from "../ui/externalLink";
import { Link } from "@/i18n/routing";

export default function Now() {
  const t = useTranslations("home.now");
  return (
    <section data-fade-2>
      <h2 className="text-foreground mb-2 font-medium">{t("title")}</h2>
      <ul className="marker:text-dark-muted dark:marker:text-light-muted list-disc ltr:pl-4 rtl:pr-4">
        {t.rich("content", {
          l1: (chunks) => <li>{chunks}</li>,
          l2: (chunks) => <li>{chunks}</li>,
          l3: (chunks) => <li>{chunks}</li>,
          call: (chunks) => (
            <ExternalLink
              href="https://cal.com/mohamedramadan"
              className="link inline-block"
            >
              {chunks}
            </ExternalLink>
          ),
          bucketlist: (chunks) => (
            <Link prefetch href="/bucket-list" className="link">
              {chunks}
            </Link>
          ),
        })}
      </ul>
    </section>
  );
}
