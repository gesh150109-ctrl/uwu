"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/services/profile/update-profile";

export interface ProfileFormState {
  error: string | null;
}

function getRequiredText(
  formData: FormData,
  field: string,
  label: string,
) {
  const value = formData.get(field);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`El campo ${label} es obligatorio.`);
  }

  return value.trim();
}

function getOptionalText(
  formData: FormData,
  field: string,
) {
  const value = formData.get(field);

  if (typeof value !== "string") {
    return null;
  }

  return value.trim() || null;
}

export async function updateProfileAction(
  _previousState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        error:
          "Tu sesión ha expirado. Vuelve a iniciar sesión.",
      };
    }

    const nombres = getRequiredText(
      formData,
      "nombres",
      "nombres",
    );

    const apellidos = getRequiredText(
      formData,
      "apellidos",
      "apellidos",
    );

    const fotoUrl = getOptionalText(
      formData,
      "foto_url",
    );

    if (nombres.length < 2) {
      return {
        error:
          "Los nombres deben tener al menos 2 caracteres.",
      };
    }

    if (apellidos.length < 2) {
      return {
        error:
          "Los apellidos deben tener al menos 2 caracteres.",
      };
    }

    if (fotoUrl) {
      try {
        new URL(fotoUrl);
      } catch {
        return {
          error:
            "La dirección de la fotografía no es válida.",
        };
      }
    }

    await updateProfile({
      id: user.id,
      nombres,
      apellidos,
      foto_url: fotoUrl,
    });
  } catch (error) {
    console.error("Error en updateProfileAction:", error);

    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el perfil.",
    };
  }

  revalidatePath("/perfil");
  revalidatePath("/perfil/editar");
  revalidatePath("/dashboard", "layout");

  redirect("/perfil");
}