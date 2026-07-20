import { createClient } from "@/lib/supabase/server";

export async function markNotificationRead(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notificaciones")
    .update({
      leida: true,
    })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar la notificación.");
  }
}