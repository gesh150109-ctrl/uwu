"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import type {
  EstadoSolicitud,
  OpcionVoto,
} from "@/types/solicitudes";

type ActionResult = {
  success: boolean;
  message: string;
};

export async function votarSolicitudAction(
  votacionId: string,
  voto: OpcionVoto,
): Promise<ActionResult> {
  const votacionIdLimpio = votacionId.trim();

  if (!votacionIdLimpio) {
    return {
      success: false,
      message: "La votación no es válida.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message:
        "Tu sesión ha expirado. Vuelve a iniciar sesión.",
    };
  }

  const { error } = await supabase.rpc(
    "votar_solicitud",
    {
      p_votacion_id: votacionIdLimpio,
      p_voto: voto,
    },
  );

  if (error) {
    console.error(
      "Error al registrar el voto:",
      error,
    );

    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/dashboard/solicitudes");
  revalidatePath("/dashboard/votaciones");

  return {
    success: true,
    message: "Voto registrado correctamente.",
  };
}

export async function revisarSolicitudAction(
  solicitudId: string,
  decision: Exclude<
    EstadoSolicitud,
    "PENDIENTE"
  >,
): Promise<ActionResult> {
  const solicitudIdLimpio = solicitudId.trim();

  if (!solicitudIdLimpio) {
    return {
      success: false,
      message: "La solicitud no es válida.",
    };
  }

  if (
    decision !== "APROBADA" &&
    decision !== "RECHAZADA"
  ) {
    return {
      success: false,
      message:
        "La decisión seleccionada no es válida.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message:
        "Tu sesión ha expirado. Vuelve a iniciar sesión.",
    };
  }

  const {
    data: solicitud,
    error: solicitudError,
  } = await supabase
    .from("solicitudes")
    .select("id, perfil_id")
    .eq("id", solicitudIdLimpio)
    .single();

  if (solicitudError || !solicitud) {
    console.error(
      "Error al obtener la solicitud:",
      solicitudError,
    );

    return {
      success: false,
      message: "No se encontró la solicitud.",
    };
  }

  const { error: reviewError } =
    await supabase.rpc("revisar_solicitud", {
      p_solicitud_id: solicitudIdLimpio,
      p_decision: decision,
    });

  if (reviewError) {
    console.error(
      "Error al revisar la solicitud:",
      reviewError,
    );

    return {
      success: false,
      message: reviewError.message,
    };
  }

  const aprobada = decision === "APROBADA";

  if (solicitud.perfil_id) {
    const { error: notificationError } =
      await supabase.rpc(
        "crear_notificacion",
        {
          p_usuario_id: solicitud.perfil_id,
          p_titulo: aprobada
            ? "Solicitud aprobada"
            : "Solicitud rechazada",
          p_mensaje: aprobada
            ? "Tu solicitud fue aprobada correctamente."
            : "Tu solicitud fue rechazada.",
          p_tipo: "SOLICITUD",
          p_enlace:
            "/dashboard/solicitudes",
        },
      );

    if (notificationError) {
      console.error(
        "Error al notificar al solicitante:",
        notificationError,
      );
    }
  }

  revalidatePath("/dashboard/solicitudes");
  revalidatePath("/dashboard/votaciones");
  revalidatePath("/notificaciones");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: aprobada
      ? "Solicitud aprobada correctamente."
      : "Solicitud rechazada correctamente.",
  };
}