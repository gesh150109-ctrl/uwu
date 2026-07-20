"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

type SupabaseError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

function obtenerMensajeError(error: SupabaseError) {
  if (error.code === "23505") {
    const detalle = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();

    if (detalle.includes("codigo_universitario")) {
      return "Ya existe una solicitud con ese código universitario.";
    }

    if (detalle.includes("correo")) {
      return "Ya existe una solicitud con ese correo electrónico.";
    }

    return "Ya existe una solicitud registrada con estos datos.";
  }

  if (error.code === "42501") {
    return "No tienes permisos para registrar la solicitud.";
  }

  if (error.code === "23502") {
    return "Falta completar un dato obligatorio.";
  }

  if (error.message) {
    return error.message;
  }

  return "No fue posible registrar la solicitud.";
}

export default function SolicitudForm() {
  const supabase = createClient();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [codigo, setCodigo] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [motivo, setMotivo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function enviarSolicitud(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const nombresLimpios = nombres.trim();
    const apellidosLimpios = apellidos.trim();
    const codigoLimpio = codigo.trim();
    const correoLimpio = correo.trim().toLowerCase();
    const telefonoLimpio = telefono.trim();
    const motivoLimpio = motivo.trim();

    if (
      !nombresLimpios ||
      !apellidosLimpios ||
      !codigoLimpio ||
      !correoLimpio
    ) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: codigoExistente,
        error: codigoError,
      } = await supabase
        .from("solicitudes")
        .select("id")
        .eq("codigo_universitario", codigoLimpio)
        .limit(1)
        .maybeSingle();

      if (codigoError) {
        console.error("Error al verificar el código:", {
          message: codigoError.message,
          details: codigoError.details,
          hint: codigoError.hint,
          code: codigoError.code,
        });

        setError("No fue posible verificar el código universitario.");
        return;
      }

      if (codigoExistente) {
        setError("Ya existe una solicitud con ese código universitario.");
        return;
      }

      const {
        data: correoExistente,
        error: correoError,
      } = await supabase
        .from("solicitudes")
        .select("id")
        .ilike("correo", correoLimpio)
        .limit(1)
        .maybeSingle();

      if (correoError) {
        console.error("Error al verificar el correo:", {
          message: correoError.message,
          details: correoError.details,
          hint: correoError.hint,
          code: correoError.code,
        });

        setError("No fue posible verificar el correo electrónico.");
        return;
      }

      if (correoExistente) {
        setError(
          "Ya existe una solicitud con ese correo electrónico.",
        );
        return;
      }

      const { error: insertError } = await supabase
        .from("solicitudes")
        .insert({
          nombres: nombresLimpios,
          apellidos: apellidosLimpios,
          codigo_universitario: codigoLimpio,
          correo: correoLimpio,
          telefono: telefonoLimpio || null,
          motivo: motivoLimpio || null,
        });

      if (insertError) {
  console.error(
    "Error al registrar la solicitud:",
    JSON.stringify(
      {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code,
      },
      null,
      2,
    ),
  );

  setError(
    `${insertError.code ?? "SIN_CODIGO"}: ${insertError.message}`,
  );

  return;
}
      setSuccess(
        "Solicitud enviada correctamente. Un administrador la revisará.",
      );

      setNombres("");
      setApellidos("");
      setCodigo("");
      setCorreo("");
      setTelefono("");
      setMotivo("");
    } catch (err) {
      console.error("Error inesperado al enviar la solicitud:", err);

      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Solicitud de ingreso
      </h1>

      <p className="mt-2 text-slate-400">
        Completa la información para solicitar tu ingreso al
        Círculo de Estudios Bytecode.
      </p>

      <form
        onSubmit={enviarSolicitud}
        className="mt-8 space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nombres"
            value={nombres}
            onChange={(event) => setNombres(event.target.value)}
            required
            disabled={loading}
            autoComplete="given-name"
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(event) => setApellidos(event.target.value)}
            required
            disabled={loading}
            autoComplete="family-name"
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="text"
            placeholder="Código universitario"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            required
            disabled={loading}
            autoComplete="username"
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            required
            disabled={loading}
            autoComplete="email"
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="tel"
            placeholder="Teléfono (opcional)"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            disabled={loading}
            autoComplete="tel"
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          />
        </div>

        <textarea
          placeholder="¿Por qué deseas ingresar a Bytecode?"
          rows={5}
          value={motivo}
          onChange={(event) => setMotivo(event.target.value)}
          disabled={loading}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-green-400"
          >
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          title="Enviar solicitud de ingreso"
          className="w-full cursor-pointer rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-cyan-400 hover:text-cyan-300"
          >
            ¿Ya eres miembro? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}