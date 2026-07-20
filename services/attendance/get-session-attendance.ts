import { createClient } from "@/lib/supabase/server";

export async function getSessionAttendance(
  sessionId: string,
) {
  const supabase = await createClient();

  const [
    sessionResult,
    membersResult,
    attendanceResult,
  ] = await Promise.all([
    supabase
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
      .eq("id", sessionId)
      .maybeSingle(),

    supabase
      .from("miembros")
      .select(`
        id,
        perfil_id,
        fecha_ingreso,
        fecha_salida,
        activo,
        observaciones,
        perfiles!miembros_perfil_id_fkey (
          id,
          nombres,
          apellidos,
          foto_url,
          estado
        )
      `)
      .eq("activo", true)
      .order("created_at", { ascending: true }),

    supabase
      .from("asistencia")
      .select(`
        id,
        sesion_id,
        perfil_id,
        estado,
        justificacion,
        registrado_por,
        created_at
      `)
      .eq("sesion_id", sessionId),
  ]);

  if (sessionResult.error) {
    console.error("Error al obtener la sesión:", {
      message: sessionResult.error.message,
      code: sessionResult.error.code,
      details: sessionResult.error.details,
      hint: sessionResult.error.hint,
    });

    throw new Error("No se pudo obtener la sesión.");
  }

  if (membersResult.error) {
    console.error("Error al obtener los miembros:", {
      message: membersResult.error.message,
      code: membersResult.error.code,
      details: membersResult.error.details,
      hint: membersResult.error.hint,
    });

    throw new Error("No se pudieron obtener los miembros.");
  }

  if (attendanceResult.error) {
    console.error("Error al obtener la asistencia:", {
      message: attendanceResult.error.message,
      code: attendanceResult.error.code,
      details: attendanceResult.error.details,
      hint: attendanceResult.error.hint,
    });

    throw new Error(
      "No se pudieron obtener los registros de asistencia.",
    );
  }

  const attendanceByProfile = new Map(
    attendanceResult.data.map((attendance) => [
      attendance.perfil_id,
      attendance,
    ]),
  );

  const members = membersResult.data.map((member) => {
    const profile = Array.isArray(member.perfiles)
      ? member.perfiles[0]
      : member.perfiles;

    return {
      memberId: member.id,
      profileId: member.perfil_id,
      fechaIngreso: member.fecha_ingreso,
      fechaSalida: member.fecha_salida,
      observaciones: member.observaciones,
      profile,
      attendance:
        attendanceByProfile.get(member.perfil_id) ?? null,
    };
  });

  return {
    session: sessionResult.data,
    members,
  };
}