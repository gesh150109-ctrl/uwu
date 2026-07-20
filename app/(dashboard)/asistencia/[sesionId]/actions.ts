"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { saveAttendance } from "@/services/attendance/save-attendance";
import type { Database } from "@/types/database.types";

type AttendanceStatus =
  Database["public"]["Enums"]["estado_asistencia"];

export interface AttendanceFormState {
  error: string | null;
  success: string | null;
}

const validStatuses: AttendanceStatus[] = [
  "PRESENTE",
  "MEDIA_FALTA",
  "FALTA",
  "JUSTIFICADA",
];

function isAttendanceStatus(
  value: string,
): value is AttendanceStatus {
  return validStatuses.includes(
    value as AttendanceStatus,
  );
}

export async function saveAttendanceAction(
  sessionId: string,
  _previousState: AttendanceFormState,
  formData: FormData,
): Promise<AttendanceFormState> {
  try {
    if (!sessionId) {
      return {
        error: "No se encontró la sesión.",
        success: null,
      };
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        error:
          "Tu sesión ha expirado. Vuelve a iniciar sesión.",
        success: null,
      };
    }

    const profileIds = formData
      .getAll("profile_id")
      .filter(
        (value): value is string =>
          typeof value === "string" &&
          value.trim().length > 0,
      );

    if (profileIds.length === 0) {
      return {
        error:
          "No hay miembros disponibles para registrar asistencia.",
        success: null,
      };
    }

    const uniqueProfileIds = [...new Set(profileIds)];

    const records = uniqueProfileIds.map((profileId) => {
      const statusValue = formData.get(
        `estado_${profileId}`,
      );

      if (
        typeof statusValue !== "string" ||
        !isAttendanceStatus(statusValue)
      ) {
        throw new Error(
          "Uno de los estados de asistencia no es válido.",
        );
      }

      const justificationValue = formData.get(
        `justificacion_${profileId}`,
      );

      const justification =
        typeof justificationValue === "string"
          ? justificationValue.trim()
          : "";

      if (
        statusValue === "JUSTIFICADA" &&
        justification.length < 3
      ) {
        throw new Error(
          "Toda falta justificada debe incluir una justificación.",
        );
      }

      return {
        perfilId: profileId,
        estado: statusValue,
        justificacion:
          statusValue === "JUSTIFICADA"
            ? justification
            : null,
      };
    });

    await saveAttendance({
      sessionId,
      registeredBy: user.id,
      records,
    });

    revalidatePath("/asistencia");
    revalidatePath(`/asistencia/${sessionId}`);

    return {
      error: null,
      success: "La asistencia se guardó correctamente.",
    };
  } catch (error) {
    console.error("Error en saveAttendanceAction:", error);

    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo guardar la asistencia.",
      success: null,
    };
  }
}