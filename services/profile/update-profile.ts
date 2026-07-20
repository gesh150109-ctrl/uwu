import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";

type ProfileUpdate = Pick<
  Tables<"perfiles">,
  "nombres" | "apellidos" | "foto_url"
>;

interface UpdateProfileInput extends ProfileUpdate {
  id: string;
}

export async function updateProfile({
  id,
  nombres,
  apellidos,
  foto_url,
}: UpdateProfileInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("perfiles")
    .update({
      nombres,
      apellidos,
      foto_url,
    })
    .eq("id", id)
    .select(`
      id,
      correo,
      nombres,
      apellidos,
      foto_url,
      es_admin,
      estado
    `)
    .single();

  if (error) {
    console.error("Error al actualizar el perfil:", error);
    throw new Error("No se pudo actualizar el perfil.");
  }

  return data;
}