import { slug } from "github-slugger";

export interface Heading {
  level: number;
  text: string;
  slug: string;
}

export function extractHeadings(markdownText: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdownText.split("\n");

  for (const line of lines) {
    const match = line.match(/^(##|###)\s(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({
        level,
        text,
        slug: slug(text),
      });
    }
  }

  return headings;
}
