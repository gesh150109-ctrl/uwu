import { createClient } from "@/lib/supabase/server";

export async function getSession(id: string) {
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
      estado,
      created_by,
      created_at,
      updated_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}