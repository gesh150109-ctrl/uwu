import {
  CalendarCheck2,
  ClipboardCheck,
} from "lucide-react";

import AttendanceEmptyState from "@/components/attendance/AttendanceEmptyState";
import AttendanceSessionCard from "@/components/attendance/AttendanceSessionCard";
import { getAttendanceSessions } from "@/services/attendance/get-attendance-sessions";

export default async function AttendancePage() {
  const sessions = await getAttendanceSessions();

  const scheduledSessions = sessions.filter(
    (session) => session.estado === "PROGRAMADA",
  );

  const completedSessions = sessions.filter(
    (session) => session.estado === "REALIZADA",
  );

  return (
    <div className="space-y-10">
      <header>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
            <ClipboardCheck size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Asistencia
            </h1>

            <p className="mt-2 text-slate-400">
              Registra y consulta la asistencia de cada sesión.
            </p>
          </div>
        </div>
      </header>

      {sessions.length === 0 ? (
        <AttendanceEmptyState />
      ) : (
        <>
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Sesiones programadas
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Sesiones pendientes en las que puedes preparar el registro.
              </p>
            </div>

            {scheduledSessions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center">
                <CalendarCheck2
                  size={32}
                  className="mx-auto text-slate-500"
                />

                <p className="mt-4 font-medium text-slate-300">
                  No hay sesiones programadas.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-2">
                {scheduledSessions.map((session) => (
                  <AttendanceSessionCard
                    key={session.id}
                    session={session}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Sesiones realizadas
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Revisa o actualiza registros de sesiones completadas.
              </p>
            </div>

            {completedSessions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center">
                <ClipboardCheck
                  size={32}
                  className="mx-auto text-slate-500"
                />

                <p className="mt-4 font-medium text-slate-300">
                  Todavía no hay sesiones realizadas.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-2">
                {completedSessions.map((session) => (
                  <AttendanceSessionCard
                    key={session.id}
                    session={session}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}