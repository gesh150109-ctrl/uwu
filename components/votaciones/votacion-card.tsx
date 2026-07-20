"use client";

import { useState, useTransition } from "react";
import {
  cerrarVotacionAction,
  votarVotacionAction,
} from "@/app/(dashboard)/votaciones/actions";
import type {
  OpcionVoto,
  Votacion,
} from "@/types/votaciones";

type Props = {
  votacion: Votacion;
  esAdmin: boolean;
};

export function VotacionCard({
  votacion,
  esAdmin,
}: Props) {
  const [mensaje, setMensaje] = useState("");
  const [resultadoExitoso, setResultadoExitoso] =
    useState(false);
  const [isPending, startTransition] = useTransition();

  const votosSi = votacion.votos.filter(
    (voto) => voto.voto === "SI",
  ).length;

  const votosNo = votacion.votos.filter(
    (voto) => voto.voto === "NO",
  ).length;

  const abstenciones = votacion.votos.filter(
    (voto) => voto.voto === "ABSTENCION",
  ).length;

  const fechaInicio = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(votacion.fecha_inicio));

  function votar(opcion: OpcionVoto) {
    setMensaje("");

    startTransition(async () => {
      const resultado = await votarVotacionAction(
        votacion.id,
        opcion,
      );

      setResultadoExitoso(resultado.success);
      setMensaje(resultado.message);
    });
  }

  function cerrar() {
    const confirmado = window.confirm(
      "¿Seguro que deseas cerrar esta votación?",
    );

    if (!confirmado) return;

    setMensaje("");

    startTransition(async () => {
      const resultado = await cerrarVotacionAction(
        votacion.id,
      );

      setResultadoExitoso(resultado.success);
      setMensaje(resultado.message);
    });
  }

  return (
    <article className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">
              {votacion.titulo}
            </h2>

            <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {votacion.tipo}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inició el {fechaInicio}
          </p>
        </div>

        <span
          className={
            votacion.estado === "ABIERTA"
              ? "h-fit w-fit rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              : "h-fit w-fit rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }
        >
          {votacion.estado}
        </span>
      </div>

      {votacion.descripcion && (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {votacion.descripcion}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-900 dark:bg-emerald-950/50">
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
            {votosSi}
          </p>

          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            Sí
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950/50">
          <p className="text-xl font-bold text-red-700 dark:text-red-300">
            {votosNo}
          </p>

          <p className="text-sm text-red-700 dark:text-red-400">
            No
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center dark:border-amber-900 dark:bg-amber-950/50">
          <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
            {abstenciones}
          </p>

          <p className="text-sm text-amber-700 dark:text-amber-400">
            Abstención
          </p>
        </div>
      </div>

      {votacion.votoActual && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
          Tu voto actual:{" "}
          <span className="font-semibold">
            {votacion.votoActual}
          </span>
        </div>
      )}

      {votacion.estado === "ABIERTA" && (
        <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-slate-800">
          <button
            type="button"
            onClick={() => votar("SI")}
            disabled={isPending}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Procesando..." : "Votar Sí"}
          </button>

          <button
            type="button"
            onClick={() => votar("NO")}
            disabled={isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Procesando..." : "Votar No"}
          </button>

          <button
            type="button"
            onClick={() => votar("ABSTENCION")}
            disabled={isPending}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Abstenerse
          </button>

          {esAdmin && (
            <button
              type="button"
              onClick={cerrar}
              disabled={isPending}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
            >
              Cerrar votación
            </button>
          )}
        </div>
      )}

      {mensaje && (
        <p
          className={
            resultadoExitoso
              ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
              : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          }
        >
          {mensaje}
        </p>
      )}
    </article>
  );
}