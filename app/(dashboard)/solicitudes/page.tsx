import { SolicitudCard } from "@/components/solicitudes/solicitud-card";
import { obtenerSolicitudes } from "@/services/solicitudes.service";

export default async function SolicitudesPage() {
  const resultado = await obtenerSolicitudes();

  const solicitudes = Array.isArray(resultado.solicitudes)
    ? resultado.solicitudes
    : [];

  const esAdmin = resultado.esAdmin;

  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 sm:py-8">
      <div className="mx-auto w-full min-w-0 max-w-6xl space-y-6">
        <header className="min-w-0">
          <h1 className="break-words text-3xl font-bold text-white">
            Solicitudes
          </h1>

          <p className="mt-2 break-words text-sm text-blue-300">
            Revisa las solicitudes de ingreso y sus votaciones.
          </p>
        </header>

        {solicitudes.length === 0 ? (
          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-blue-900/70 bg-blue-950/30 p-6 text-center sm:p-10">
            <p className="text-sm text-slate-400">
              No hay solicitudes registradas.
            </p>
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-5">
            {solicitudes.map((solicitud) => (
              <SolicitudCard
                key={solicitud.id}
                solicitud={solicitud}
                esAdmin={esAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}