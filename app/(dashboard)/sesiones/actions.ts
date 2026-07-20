"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createSession } from "@/services/sessions/create-session";
import { updateSession } from "@/services/sessions/update-session";
import { deleteSession } from "@/services/sessions/delete-session";

import type { SessionFormState } from "@/components/sessions/SessionForm";

function getRequiredString(
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

function getOptionalString(
  formData: FormData,
  field: string,
) {
  const value = formData.get(field);

  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue || undefined;
}

export async function createSessionAction(
  _previousState: SessionFormState,
  formData: FormData,
): Promise<SessionFormState> {
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

    const titulo = getRequiredString(
      formData,
      "titulo",
      "título",
    );

    const fecha = getRequiredString(
      formData,
      "fecha",
      "fecha",
    );

    const horaInicio = getRequiredString(
      formData,
      "hora_inicio",
      "hora de inicio",
    );

    const horaFin = getRequiredString(
      formData,
      "hora_fin",
      "hora de fin",
    );

    if (horaFin <= horaInicio) {
      return {
        error:
          "La hora de fin debe ser posterior a la hora de inicio.",
      };
    }

    const sesion = await createSession({
      titulo,
      descripcion: getOptionalString(
        formData,
        "descripcion",
      ),
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      lugar: getOptionalString(
        formData,
        "lugar",
      ),
      createdBy: user.id,
    });

    const { error: notificationError } =
      await supabase.rpc(
        "notificar_miembros_activos",
        {
          p_titulo: "Nueva sesión programada",
          p_mensaje: `Se programó la sesión: ${titulo}`,
          p_tipo: "SESION",
          p_enlace: `/sesiones/${sesion.id}`,
        },
      );

    if (notificationError) {
      console.error(
        "Error al crear las notificaciones de la sesión:",
        notificationError,
      );
    }
  } catch (error) {
    console.error(
      "Error al crear la sesión:",
      error,
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo crear la sesión.",
    };
  }

  revalidatePath("/sesiones");
  revalidatePath("/dashboard");
  revalidatePath("/notificaciones");
  revalidatePath("/", "layout");

  redirect("/sesiones");
}

export async function updateSessionAction(
  _previousState: SessionFormState,
  formData: FormData,
): Promise<SessionFormState> {
  try {
    const id = getRequiredString(
      formData,
      "id",
      "identificador",
    );

    const titulo = getRequiredString(
      formData,
      "titulo",
      "título",
    );

    const fecha = getRequiredString(
      formData,
      "fecha",
      "fecha",
    );

    const horaInicio = getRequiredString(
      formData,
      "hora_inicio",
      "hora de inicio",
    );

    const horaFin = getRequiredString(
      formData,
      "hora_fin",
      "hora de fin",
    );

    const estado = getRequiredString(
      formData,
      "estado",
      "estado",
    );

    if (horaFin <= horaInicio) {
      return {
        error:
          "La hora de fin debe ser posterior a la hora de inicio.",
      };
    }

    if (
      estado !== "PROGRAMADA" &&
      estado !== "REALIZADA" &&
      estado !== "CANCELADA"
    ) {
      return {
        error:
          "El estado seleccionado no es válido.",
      };
    }

    await updateSession({
      id,
      titulo,
      descripcion: getOptionalString(
        formData,
        "descripcion",
      ),
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      lugar: getOptionalString(
        formData,
        "lugar",
      ),
      estado,
    });

    revalidatePath("/sesiones");
    revalidatePath(`/sesiones/${id}`);
    revalidatePath("/dashboard");

    redirect(`/sesiones/${id}`);
  } catch (error) {
    console.error(
      "Error al actualizar la sesión:",
      error,
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la sesión.",
    };
  }
}

export async function deleteSessionAction(
  id: string,
): Promise<void> {
  try {
    await deleteSession(id);
  } catch (error) {
    console.error(
      "Error al eliminar la sesión:",
      error,
    );

    throw new Error(
      "No se pudo eliminar la sesión.",
    );
  }

  revalidatePath("/sesiones");
  revalidatePath("/dashboard");

  redirect("/sesiones");
}