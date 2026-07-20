import { createClient } from "@/lib/supabase/server";

export async function getMaterial(id: string) {
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
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Error al obtener material:",
      error,
    );

    throw new Error(
      "No se pudo cargar el material.",
    );
  }

  if (!data) {
    throw new Error("Material no encontrado.");
  }

  return data;
}