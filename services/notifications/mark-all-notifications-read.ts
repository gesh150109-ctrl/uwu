import { createClient } from "@/lib/supabase/server";

export async function markAllNotificationsRead() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Debes iniciar sesión.");
  }

  const { error } = await supabase
    .from("notificaciones")
    .update({
      leida: true,
    })
    .eq("usuario_id", user.id)
    .eq("leida", false);

  if (error) {
    console.error(
      "Error al marcar todas las notificaciones:",
      error,
    );

    throw new Error(
      "No se pudieron marcar las notificaciones como leídas.",
    );
  }
}