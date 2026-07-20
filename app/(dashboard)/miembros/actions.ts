"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = {
  success: boolean;
  message: string;
};

export async function desactivarMiembroAction(
  miembroId: string,
  observaciones: string,
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.rpc("desactivar_miembro", {
    p_miembro_id: miembroId,
    p_observaciones: observaciones.trim() || undefined,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/dashboard/miembros");

  return {
    success: true,
    message: "Miembro desactivado correctamente.",
  };
}

export async function reactivarMiembroAction(
  miembroId: string,
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.rpc("reactivar_miembro", {
    p_miembro_id: miembroId,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/dashboard/miembros");

  return {
    success: true,
    message: "Miembro reactivado correctamente.",
  };
}