import { createClient } from "@/lib/supabase/server";

export async function getNotifications(limit = 20) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notificaciones")
    .select(`
      id,
      titulo,
      mensaje,
      tipo,
      enlace,
      leida,
      created_at
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error al obtener notificaciones:", error);
    throw new Error("No se pudieron cargar las notificaciones.");
  }

  return data;
}