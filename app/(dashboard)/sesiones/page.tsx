import Link from "next/link";
import { Plus } from "lucide-react";

import { getSessions } from "@/services/sessions/get-sessions";
import SessionCard from "@/components/sessions/SessionCard";
import SessionHistoryTable from "@/components/sessions/SessionHistoryTable";
import EmptyState from "@/components/sessions/EmptyState";

export default async function SessionsPage() {
  const sesiones = await getSessions();

  const proximasSesiones = sesiones.filter(
    (sesion) => sesion.estado === "PROGRAMADA",
  );

  const historial = sesiones.filter(
    (sesion) =>
      sesion.estado === "REALIZADA" ||
      sesion.estado === "CANCELADA",
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Sesiones
          </h1>

          <p className="mt-2 text-slate-400">
            Gestiona todas las sesiones del círculo de estudios.
          </p>
        </div>

        <Link
          href="/sesiones/nueva"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          <Plus size={19} />
          Nueva sesión
        </Link>
      </header>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Próximas sesiones
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Sesiones programadas pendientes de realizar.
          </p>
        </div>

        {proximasSesiones.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {proximasSesiones.map((sesion) => (
              <SessionCard
                key={sesion.id}
                session={sesion}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <SessionHistoryTable sessions={historial} />
      </section>
    </div>
  );
}