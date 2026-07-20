"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createMaterial } from "@/services/materials/create-material";

const FILE_TYPES = ["PDF", "DOCX", "PPT", "ZIP"] as const;
const URL_TYPES = ["LINK", "VIDEO"] as const;

type MaterialType =
  | (typeof FILE_TYPES)[number]
  | (typeof URL_TYPES)[number];

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

function getString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isMaterialType(value: string): value is MaterialType {
  return [
    ...FILE_TYPES,
    ...URL_TYPES,
  ].includes(value as MaterialType);
}

function getFileExtension(file: File) {
  const extension = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  if (!extension) {
    throw new Error(
      "El archivo debe tener una extensión válida.",
    );
  }

  return extension;
}

export async function createMaterialAction(
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(
      "Debes iniciar sesión para crear materiales.",
    );
  }

  const titulo = getString(formData, "titulo");
  const descripcion =
    getString(formData, "descripcion") || null;
  const categoria =
    getString(formData, "categoria") || null;
  const tipoValue = getString(formData, "tipo");
  const sesionId =
    getString(formData, "sesion_id") || null;

  if (!titulo) {
    throw new Error("El título es obligatorio.");
  }

  if (!isMaterialType(tipoValue)) {
    throw new Error("El tipo de material no es válido.");
  }

  const tipo = tipoValue;

  let archivoUrl: string | null = null;
  let archivoPath: string | null = null;
  let archivoNombre: string | null = null;
  let archivoTamano: number | null = null;

  if (URL_TYPES.includes(tipo as "LINK" | "VIDEO")) {
    archivoUrl =
      getString(formData, "archivo_url") || null;

    if (!archivoUrl) {
      throw new Error("La URL es obligatoria.");
    }

    try {
      new URL(archivoUrl);
    } catch {
      throw new Error("La URL no es válida.");
    }
  }

  if (FILE_TYPES.includes(
    tipo as "PDF" | "DOCX" | "PPT" | "ZIP",
  )) {
    const archivo = formData.get("archivo");

    if (!(archivo instanceof File) || archivo.size === 0) {
      throw new Error("Debes seleccionar un archivo.");
    }

    if (archivo.size > MAX_FILE_SIZE) {
      throw new Error(
        "El archivo no puede superar los 20 MB.",
      );
    }

    const extension = getFileExtension(archivo);

    archivoPath = `${user.id}/${randomUUID()}.${extension}`;
    archivoNombre = archivo.name;
    archivoTamano = archivo.size;

    const { error: uploadError } = await supabase.storage
      .from("materiales")
      .upload(archivoPath, archivo, {
        contentType:
          archivo.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error(
        "Error al subir material:",
        uploadError,
      );

      throw new Error(
        "No se pudo subir el archivo.",
      );
    }
  }

  try {
   const material = await createMaterial({
  titulo,
  descripcion,
  categoria,
  tipo,
  sesionId,
  archivoUrl,
  archivoPath,
  archivoNombre,
  archivoTamano,
  subidoPor: user.id,
});

const { error: notificationError } = await supabase.rpc(
  "notificar_miembros_activos",
  {
    p_titulo: "Nuevo material disponible",
    p_mensaje: `Se publicó el material: ${titulo}`,
    p_tipo: "MATERIAL",
    p_enlace: `/materiales/${material.id}`,
  }
);

if (notificationError) {
  console.error(
    "Error al crear notificaciones:",
    notificationError
  );
}
revalidatePath("/materiales");
revalidatePath("/notificaciones");
revalidatePath("/", "layout");

redirect("/materiales"); 
  } catch (error) {
    /*
     * Si la inserción falla después de subir el archivo,
     * eliminamos el archivo para no dejar basura en Storage.
     */
    if (archivoPath) {
      await supabase.storage
        .from("materiales")
        .remove([archivoPath]);
    }

    throw error;
  }

  revalidatePath("/materiales");
  redirect("/materiales");
}