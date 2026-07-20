import { createClient } from "@/lib/supabase/server";

export async function getMaterialUrl(
  archivoPath: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("materiales")
    .createSignedUrl(
      archivoPath,
      60 * 10,
    );

  if (error) {
    throw new Error(
      "No se pudo generar el enlace de descarga.",
    );
  }

  return data.signedUrl;
}