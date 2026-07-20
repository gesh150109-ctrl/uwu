import { createClient } from "@/lib/supabase/server";

export async function deleteSession(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("sesiones")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}