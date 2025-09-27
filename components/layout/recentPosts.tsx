import { getAllMdxFiles } from "@/lib/mdx";
import PostCard from "../ui/postCard";
import { Post } from "@/types/blog";

export default async function RecentPosts() {
  const posts: Post[] = await getAllMdxFiles();
  const recentPosts = posts.slice(0, 3);
  return (
    <section data-fade-3>
      <h2 className="text-foreground mb-2 font-medium">Recent posts</h2>
      <ul className="">
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <PostCard href={post.slug} date={post.frontmatter.createdAt}>
              {post.frontmatter.title}
            </PostCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
