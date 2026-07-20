import { createClient } from "@/lib/supabase/server";
import type { Miembro } from "@/types/miembros";

type ResultadoMiembros = {
  miembros: Miembro[];
  esAdmin: boolean;
};

export async function obtenerMiembros(): Promise<ResultadoMiembros> {
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
        .from("miembros")
        .select(`
          id,
          perfil_id,
          fecha_ingreso,
          fecha_salida,
          activo,
          observaciones,
          created_at,
          updated_at,
          perfil:perfiles (
            nombres,
            apellidos,
            correo,
            telefono,
            codigo_universitario,
            estado,
            es_admin
          )
        `)
        .order("activo", { ascending: false })
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

  return {
    miembros: data as Miembro[],
    esAdmin: perfil.es_admin ?? false,
  };
}