"use client";

import { useState, useTransition } from "react";
import {
  desactivarMiembroAction,
  reactivarMiembroAction,
} from "@/app/(dashboard)/miembros/actions";
import type { Miembro } from "@/types/miembros";

type Props = {
  miembro: Miembro;
  esAdmin: boolean;
};

export function MiembroCard({
  miembro,
  esAdmin,
}: Props) {
  const [observaciones, setObservaciones] = useState(
    miembro.observaciones ?? "",
  );
  const [mensaje, setMensaje] = useState("");
  const [resultadoExitoso, setResultadoExitoso] =
    useState(false);
  const [isPending, startTransition] = useTransition();

  const nombreCompleto =
    `${miembro.perfil.nombres} ${miembro.perfil.apellidos}`.trim();

  const iniciales = `${miembro.perfil.nombres?.[0] ?? ""}${
    miembro.perfil.apellidos?.[0] ?? ""
  }`.toUpperCase();

  function desactivar() {
    const confirmado = window.confirm(
      "¿Seguro que deseas desactivar a este miembro?",
    );

    if (!confirmado) return;

    setMensaje("");

    startTransition(async () => {
      const resultado = await desactivarMiembroAction(
        miembro.id,
        observaciones,
      );

      setResultadoExitoso(resultado.success);
      setMensaje(resultado.message);
    });
  }

  function reactivar() {
    setMensaje("");

    startTransition(async () => {
      const resultado = await reactivarMiembroAction(
        miembro.id,
      );

      setResultadoExitoso(resultado.success);
      setMensaje(resultado.message);
    });
  }

  return (
    <article className="rounded-2xl border border-blue-900/70 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 text-slate-100 shadow-lg shadow-black/20">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-blue-700/60 bg-blue-900/60 text-lg font-bold text-blue-100">
            {iniciales}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-white">
                {nombreCompleto}
              </h2>

              {miembro.perfil.es_admin && (
                <span className="rounded-full border border-violet-700/60 bg-violet-950/70 px-3 py-1 text-xs font-medium text-violet-300">
                  Administrador
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-blue-300">
              {miembro.perfil.correo}
            </p>
          </div>
        </div>

        <span
          className={
            miembro.activo
              ? "h-fit w-fit rounded-full border border-emerald-700/60 bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-300"
              : "h-fit w-fit rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
          }
        >
          {miembro.activo ? "ACTIVO" : "INACTIVO"}
        </span>
      </div>

      <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <p className="text-slate-300">
          <span className="font-medium text-blue-400">
            Código:
          </span>{" "}
          <span className="text-slate-100">
            {miembro.perfil.codigo_universitario ??
              "No registrado"}
          </span>
        </p>

        <p className="text-slate-300">
          <span className="font-medium text-blue-400">
            Teléfono:
          </span>{" "}
          <span className="text-slate-100">
            {miembro.perfil.telefono ?? "No registrado"}
          </span>
        </p>

        <p className="text-slate-300">
          <span className="font-medium text-blue-400">
            Ingreso:
          </span>{" "}
          <span className="text-slate-100">
            {miembro.fecha_ingreso ?? "No registrado"}
          </span>
        </p>

        <p className="text-slate-300">
          <span className="font-medium text-blue-400">
            Salida:
          </span>{" "}
          <span className="text-slate-100">
            {miembro.fecha_salida ?? "No registrada"}
          </span>
        </p>
      </div>

      {esAdmin && (
        <div className="mt-6 space-y-4 border-t border-blue-900/70 pt-5">
          {miembro.activo ? (
            <>
              <textarea
                value={observaciones}
                onChange={(event) =>
                  setObservaciones(event.target.value)
                }
                placeholder="Motivo u observación opcional"
                rows={3}
                disabled={isPending}
                className="w-full resize-none rounded-xl border border-blue-800 bg-blue-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={desactivar}
                disabled={isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending
                  ? "Procesando..."
                  : "Desactivar miembro"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={reactivar}
              disabled={isPending}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending
                ? "Procesando..."
                : "Reactivar miembro"}
            </button>
          )}
        </div>
      )}

      {mensaje && (
        <p
          className={
            resultadoExitoso
              ? "mt-4 rounded-lg border border-emerald-800 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-300"
              : "mt-4 rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300"
          }
        >
          {mensaje}
        </p>
      )}
    </article>
  );
}