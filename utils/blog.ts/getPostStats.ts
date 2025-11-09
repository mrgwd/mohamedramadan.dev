import { createClient } from "../supabase/server";

export async function getPostStats(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("article_stats")
    .select("views, likes")
    .eq("id", id)
    .single();
  return { data, error };
}
