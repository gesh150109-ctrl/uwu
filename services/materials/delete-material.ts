import { createClient } from "@/lib/supabase/server";

export async function deleteMaterial(id: string) {
  const supabase = await createClient();

  const { data: material, error: findError } =
    await supabase
      .from("materiales")
      .select("id, archivo_path")
      .eq("id", id)
      .single();

  if (findError) {
    throw new Error(
      "No se pudo encontrar el material.",
    );
  }

  if (material.archivo_path) {
    const { error: storageError } =
      await supabase.storage
        .from("materiales")
        .remove([material.archivo_path]);

    if (storageError) {
      console.error(
        "Error al eliminar archivo:",
        storageError,
      );

      throw new Error(
        "No se pudo eliminar el archivo.",
      );
    }
  }

  const { error } = await supabase
    .from("materiales")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      "No se pudo eliminar el material.",
    );
  }
}