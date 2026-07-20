import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

import type { Tables } from "@/types/database.types";

type Session = Pick<
  Tables<"sesiones">,
  | "id"
  | "titulo"
  | "fecha"
  | "hora_inicio"
  | "hora_fin"
  | "lugar"
  | "estado"
>;

interface SessionHistoryTableProps {
  sessions: Session[];
}

const statusStyles = {
  PROGRAMADA: {
    label: "Programada",
    className:
      "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  },
  REALIZADA: {
    label: "Realizada",
    className:
      "bg-slate-500/10 text-slate-300 ring-slate-500/20",
  },
  CANCELADA: {
    label: "Cancelada",
    className:
      "bg-red-500/10 text-red-400 ring-red-500/20",
  },
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function SessionHistoryTable({
  sessions,
}: SessionHistoryTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 py-14 text-center">
        <Calendar
          size={42}
          className="mx-auto text-slate-600"
        />

        <h2 className="mt-4 text-lg font-semibold text-white">
          No hay sesiones en el historial
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Las sesiones realizadas o canceladas aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-xl font-bold text-white">
          Historial de sesiones
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Consulta sesiones anteriores y su estado.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead className="bg-slate-950/70">
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-semibold">
                Sesión
              </th>

              <th className="px-6 py-4 font-semibold">
                Fecha
              </th>

              <th className="px-6 py-4 font-semibold">
                Horario
              </th>

              <th className="px-6 py-4 font-semibold">
                Lugar
              </th>

              <th className="px-6 py-4 font-semibold">
                Estado
              </th>

              <th className="px-6 py-4 text-right font-semibold">
                Acción
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {sessions.map((session) => {
              const status = statusStyles[session.estado];

              return (
                <tr
                  key={session.id}
                  className="transition hover:bg-slate-800/40"
                >
                  <td className="px-6 py-5">
                    <p className="max-w-xs truncate font-semibold text-white">
                      {session.titulo}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Calendar
                        size={16}
                        className="text-cyan-400"
                      />

                      {formatDate(session.fecha)}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock3
                        size={16}
                        className="text-cyan-400"
                      />

                      {formatTime(session.hora_inicio)} -{" "}
                      {formatTime(session.hora_fin)}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPin
                        size={16}
                        className="shrink-0 text-cyan-400"
                      />

                      <span className="max-w-44 truncate">
                        {session.lugar?.trim() ||
                          "Lugar por definir"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      href={`/sesiones/${session.id}`}
                      aria-label={`Ver sesión ${session.titulo}`}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/10 hover:text-cyan-300"
                    >
                      Ver detalle
                      <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}