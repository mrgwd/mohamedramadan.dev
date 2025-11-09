import { cn } from "@/lib/utils";
import Link from "next/link";

interface ExternalLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  children: React.ReactNode;
}
export default function ExternalLink({
  children,
  href,
  ...props
}: ExternalLinkProps) {
  return (
    <Link
      target={props.target || "_blank"}
      href={href || ""}
      className={cn(
        "cursor-link text-muted-foreground-subtle hover:text-foreground flex items-center gap-1 transition-all",
        props.className,
      )}
    >
      {children}
    </Link>
  );
}
