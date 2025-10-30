import Experience from "@/components/layout/work/experience";
import ExternalLink from "@/components/ui/externalLink";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Experiences() {
  const t = useTranslations();
  return (
    <section className="space-y-8">
      <Experience data-fade-2>
        <div>
          <div className="flex justify-between max-sm:flex-col-reverse">
            <Experience.Role>
              {t("work.experiences.dokan.role")}
            </Experience.Role>
            <Experience.DateRange
              dateFrom={t("work.experiences.dokan.dateFrom")}
              dateTo={t("work.experiences.dokan.dateTo")}
            />
          </div>
          <Experience.Name>
            <ExternalLink href="https://www.dokan.sa/" className="link">
              <Image
                src="/images/experience/dokan.webp"
                width={18}
                height={18}
                alt="Dokan company logo"
                loading="lazy"
              />
              {t("work.experiences.dokan.name")}
            </ExternalLink>
            {" - "}
            {t.rich("common.countries.sa")}, {t.rich("common.workModel.remote")}
          </Experience.Name>
        </div>
        <Experience.Summary>
          {t("work.experiences.dokan.summary")}
        </Experience.Summary>
        <Experience.Achievements>
          {t
            .raw("work.experiences.dokan.achievements")
            .map((achievement: string, idx: number) => (
              <li key={idx}>{achievement}</li>
            ))}
        </Experience.Achievements>
        <hr />
      </Experience>
      <Experience data-fade-3>
        <div>
          <div className="flex justify-between max-sm:flex-col-reverse">
            <Experience.Role>{t("work.experiences.athr.role")}</Experience.Role>
            <Experience.DateRange
              dateFrom={t("work.experiences.athr.dateFrom")}
              dateTo={t("work.experiences.athr.dateTo")}
            />
          </div>
          <Experience.Name>
            <span className="text-foreground flex items-center gap-1">
              <Image
                src="/images/experience/athr.webp"
                width={18}
                height={18}
                alt="ATHR company logo"
                loading="lazy"
                className=""
              />
              {t("work.experiences.athr.name")}
            </span>
            {" - "}
            {t("common.countries.eg")}, {t("common.workModel.remote")}
          </Experience.Name>
        </div>
        <Experience.Summary>
          {t("work.experiences.athr.summary")}
        </Experience.Summary>
        <Experience.Achievements>
          {t
            .raw("work.experiences.athr.achievements")
            .map((achievement: string, idx: number) => (
              <li key={idx}>{achievement}</li>
            ))}
        </Experience.Achievements>
        <Experience.Closing>
          {t("work.experiences.athr.closing")}
        </Experience.Closing>
      </Experience>
    </section>
  );
}
