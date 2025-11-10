import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import React, { ViewTransition } from "react";

interface HeroSectionProps {
  children: React.ReactNode;
  className?: string;
}

function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <section className={className}>
      {children}
      <hr />
    </section>
  );
}

interface HeroSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

function HeroSectionTitle({ children, className }: HeroSectionTitleProps) {
  return <h1 className={cn("text-foreground", className)}>{children}</h1>;
}

interface HeroSectionBackLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

function HeroSectionBackLink({
  children,
  href,
  className,
}: HeroSectionBackLinkProps) {
  return (
    <ViewTransition name="backlink">
      <Link
        prefetch
        href={href}
        className={cn("animate-fade-up absolute top-0 opacity-0", className)}
      >
        <h2>{children}</h2>
      </Link>
    </ViewTransition>
  );
}

HeroSection.Title = HeroSectionTitle;
HeroSection.BackLink = HeroSectionBackLink;

export default HeroSection;
