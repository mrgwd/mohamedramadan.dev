export interface PostMeta {
  id: string;
  title: string;
  description?: string;
  lang?: string;
  tags?: string[];
  createdAt: string;
}
export interface Post {
  content?: string;
  slug: string;
  frontmatter: PostMeta;
  headings?: string[];
}
