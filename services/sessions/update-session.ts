import { createClient } from "@/lib/supabase/server";

interface UpdateSessionInput {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  lugar?: string;
  estado: "PROGRAMADA" | "REALIZADA" | "CANCELADA";
}

export async function updateSession({
  id,
  titulo,
  descripcion,
  fecha,
  hora_inicio,
  hora_fin,
  lugar,
  estado,
}: UpdateSessionInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sesiones")
    .update({
      titulo,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      lugar,
      estado,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}