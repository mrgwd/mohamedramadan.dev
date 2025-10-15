"use server";

import { revalidatePath } from "next/cache";
import { getUserIp } from "@/utils/getUserIp";
import { createClient } from "@/utils/supabase/server";

export async function incrementLike(id: string) {
  const ip = await getUserIp();
  const supabase = await createClient();

  if (!ip) {
    return { error: "Could not identify user." };
  }

  const { data, error } = await supabase.rpc("increment_article_like", {
    article_id: id,
    user_ip_address: ip,
  });

  if (error) {
    console.error("Error incrementing like:", error);
    return { error: error.message };
  }

  revalidatePath(`/blog/${id}`);

  return { likes: data };
}

export async function incrementView(id: string, slug: string) {
  const ip = await getUserIp();
  const supabase = await createClient();

  if (!ip) {
    console.warn("Could not get IP for view tracking.");
    return;
  }

  const { error } = await supabase.rpc("increment_article_view", {
    article_id: id,
    article_slug: slug,
    user_ip_address: ip,
  });

  if (error) {
    console.error("Error incrementing view:", error);
  }
}

export async function checkIfUserLiked(id: string) {
  const ip = await getUserIp();
  const supabase = await createClient();

  if (!ip) {
    return { hasLiked: false };
  }

  const { data, error } = await supabase
    .from("article_likes")
    .select("id")
    .eq("id", id)
    .eq("ip_address", ip)
    .maybeSingle();

  if (error) {
    console.error("Error checking like status:", error);
    return { hasLiked: false };
  }

  return { hasLiked: !!data };
}
