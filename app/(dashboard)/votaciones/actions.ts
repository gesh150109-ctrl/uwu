"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { OpcionVoto } from "@/types/votaciones";

type ActionResult = {
  success: boolean;
  message: string;
};

export async function crearVotacionGeneralAction(
  titulo: string,
  descripcion: string,
): Promise<ActionResult> {
  const tituloLimpio = titulo.trim();
  const descripcionLimpia = descripcion.trim();

  if (!tituloLimpio) {
    return {
      success: false,
      message: "El título es obligatorio.",
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
    "crear_votacion_general",
    {
      p_titulo: tituloLimpio,
      p_descripcion:
        descripcionLimpia || undefined,
    },
  );

  if (error) {
    console.error(
      "Error al crear la votación:",
      error,
    );

    return {
      success: false,
      message: error.message,
    };
  }

  const { error: notificationError } =
    await supabase.rpc(
      "notificar_miembros_activos",
      {
        p_titulo: "Nueva votación disponible",
        p_mensaje: `Se abrió la votación: ${tituloLimpio}`,
        p_tipo: "VOTACION",
        p_enlace: "/dashboard/votaciones",
      },
    );

  if (notificationError) {
    console.error(
      "Error al crear las notificaciones de la votación:",
      notificationError,
    );
  }

  revalidatePath("/dashboard/votaciones");
  revalidatePath("/notificaciones");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Votación creada correctamente.",
  };
}

export async function votarVotacionAction(
  votacionId: string,
  voto: OpcionVoto,
): Promise<ActionResult> {
  if (!votacionId.trim()) {
    return {
      success: false,
      message:
        "El identificador de la votación no es válido.",
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
      p_votacion_id: votacionId,
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

  revalidatePath("/dashboard/votaciones");
  revalidatePath("/dashboard/solicitudes");

  return {
    success: true,
    message: "Voto registrado correctamente.",
  };
}

export async function cerrarVotacionAction(
  votacionId: string,
): Promise<ActionResult> {
  if (!votacionId.trim()) {
    return {
      success: false,
      message:
        "El identificador de la votación no es válido.",
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
    "cerrar_votacion",
    {
      p_votacion_id: votacionId,
    },
  );

  if (error) {
    console.error(
      "Error al cerrar la votación:",
      error,
    );

    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/dashboard/votaciones");
  revalidatePath("/dashboard/solicitudes");

  return {
    success: true,
    message: "Votación cerrada correctamente.",
  };
}