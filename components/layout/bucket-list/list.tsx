import BucketListItem from "./bucketListItem";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";
import { BucketListItem as IBucketListItem } from "@/types/bucket-list";

const BUCKET_LIST_ITEMS = [
  {
    id: "speak-at-conference",
    title: "items.speak-at-conference.title",
  },
  {
    id: "write-10-articles",
    title: "items.write-10-articles.title",
  },
  {
    id: "speak-in-front-of-100-people",
    title: "items.speak-in-front-of->100-people.title",
    description: "items.speak-in-front-of->100-people.description",
    completedAt: "2022-11-01",
  },
  {
    id: "visit-saudi-arabia",
    title: "items.visit-Saudi-Arabia.title",
    description: "items.visit-Saudi-Arabia.description",
  },
  {
    id: "have-straight-back",
    title: "items.have-straight-back.title",
  },
  {
    id: "create-portfolio-website",
    title: "items.create-portfolio-website.title",
    description: "items.create-portfolio-website.description",
    completedAt: "2024-09-25",
  },
  {
    id: "read-10-books",
    title: "items.read-10-books.title",
    description: "items.read-10-books.description",
  },
  {
    id: "see-northern-lights",
    title: "items.see-northern-lights.title",
  },
  {
    id: "underwater-diving",
    title: "items.underwater-diving.title",
  },
  {
    id: "exercise-regularly",
    title: "items.exercise-regularly.title",
  },
  {
    id: "mentor-someone",
    title: "items.mentor-someone.title",
  },
];

function getFormattedDescription(
  item: IBucketListItem,
  locale: string,
): string {
  const parts: string[] = [];

  if (item.completedAt) {
    parts.push(
      formatDate({
        date: item.completedAt,
        locale: locale === "ar" ? "ar-SA" : "en-US",
        format: "short",
      }),
    );
  }

  if (item.description) {
    parts.push(item.description);
  }

  return parts.join(", ");
}

export default function List() {
  const t = useTranslations("bucket-list");
  const locale = useLocale();

  const items: IBucketListItem[] = BUCKET_LIST_ITEMS.map((item) => ({
    ...item,
    title: t(item.title),
    description: item.description ? t(item.description) : undefined,
  }));

  const completedItemsNumber = items.filter((item) => item.completedAt).length;

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <BucketListItem
            key={item.id}
            isCompleted={!!item.completedAt}
            className="animate-fade-down mb-6 opacity-0"
            style={{ animationDelay: `${(index + 1) * 50}ms` }}
          >
            <BucketListItem.Title>{item.title}</BucketListItem.Title>
            <BucketListItem.Description>
              {getFormattedDescription(item, locale)}
            </BucketListItem.Description>
          </BucketListItem>
        ))}
      </ul>
      <hr />
      <small className="text-foreground-secondary-muted block italic">
        {t("progress", {
          total: items.length,
          completed: completedItemsNumber,
        })}
      </small>
    </div>
  );
}
