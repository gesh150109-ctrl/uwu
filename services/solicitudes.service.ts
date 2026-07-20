import { createClient } from "@/lib/supabase/server";

export async function obtenerSolicitudes() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(
      userError?.message ||
        "No se pudo obtener el usuario autenticado.",
    );
  }

  const { data: perfil, error: perfilError } =
    await supabase
      .from("perfiles")
      .select("id, es_admin")
      .eq("id", user.id)
      .maybeSingle();

  if (perfilError) {
    throw new Error(perfilError.message);
  }

  const {
    data: solicitudesData,
    error: solicitudesError,
  } = await supabase
    .from("solicitudes")
    .select(`
      id,
      perfil_id,
      nombres,
      apellidos,
      codigo_universitario,
      correo,
      telefono,
      motivo,
      estado,
      fecha_solicitud,
      fecha_revision,
      revisado_por,
      votaciones (
        id,
        estado,
        fecha_inicio,
        fecha_fin,
        votos (
          voto
        )
      )
    `)
    .order("fecha_solicitud", {
      ascending: false,
    });

  if (solicitudesError) {
    console.error("Error al obtener solicitudes:", {
      message: solicitudesError.message,
      details: solicitudesError.details,
      hint: solicitudesError.hint,
      code: solicitudesError.code,
    });

    throw new Error(solicitudesError.message);
  }

  const solicitudes = (solicitudesData ?? []).map(
    (solicitud) => ({
      ...solicitud,
      votaciones: solicitud.votaciones ?? [],
    }),
  );

  return {
    solicitudes,
    esAdmin: perfil?.es_admin ?? false,
  };
}