import { cn, formatDate, getDateDifference } from "@/lib/utils";
import { useLocale } from "next-intl";

interface ExperienceProps extends React.ComponentPropsWithoutRef<"article"> {
  children?: React.ReactNode;
  className?: string;
}
function Experience({
  children,
  className,
  ...rest
}: ExperienceProps): React.JSX.Element {
  return (
    <article {...rest} className={cn("space-y-4", className)}>
      {children}
    </article>
  );
}

function Summary(
  props: React.HTMLAttributes<HTMLParagraphElement>,
): React.JSX.Element {
  return <p {...props} />;
}

function Achievements({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ul className="marker:text-dark-muted dark:marker:text-light-muted list-disc ltr:pl-4 rtl:pr-4">
      {children}
    </ul>
  );
}

function Closing({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <p>{children}</p>;
}

function Role({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <h2 className="text-foreground text-lg font-medium">{children} </h2>;
}

function Name({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="text-muted-foreground-subtle flex gap-2">{children}</div>
  );
}

function DateRange({
  dateFrom,
  dateTo,
}: {
  dateFrom: string;
  dateTo: string;
}): React.JSX.Element {
  const locale = useLocale();
  return (
    <p className="group text-muted-foreground-subtle relative">
      <span className="inline-block transition-transform ease-in-out">
        {formatDate({
          date: dateFrom,
          locale: locale === "ar" ? "ar-EG-u-nu-latn" : "en-US",
          format: "month-year",
        })}
      </span>{" "}
      <span className="relative inline-flex max-w-4 flex-col items-baseline justify-center overflow-hidden text-center transition-all duration-300 ease-in-out group-hover:max-w-40">
        <span className="absolute inline-block text-center transition-opacity duration-300 group-hover:opacity-0">
          —
        </span>
        <span className="text-primary mx-1 translate-y-1 text-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          {getDateDifference(dateFrom, dateTo, locale)}
        </span>
      </span>{" "}
      <span className="inline-block">
        {formatDate({
          date: dateTo,
          locale: locale === "ar" ? "ar-EG-u-nu-latn" : "en-US",
          format: "month-year",
        })}
      </span>
    </p>
  );
}

Experience.Name = Name;
Experience.DateRange = DateRange;
Experience.Role = Role;
Experience.Summary = Summary;
Experience.Achievements = Achievements;
Experience.Closing = Closing;
export default Experience;
