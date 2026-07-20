import { SolicitudCard } from "@/components/solicitudes/solicitud-card";
import { obtenerSolicitudes } from "@/services/solicitudes.service";

export default async function SolicitudesPage() {
  const resultado = await obtenerSolicitudes();

  const solicitudes = Array.isArray(resultado.solicitudes)
    ? resultado.solicitudes
    : [];

  const esAdmin = resultado.esAdmin;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">
            Solicitudes
          </h1>

          <p className="mt-2 text-sm text-blue-300">
            Revisa las solicitudes de ingreso y sus votaciones.
          </p>
        </header>

        {solicitudes.length === 0 ? (
          <div className="rounded-2xl border border-blue-900/70 bg-blue-950/30 p-10 text-center">
            <p className="text-sm text-slate-400">
              No hay solicitudes registradas.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
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