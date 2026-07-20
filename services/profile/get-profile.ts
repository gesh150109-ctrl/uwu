import { createClient } from "@/lib/supabase/server";

export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("perfiles")
    .select(`
      id,
      nombres,
      apellidos,
      foto_url,
      es_admin,
      estado
    `)
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error al obtener el perfil:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(error.message);
  }

  return data;
}