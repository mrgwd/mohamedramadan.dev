import Posts from "@/components/layout/blog/posts";
import HeroSection from "@/components/layout/heroSection";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials, stories and Thoughts about programming, web development and life.",
  keywords: [
    "blog",
    "programming",
    "web development",
    "Tutorials",
    "stories",
    "Thoughts",
    "Tech",
    "React",
    "Next.js",
    "Tech Blog",
    "Developer Blog",
  ],
};

export default function Blog() {
  return (
    <div className="space-y-8">
      <HeroSection className="relative">
        <HeroSection.BackLink href="/">home</HeroSection.BackLink>
        <HeroSection.Title>blog</HeroSection.Title>
        <p>
          Tutorials, stories and Thoughts about programming, web development and
          life.
        </p>
      </HeroSection>
      <Posts />
    </div>
  );
}
