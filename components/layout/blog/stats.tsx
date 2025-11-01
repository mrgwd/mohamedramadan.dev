import { EyeIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { useFormatter, useTranslations } from "next-intl";
import Link from "next/link";

export default function Stats({
  likes,
  views,
}: {
  likes: number;
  views: number;
}) {
  const t = useTranslations();
  const format = useFormatter();
  const formattedViews = format.number(views, {
    numberingSystem: "latn",
  });
  const formattedLikes = format.number(likes, {
    numberingSystem: "latn",
  });
  return (
    <div className="flex gap-2 *:flex *:items-center *:gap-1">
      <Link href="#like-button-section" className="link-decoration">
        <HeartIcon aria-hidden="true" />
        <span className="sr-only">
          {t("common.likeCount", {
            count: formattedLikes,
            formattedCount: formattedLikes,
          })}
        </span>
        {t("common.likeCount", {
          count: formattedLikes,
          formattedCount: formattedLikes,
        })}
      </Link>
      <p>
        <EyeIcon aria-hidden="true" />
        <span className="sr-only">
          {t("common.viewCount", {
            count: formattedViews,
            formattedCount: formattedViews,
          })}
        </span>
        {t("common.viewCount", {
          count: formattedViews,
          formattedCount: formattedViews,
        })}
      </p>
    </div>
  );
}
