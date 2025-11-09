import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate({
  date,
  locale = "en-US",
  format = "full",
}: {
  date: string;
  locale?: string;
  format?: "full" | "short" | "month-year";
}): string {
  const options: Intl.DateTimeFormatOptions = { numberingSystem: "latn" };

  if (format === "full") {
    options.day = "numeric";
    options.month = "long";
    options.year = "numeric";
  } else if (format === "short") {
    options.day = "numeric";
    options.month = "short";
    options.year = "numeric";
  } else if (format === "month-year") {
    options.month = "short";
    options.year = "numeric";
  }

  return new Date(date).toLocaleDateString(locale, options);
}

export function getReadTime(content: string, wpm: number = 200): string {
  const textLength = content.split(" ").length;
  const readTime = Math.ceil(textLength / wpm);
  return `${readTime} min read`;
}

export function getDateDifference({
  dateFrom,
  dateTo = new Date().toISOString(),
  locale = "en",
}: {
  dateFrom: string;
  dateTo?: string;
  locale?: string;
}): string {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);

  // Calculate total difference in months
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Calculate days difference
  const daysDiff = end.getDate() - start.getDate();

  // Round up: if days difference is positive, add 1 month
  const adjustedMonths = daysDiff > 0 ? totalMonths + 1 : totalMonths;

  const years = Math.floor(adjustedMonths / 12);
  const months = adjustedMonths % 12;

  if (locale === "ar") {
    const parts: string[] = [];

    if (years > 0) {
      parts.push(
        years === 1
          ? "عام واحد"
          : years === 2
            ? "عامان"
            : years <= 10
              ? `${years} أعوام`
              : `${years} عاماً `,
      );
    }

    if (months > 0) {
      parts.push(
        months === 1
          ? "شهر واحد"
          : months === 2
            ? "شهران"
            : months <= 10
              ? `${months} شهور`
              : `${months} شهراً `,
      );
    }

    // Only show days if total period is less than 1 month
    if (adjustedMonths === 0) {
      const days = Math.max(0, daysDiff);
      if (days > 0) {
        parts.push(
          days === 1
            ? "يوم واحد"
            : days === 2
              ? "يومان"
              : days <= 10
                ? `${days} أيام`
                : `${days} يوماً `,
        );
      }
    }

    return parts.length > 0 ? parts.join(" و") : "0 أيام";
  } else {
    let result = "";

    if (years > 0) {
      result += `${years} yr${years > 1 ? "s" : ""} `;
    }

    if (months > 0) {
      result += `${months} mo${months > 1 ? "s" : ""} `;
    }

    // Only show days if total period is less than 1 month
    if (adjustedMonths === 0) {
      const days = Math.max(0, daysDiff);
      if (days > 0) {
        result += `${days} day${days > 1 ? "s" : ""} `;
      }
    }

    return result.trim() || "0 days";
  }
}
