import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitch() {
  const locale = useLocale();

  return (
    <Link
      className="text-muted-foreground-subtle link-decoration cursor-pointer"
      href={locale === "ar" ? "en" : "ar"}
      locale={locale === "ar" ? "en" : "ar"}
      hrefLang={locale === "ar" ? "en" : "ar"}
    >
      {locale === "ar" ? "English" : "تصفح بالعربية"}
    </Link>
  );
}
