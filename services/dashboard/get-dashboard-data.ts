import { createClient } from "@/lib/supabase/server";
import {
  DashboardData,
  DashboardProfile,
  SessionSummary,
} from "@/types/dashboard";

export async function getDashboardData(
  userId: string
): Promise<DashboardData> {
  const supabase = await createClient();

  // ======================================
  // PERFIL
  // ======================================

  const { data: profile, error: profileError } = await supabase
    .from("perfiles")
    .select(`
      id,
      codigo_universitario,
      correo,
      nombres,
      apellidos,
      telefono,
      foto_url,
      estado,
      es_admin
    `)
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    throw new Error("No se encontró el perfil.");
  }

  const perfil = profile as DashboardProfile;

  // ======================================
  // PRÓXIMA SESIÓN
  // ======================================

  const { data: session } = await supabase
    .from("sesiones")
    .select(`
      id,
      titulo,
      fecha,
      hora_inicio,
      hora_fin,
      lugar
    `)
    .eq("estado", "PROGRAMADA")
    .gte("fecha", new Date().toISOString().slice(0, 10))
    .order("fecha")
    .limit(1)
    .maybeSingle();

  const proximaSesion = session as SessionSummary | null;

  // ======================================
  // ADMIN
  // ======================================

  if (perfil.es_admin) {
    const [
      miembros,
      solicitudes,
      materiales,
      votaciones,
    ] = await Promise.all([
      supabase
        .from("miembros")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("activo", true),

      supabase
        .from("solicitudes")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("estado", "PENDIENTE"),

      supabase
        .from("materiales")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("votaciones")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("estado", "ABIERTA"),
    ]);

    return {
      profile: perfil,

      totalMiembros: miembros.count ?? 0,

      solicitudesPendientes:
        solicitudes.count ?? 0,

      materialesRecientes:
        materiales.count ?? 0,

      votacionesActivas:
        votaciones.count ?? 0,

      proximaSesion,
    };
  }

  // ======================================
  // MIEMBRO
  // ======================================

  const [
    materiales,
    votaciones,
    asistencias,
  ] = await Promise.all([
    supabase
      .from("materiales")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("votaciones")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("estado", "ABIERTA"),

    supabase
      .from("asistencia")
      .select("estado")
      .eq("perfil_id", perfil.id),
  ]);

  const registros = asistencias.data ?? [];

  const totalSesiones = registros.length;

  const asistenciasValidas = registros.filter(
    ({ estado }) =>
      estado === "PRESENTE" ||
      estado === "JUSTIFICADA"
  ).length;

  const porcentajeAsistencia =
    totalSesiones === 0
      ? 0
      : Math.round(
          (asistenciasValidas / totalSesiones) * 100
        );

  return {
    profile: perfil,

    porcentajeAsistencia,

    materialesNuevos:
      materiales.count ?? 0,

    votacionesDisponibles:
      votaciones.count ?? 0,

    proximaSesion,
  };
}