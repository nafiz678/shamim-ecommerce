import { supabaseClient } from "../../lib/supabase-client";

export async function getUserRole(userId: string) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data?.role ?? null;
}
