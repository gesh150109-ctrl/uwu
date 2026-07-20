import { createClient } from "@/lib/supabase/server";

export async function getMaterials() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("materiales")
    .select(`
      id,
      sesion_id,
      titulo,
      descripcion,
      categoria,
      tipo,
      archivo_url,
      archivo_path,
      archivo_nombre,
      archivo_tamano,
      subido_por,
      created_at,
      updated_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error al obtener materiales:", error);

    throw new Error(
      "No se pudieron cargar los materiales.",
    );
  }

  return data;
}