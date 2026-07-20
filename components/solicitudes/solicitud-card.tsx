"use client";

import { useState, useTransition } from "react";
import {
  revisarSolicitudAction,
  votarSolicitudAction,
} from "@/app/(dashboard)/solicitudes/actions";
import type {
  EstadoSolicitud,
  OpcionVoto,
} from "@/types/solicitudes";

type Solicitud = {
  id: string;
  perfil_id: string | null;
  nombres: string;
  apellidos: string;
  codigo_universitario: string | null;
  correo: string;
  telefono: string | null;
  estado: EstadoSolicitud;
  votaciones: Array<{
    id: string;
    estado: "ABIERTA" | "CERRADA";
    fecha_inicio: string | null;
    fecha_fin: string | null;
    votos: Array<{
      voto: OpcionVoto;
    }>;
  }>;
};

type Props = {
  solicitud: Solicitud;
  esAdmin: boolean;
};

export function SolicitudCard({
  solicitud,
  esAdmin,
}: Props) {
  const [mensaje, setMensaje] = useState("");
  const [isPending, startTransition] = useTransition();

  const votacion = solicitud.votaciones[0];

  const votosSi =
    votacion?.votos.filter((voto) => voto.voto === "SI").length ?? 0;

  const votosNo =
    votacion?.votos.filter((voto) => voto.voto === "NO").length ?? 0;

  const abstenciones =
    votacion?.votos.filter(
      (voto) => voto.voto === "ABSTENCION",
    ).length ?? 0;

  function votar(voto: OpcionVoto) {
    if (!votacion) return;

    setMensaje("");

    startTransition(async () => {
      const resultado = await votarSolicitudAction(
        votacion.id,
        voto,
      );

      setMensaje(resultado.message);
    });
  }

  function revisar(
    decision: "APROBADA" | "RECHAZADA",
  ) {
    setMensaje("");

    startTransition(async () => {
      const resultado = await revisarSolicitudAction(
        solicitud.id,
        decision,
      );

      setMensaje(resultado.message);
    });
  }

  return (
    <article className="space-y-5 rounded-2xl border border-blue-900/70 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 text-slate-100 shadow-lg shadow-black/20">
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {solicitud.nombres} {solicitud.apellidos}
          </h2>

          <p className="mt-1 text-sm text-blue-300">
            {solicitud.correo}
          </p>
        </div>

        <span className="h-fit w-fit rounded-full border border-blue-800 bg-blue-950/60 px-3 py-1 text-xs font-medium text-blue-200">
          {solicitud.estado}
        </span>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <p className="text-slate-300">
          <span className="font-medium text-blue-400">
            Código:
          </span>{" "}
          <span className="text-slate-100">
            {solicitud.codigo_universitario ??
              "No registrado"}
          </span>
        </p>

        <p className="text-slate-300">
          <span className="font-medium text-blue-400">
            Teléfono:
          </span>{" "}
          <span className="text-slate-100">
            {solicitud.telefono ?? "No registrado"}
          </span>
        </p>
      </div>

      {votacion ? (
        <div className="space-y-4 rounded-xl border border-blue-900/70 bg-blue-950/30 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white">
              Votación
            </h3>

            <span className="text-xs text-blue-300">
              {votacion.estado}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-lg border border-emerald-900 bg-emerald-950/40 p-3">
              <p className="font-semibold text-emerald-300">
                {votosSi}
              </p>

              <p className="text-xs text-emerald-400">
                Sí
              </p>
            </div>

            <div className="rounded-lg border border-red-900 bg-red-950/40 p-3">
              <p className="font-semibold text-red-300">
                {votosNo}
              </p>

              <p className="text-xs text-red-400">
                No
              </p>
            </div>

            <div className="rounded-lg border border-amber-900 bg-amber-950/40 p-3">
              <p className="font-semibold text-amber-300">
                {abstenciones}
              </p>

              <p className="text-xs text-amber-400">
                Abstención
              </p>
            </div>
          </div>

          {votacion.estado === "ABIERTA" && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => votar("SI")}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
              >
                Votar Sí
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => votar("NO")}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                Votar No
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => votar("ABSTENCION")}
                className="rounded-lg border border-blue-800 bg-blue-950/50 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-900 disabled:opacity-50"
              >
                Abstenerse
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          Esta solicitud no tiene votación.
        </p>
      )}

      {esAdmin &&
        solicitud.estado === "PENDIENTE" && (
          <div className="flex flex-wrap gap-2 border-t border-blue-900/70 pt-4">
            <button
              type="button"
              disabled={isPending}
              onClick={() => revisar("APROBADA")}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
            >
              Aprobar
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => revisar("RECHAZADA")}
              className="rounded-lg border border-red-800 bg-red-950/40 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-950 disabled:opacity-50"
            >
              Rechazar
            </button>
          </div>
        )}

      {mensaje && (
        <p className="rounded-lg border border-blue-900 bg-blue-950/40 px-4 py-3 text-sm text-blue-200">
          {mensaje}
        </p>
      )}
    </article>
  );
}