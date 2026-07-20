import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type MaterialInsert =
  Database["public"]["Tables"]["materiales"]["Insert"];

interface CreateMaterialInput {
  titulo: string;
  descripcion: string | null;
  categoria: string | null;
  tipo: MaterialInsert["tipo"];
  sesionId: string | null;
  archivoUrl: string | null;
  archivoPath: string | null;
  archivoNombre: string | null;
  archivoTamano: number | null;
  subidoPor: string;
}

export async function createMaterial({
  titulo,
  descripcion,
  categoria,
  tipo,
  sesionId,
  archivoUrl,
  archivoPath,
  archivoNombre,
  archivoTamano,
  subidoPor,
}: CreateMaterialInput) {
  const supabase = await createClient();

  const material: MaterialInsert = {
    titulo,
    descripcion,
    categoria,
    tipo,
    sesion_id: sesionId,
    archivo_url: archivoUrl,
    archivo_path: archivoPath,
    archivo_nombre: archivoNombre,
    archivo_tamano: archivoTamano,
    subido_por: subidoPor,
  };

  const { data, error } = await supabase
    .from("materiales")
    .insert(material)
    .select()
    .single();

  if (error) {
    console.error(
      "Error al crear material:",
      error,
    );

    throw new Error(
      "No se pudo registrar el material.",
    );
  }

  return data;
}