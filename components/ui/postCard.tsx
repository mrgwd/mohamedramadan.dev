import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface PostCardProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  children: React.ReactNode;
  date: string;
}
function PostCard({ href, children }: PostCardProps) {
  return (
    <Link prefetch href={`/blog/${href}`} className="group my-2 block">
      {children}
    </Link>
  );
}
function PostCardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "decoration-transparent underline-offset-2 transition-all duration-300 group-hover:underline group-hover:decoration-inherit",
        className,
      )}
    >
      {children}
    </h2>
  );
}
function PostCardDate({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-muted-foreground-subtle text-sm", className)}>
      {children}
    </p>
  );
}
PostCard.Title = PostCardTitle;
PostCard.PostCardDate = PostCardDate;
export default PostCard;
