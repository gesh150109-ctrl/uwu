"use server";

import { createClient } from "@/lib/supabase/server";

export type RegistroActionResult = {
  success: boolean;
  message: string;
};

export async function registrarUsuarioAction(
  formData: FormData,
): Promise<RegistroActionResult> {
  const correo = String(formData.get("correo") ?? "")
    .trim()
    .toLowerCase();

  const codigoUniversitario = String(
    formData.get("codigoUniversitario") ?? "",
  ).trim();

  const password = String(
    formData.get("password") ?? "",
  );

  const confirmarPassword = String(
    formData.get("confirmarPassword") ?? "",
  );

  if (
    !correo ||
    !codigoUniversitario ||
    !password ||
    !confirmarPassword
  ) {
    return {
      success: false,
      message: "Completa todos los campos.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message:
        "La contraseña debe tener al menos 8 caracteres.",
    };
  }

  if (password !== confirmarPassword) {
    return {
      success: false,
      message: "Las contraseñas no coinciden.",
    };
  }

  const supabase = await createClient();

  const {
    data: solicitudValida,
    error: validacionError,
  } = await supabase.rpc(
    "validar_solicitud_aprobada",
    {
      p_correo: correo,
      p_codigo: codigoUniversitario,
    },
  );

  if (validacionError) {
    console.error(
      "Error al validar la solicitud:",
      {
        message: validacionError.message,
        details: validacionError.details,
        hint: validacionError.hint,
        code: validacionError.code,
      },
    );

    return {
      success: false,
      message:
        "No fue posible verificar tu solicitud.",
    };
  }

  if (!solicitudValida) {
    return {
      success: false,
      message:
        "El correo o el código no coinciden con una solicitud aprobada disponible.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(
      /\/$/,
      "",
    );

  const {
  data,
  error: registroError,
} = await supabase.auth.signUp({
  email: correo,
  password,
  options: {
    data: {
      codigo_universitario: codigoUniversitario,
    },
    ...(siteUrl
      ? {
          emailRedirectTo: `${siteUrl}/login`,
        }
      : {}),
  },
});

  if (registroError) {
    console.error(
      "Error al registrar el usuario:",
      {
        message: registroError.message,
        status: registroError.status,
        code: registroError.code,
      },
    );

    const mensaje =
      registroError.message.toLowerCase();

    if (
      mensaje.includes("already registered") ||
      mensaje.includes("already exists")
    ) {
      return {
        success: false,
        message:
          "Ya existe una cuenta registrada con este correo.",
      };
    }

    if (
      mensaje.includes(
        "no existe una solicitud aprobada",
      )
    ) {
      return {
        success: false,
        message:
          "No existe una solicitud aprobada disponible para este correo.",
      };
    }

    if (
      mensaje.includes(
        "código universitario ya está registrado",
      )
    ) {
      return {
        success: false,
        message:
          "El código universitario ya está registrado.",
      };
    }

    return {
      success: false,
      message:
        "No fue posible crear la cuenta. Revisa los datos e inténtalo nuevamente.",
    };
  }

  if (!data.user) {
    return {
      success: false,
      message:
        "No fue posible completar el registro.",
    };
  }

  if (data.session) {
    await supabase.auth.signOut();

    return {
      success: true,
      message:
        "Cuenta creada correctamente. Ya puedes iniciar sesión.",
    };
  }

  return {
    success: true,
    message:
      "Cuenta creada. Revisa tu correo para confirmar tu cuenta y luego inicia sesión.",
  };
}