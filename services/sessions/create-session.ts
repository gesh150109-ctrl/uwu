import { createClient } from "@/lib/supabase/server";

interface CreateSessionInput {
  titulo: string;
  descripcion?: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  lugar?: string;
  createdBy: string;
}

export async function createSession({
  titulo,
  descripcion,
  fecha,
  hora_inicio,
  hora_fin,
  lugar,
  createdBy,
}: CreateSessionInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sesiones")
    .insert({
      titulo,
      descripcion: descripcion ?? null,
      fecha,
      hora_inicio,
      hora_fin,
      lugar: lugar ?? null,
      created_by: createdBy,
      estado: "PROGRAMADA",
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase createSession error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(
      error.details
        ? `${error.message}: ${error.details}`
        : error.message,
    );
  }

  return data;
}