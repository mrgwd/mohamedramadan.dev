import { createClient } from "../supabase/client";

export async function getPostViewsById(id: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("article_stats")
    .select("views")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching views:", error);
    return 0;
  }

  return data?.views ?? 0;
}
