import { createClient } from "@/lib/supabase/server";

export async function getSessions() {
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
      created_at
    `)
    .order("fecha", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}