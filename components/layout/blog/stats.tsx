import { EyeIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { useFormatter, useTranslations } from "next-intl";

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
    <div className="force-latin-digits flex gap-2 *:flex *:items-center *:gap-1">
      <p>
        <HeartIcon />
        {t("common.likeCount", {
          count: formattedLikes,
          formattedCount: formattedLikes,
        })}
      </p>
      <p>
        <EyeIcon />
        {t("common.viewCount", {
          count: formattedViews,
          formattedCount: formattedViews,
        })}
      </p>
    </div>
  );
}
