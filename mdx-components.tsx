import Link from "next/link";
import BlogImage from "./components/layout/blog/blogImage";
import ExternalLink from "./components/ui/externalLink";
import HandwrittenHashtag from "./components/specific/blog/handwrittenHashtag";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "./lib/utils";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const mdxComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="mb-0 pt-12 font-medium" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-foreground mt-8 mb-3 scroll-mt-5 text-xl sm:scroll-mt-20"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-foreground text-md mt-4 mb-1 scroll-mt-5 sm:scroll-mt-20"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => <span className="mb-2 block" {...props} />,
  ol: (props: ListProps) => (
    <ol className="mb-2 list-decimal ltr:pl-4 rtl:pr-4" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="mb-2 list-disc ltr:pl-4 rtl:pr-4" {...props} />
  ),
  li: (props: ListItemProps) => <li {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-muted rounded px-1.5 text-sm" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "inline";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <ExternalLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${children} (opens in new tab)`}
        className={cn("link-decoration text-foreground", className)}
        {...props}
      >
        {children}
      </ExternalLink>
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="before:bg-primary/60 from-primary/10 relative my-1 to-transparent py-1 before:absolute before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:content-[''] ltr:bg-gradient-to-r ltr:pl-4 ltr:before:-translate-x-4 ltr:before:rounded-l-full rtl:bg-gradient-to-l rtl:pr-4 rtl:before:translate-x-4 rtl:before:rounded-r-full"
      {...props}
    />
  ),
  BlogImage: (props: HTMLImageElement) => (
    <BlogImage
      className={props.className}
      width={props.width}
      height={props.height}
      src={props.src}
      alt={props.alt}
    />
  ),
  HandwrittenHashtag: (props: HTMLDivElement) => (
    <HandwrittenHashtag {...props} />
  ),
};
