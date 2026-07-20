import { createClient } from "@/lib/supabase/server";

export async function getAttendanceSessions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sesiones")
    .select(`
      id,
      titulo,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      lugar,
      estado
    `)
    .in("estado", ["PROGRAMADA", "REALIZADA"])
    .order("fecha", { ascending: false })
    .order("hora_inicio", { ascending: false });

  if (error) {
    console.error("Error al obtener sesiones para asistencia:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(
      "No se pudieron obtener las sesiones para asistencia.",
    );
  }

  return data;
}