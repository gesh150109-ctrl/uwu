import { createClient } from "@/lib/supabase/server";
import type { Votacion } from "@/types/votaciones";

type ResultadoVotaciones = {
  votaciones: Votacion[];
  esAdmin: boolean;
};

export async function obtenerVotaciones(): Promise<ResultadoVotaciones> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("No se pudo obtener el usuario autenticado.");
  }

  const [{ data, error }, { data: perfil, error: perfilError }] =
    await Promise.all([
      supabase
        .from("votaciones")
        .select(`
          id,
          titulo,
          descripcion,
          tipo,
          estado,
          fecha_inicio,
          fecha_fin,
          created_at,
          solicitud_id,
          votos (
            perfil_id,
            voto
          )
        `)
        .order("created_at", { ascending: false }),

      supabase
        .from("perfiles")
        .select("es_admin")
        .eq("id", user.id)
        .single(),
    ]);

  if (error) {
    throw new Error(error.message);
  }

  if (perfilError) {
    throw new Error(perfilError.message);
  }

  const votaciones: Votacion[] = data.map((votacion) => ({
    ...votacion,
    votos: votacion.votos ?? [],
    votoActual:
      votacion.votos?.find(
        (voto) => voto.perfil_id === user.id,
      )?.voto ?? null,
  }));

  return {
    votaciones,
    esAdmin: perfil.es_admin ?? false,
  };
}