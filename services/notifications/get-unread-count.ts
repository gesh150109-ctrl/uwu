import { createClient } from "@/lib/supabase/server";

export async function getUnreadNotificationsCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("notificaciones")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("leida", false);

  if (error) {
    console.error("Error al contar notificaciones:", error);
    return 0;
  }

  return count ?? 0;
}