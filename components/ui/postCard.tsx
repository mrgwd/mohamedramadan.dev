import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import { useLocale } from "next-intl";
interface PostCardProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  children: React.ReactNode;
  date: string;
}
function PostCard({ href, children, date }: PostCardProps) {
  const locale = useLocale();
  const hijri = locale === "ar" ? true : false;
  return (
    <Link prefetch href={`/blog/${href}`} className="group my-2 block">
      <PostCardTitle>{children}</PostCardTitle>
      <p className="text-muted-foreground-subtle">{formatDate(date, hijri)}</p>
    </Link>
  );
}
function PostCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="decoration-transparent underline-offset-2 transition-all duration-300 group-hover:underline group-hover:decoration-inherit">
      {children}
    </h2>
  );
}

export default PostCard;
