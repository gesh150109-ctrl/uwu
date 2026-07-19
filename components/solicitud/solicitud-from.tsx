"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

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

  async function enviarSolicitud(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !nombres.trim() ||
      !apellidos.trim() ||
      !codigo.trim() ||
      !correo.trim()
    ) {
      setError("Complete todos los campos obligatorios.");
      return;
    }

    if (!correo.endsWith("@unapiquitos.edu.pe")) {
      setError("Debe utilizar su correo institucional.");
      return;
    }

    setLoading(true);

    try {
      // Verificar código duplicado
      const { data: codigoExistente } = await supabase
        .from("solicitudes")
        .select("id")
        .eq("codigo_universitario", codigo)
        .maybeSingle();

      if (codigoExistente) {
        setError("Ya existe una solicitud con ese código.");
        return;
      }

      // Verificar correo duplicado
      const { data: correoExistente } = await supabase
        .from("solicitudes")
        .select("id")
        .eq("correo", correo)
        .maybeSingle();

      if (correoExistente) {
        setError("Ya existe una solicitud con ese correo.");
        return;
      }

      const { error: insertError } = await supabase
        .from("solicitudes")
        .insert({
          nombres: nombres.trim(),
          apellidos: apellidos.trim(),
          codigo_universitario: codigo.trim(),
          correo: correo.trim().toLowerCase(),
          telefono: telefono.trim() || null,
          motivo: motivo.trim() || null,
        });

      if (insertError) {
        console.error(insertError);
        setError("No fue posible registrar la solicitud.");
        return;
      }

      setSuccess(
        "Solicitud enviada correctamente. Un administrador la revisará."
      );

      setNombres("");
      setApellidos("");
      setCodigo("");
      setCorreo("");
      setTelefono("");
      setMotivo("");
    } catch (err) {
      console.error(err);
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
        Completa la información para solicitar tu ingreso al Círculo de
        Estudios Bytecode.
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
            onChange={(e) => setNombres(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Código universitario"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="email"
            placeholder="Correo institucional"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Teléfono (opcional)"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500 md:col-span-2"
          />

        </div>

        <textarea
          placeholder="¿Por qué deseas ingresar a Bytecode?"
          rows={5}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-green-400">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
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